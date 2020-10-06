/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate>
        <template #content>
            <Grid
                :is-editable="isUserAllowedToUpdate"
                :columns="columns"
                :data-count="filtered"
                :rows="rows"
                :drafts="drafts"
                :collection-cell-binding="collectionCellBinding"
                :is-collection-layout="true"
                :is-header-visible="true"
                :is-border="true"
                @editRow="onEditRow"
                @cell-value="onCellValueChange"
                @fetch-data="onFetchData">
                <template #appendFooter>
                    <Button
                        title="SAVE CHANGES"
                        :disabled="!isUserAllowedToUpdate"
                        @click.native="onSubmit">
                        <template
                            v-if="isSubmitting"
                            #prepend="{ color }">
                            <IconSpinner :fill-color="color" />
                        </template>
                    </Button>
                </template>
            </Grid>
        </template>
    </CenterViewTemplate>
</template>

<script>
import Button from '@Core/components/Button/Button';
import Grid from '@Core/components/Grid/Grid';
import IconSpinner from '@Core/components/Icons/Feedback/IconSpinner';
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    DATA_LIMIT,
    DEFAULT_GRID_FETCH_PARAMS,
} from '@Core/defaults/grid';
import gridDraftMixin from '@Core/mixins/grid/gridDraftMixin';
import tabFeedbackMixin from '@Core/mixins/tab/tabFeedbackMixin';
import {
    getGridData,
} from '@Core/services/grid/getGridData.service';
import PRIVILEGES from '@Products/config/privileges';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ProductVariantsTab',
    components: {
        CenterViewTemplate,
        Grid,
        Button,
        IconSpinner,
    },
    mixins: [
        gridDraftMixin,
        tabFeedbackMixin,
    ],
    async asyncData({
        app, store, params: {
            id,
        },
    }) {
        const {
            language: languageCode,
        } = store.state.authentication.user;
        const [
            selectAttributes,
            productBindings,
            productChildren,
        ] = await Promise.all([
            store.dispatch('attribute/getAttributesByFilter', {
                filter: 'type=SELECT',
            }),
            store.dispatch('product/getProductBindings', id),
            store.dispatch('product/getProductChildren', id),
        ]);

        const attributeCodes = selectAttributes
            .filter(
                attribute => productBindings
                    .some(
                        attrId => attribute.id === attrId,
                    ),
            )
            .map(({
                key,
            }) => key);
        const filteredProductTypes = await app.$extendMethods('@Products/components/Tabs/ProductVariantsTab/filteredProductTypes', {
            $this: app,
        });
        const productTypes = Array.from(new Set([].concat(...filteredProductTypes))).join(',');
        const defaultColumns = [
            'esa_default_image',
            'esa_default_label',
            ...attributeCodes,
            'sku',
            'esa_template',
        ];

        const params = {
            offset: 0,
            limit: DATA_LIMIT,
            extended: true,
            filter: `${attributeCodes.map(attr => `${attr}!=`).join(';')},esa_product_type=${productTypes}`,
            columns: defaultColumns.join(','),
        };

        const {
            columns,
            rows,
            filtered,
        } = await getGridData({
            $axios: app.$axios,
            path: 'products',
            params,
        });

        const tmpRows = [
            ...rows,
        ];

        for (let i = 0; i < rows.length; i += 1) {
            tmpRows[i].esa_attached = {
                value: productChildren
                    .some(item => item.id === rows[i].id.value),
                sku: rows[i].sku.value,
            };
        }

        return {
            columns: [
                ...columns.map(column => ({
                    ...column,
                    editable: false,
                    deletable: false,
                })),
                {
                    language: languageCode,
                    id: 'esa_attached',
                    type: 'BOOL',
                    label: 'Attached',
                    visible: true,
                    editable: true,
                    deletable: false,
                    parameters: [],
                },
            ],
            filtered,
            rows: tmpRows,
        };
    },
    data() {
        return {
            isSubmitting: false,
            localParams: {
                offset: 0,
                limit: DATA_LIMIT,
                filters: {},
                sortedColumn: {},
            },
            skus: {},
        };
    },
    computed: {
        ...mapState('product', [
            'id',
            'selectAttributes',
            'bindingAttributesIds',
        ]),
        ...mapState('authentication', {
            languageCode: state => state.user.language,
        }),
        collectionCellBinding() {
            return {
                imageColumn: 'esa_default_image',
                descriptionColumn: 'esa_default_label',
            };
        },
        isUserAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT.update,
            ]);
        },
        attributeCodes() {
            return this.selectAttributes
                .filter(
                    attribute => this.bindingAttributesIds
                        .some(
                            id => attribute.id === id,
                        ),
                )
                .map(({
                    key,
                }) => key);
        },
    },
    methods: {
        ...mapActions('product', [
            'getProductChildren',
            'addBySku',
            'removeProductChildren',
        ]),
        ...mapActions('feedback', [
            'onScopeValueChange',
        ]),
        onCellValueChange(cellValues) {
            const drafts = {};

            cellValues.forEach(({
                rowId, columnId, value, row,
            }) => {
                drafts[`${rowId}/${columnId}`] = value;

                this.skus[rowId] = {
                    sku: this.rows[row - 1].sku.value,
                    value,
                };
            });

            this.setDrafts({
                ...this.drafts,
                ...drafts,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'groupProducts',
                value: drafts,
            });
        },
        onEditRow(args) {
            const lastIndex = args.length - 1;

            this.$router.push({
                name: 'product-id-general',
                params: {
                    id: args[lastIndex],
                },
            });
        },
        async onSubmit() {
            this.isSubmitting = true;

            const requests = [];

            Object.keys(this.skus).forEach((key) => {
                const {
                    sku, value,
                } = this.skus[key];

                if (value) {
                    requests.push(this.addBySku({
                        skus: sku,
                    }));
                } else {
                    requests.push(this.removeProductChildren({
                        childrenId: key,
                        skus: sku,
                    }));
                }

                const row = this.rows.find(({
                    id,
                }) => id.value === key);

                if (row) {
                    row.esa_attached.value = value;
                }
            });

            await Promise.all(requests);

            this.setDrafts();
            this.skus = {};

            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Products attachment have been updated',
            });

            this.isSubmitting = false;

            this.markChangeValuesAsSaved(this.scope);
        },
        async onFetchData({
            offset,
            limit,
            filters,
            sortedColumn,
        } = DEFAULT_GRID_FETCH_PARAMS) {
            this.localParams = {
                offset,
                limit,
                filters,
                sortedColumn,
            };
            const filteredProductTypes = await this.$extendMethods('@Products/components/Tabs/ProductVariantsTab/filteredProductTypes', {
                $this: this,
            });
            const productTypes = Array.from(new Set([].concat(...filteredProductTypes))).join(',');
            const defaultColumns = [
                'esa_default_image',
                'esa_default_label',
                ...this.attributeCodes,
                'sku',
                'esa_template',
            ];

            const params = {
                offset,
                limit,
                extended: true,
                filter: `esa_product_type=${productTypes}`,
                columns: defaultColumns.join(','),
            };

            if (Object.keys(sortedColumn).length) {
                const {
                    index: colSortID, orderState,
                } = sortedColumn;

                params.field = colSortID;
                params.order = orderState;
            }

            const {
                columns,
                rows,
                filtered,
            } = await getGridData({
                $axios: this.$axios,
                path: 'products',
                params,
            });

            const {
                collection,
            } = this.getProductChildren(this.id);

            const tmpRows = [
                ...rows,
            ];

            for (let i = 0; i < rows.length; i += 1) {
                tmpRows[i].esa_attached = {
                    value: collection.some(item => item.id === rows[i].id.value),
                    sku: rows[i].sku.value,
                };
            }

            this.columns = [
                ...columns.map(column => ({
                    ...column,
                    editable: false,
                    deletable: false,
                })),
                {
                    language: this.languageCode,
                    id: 'esa_attached',
                    type: 'BOOL',
                    label: 'Attached',
                    visible: true,
                    editable: true,
                    deletable: false,
                    parameters: [],
                },
            ];
            this.filtered = filtered;
            this.rows = tmpRows;
        },
    },
};
</script>
