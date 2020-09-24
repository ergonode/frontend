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
                @cellValue="onCellValueChange"
                @fetchData="onFetchData">
                <template #actions>
                    <ActionButton
                        title="ADD PRODUCTS"
                        :theme="secondaryTheme"
                        :disabled="!isUserAllowedToUpdate"
                        :size="smallSize"
                        :options="addProductOptions"
                        :fixed-content="true"
                        @input="onSelectAddProductOption">
                        <template #prepend="{ color }">
                            <IconAdd :fill-color="color" />
                        </template>
                    </ActionButton>
                </template>
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
            <Component
                v-if="selectedAppModalOption"
                :is="modalComponent"
                @close="onCloseModal"
                @added="onCreatedData" />
        </template>
    </CenterViewTemplate>
</template>

<script>
import ActionButton from '@Core/components/ActionButton/ActionButton';
import Button from '@Core/components/Button/Button';
import Grid from '@Core/components/Grid/Grid';
import IconAdd from '@Core/components/Icons/Actions/IconAdd';
import IconSpinner from '@Core/components/Icons/Feedback/IconSpinner';
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    DATA_LIMIT,
    DEFAULT_GRID_FETCH_PARAMS,
} from '@Core/defaults/grid';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import gridDraftMixin from '@Core/mixins/grid/gridDraftMixin';
import tabFeedbackMixin from '@Core/mixins/tab/tabFeedbackMixin';
import {
    getGridData,
} from '@Core/services/grid/getGridData.service';
import PRIVILEGES from '@Products/config/privileges';
import {
    ADD_PRODUCT,
    EXTENDS,
    PRODUCT_TYPE,
} from '@Products/defaults';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ProductGroupTab',
    components: {
        CenterViewTemplate,
        ActionButton,
        IconAdd,
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

        const productChildren = await store.dispatch('product/getProductChildren', id);

        const params = {
            offset: 0,
            limit: DATA_LIMIT,
            extended: true,
            filter: `esa_product_type=${PRODUCT_TYPE.SIMPLE_PRODUCT},${PRODUCT_TYPE.WITH_VARIANTS}`,
            columns: 'esa_default_image,esa_default_label,esa_product_type,sku,esa_template',
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

        for (let i = 0; i < tmpRows.length; i += 1) {
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
            selectedAppModalOption: null,
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
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        addProductOptions() {
            const options = Object.values(ADD_PRODUCT);

            this.extendedComponents.forEach((option) => {
                options.push(option.name);
            });
            return options;
        },
        extendedComponents() {
            return this.$getExtendedComponents(EXTENDS.PRODUCT_GROUP_ADD_PRODUCTS);
        },
        modalComponent() {
            const modals = [
                {
                    component: () => import('@Products/components/Modals/AddProductsBySKUModalForm'),
                    name: ADD_PRODUCT.BY_SKU,
                },
                ...this.extendedComponents,
            ];

            return modals.find(modal => modal.name === this.selectedAppModalOption).component;
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
        onSelectAddProductOption(option) {
            this.selectedAppModalOption = option;
        },
        onCloseModal() {
            this.selectedAppModalOption = null;
        },
        onCreatedData() {
            this.onFetchData(this.localParams);
            this.selectedAppModalOption = null;
        },
        onCellValueChange(cellValues) {
            const drafts = {};

            cellValues.forEach(({
                rowId, columnId, value, row,
            }) => {
                drafts[`${rowId}/${columnId}`] = value;

                this.skus[rowId] = {
                    sku: this.rows[row].sku.value,
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
            });

            await Promise.all(requests);

            this.setDrafts();

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

            const params = {
                offset,
                limit,
                extended: true,
                filter: `esa_product_type=${PRODUCT_TYPE.SIMPLE_PRODUCT},${PRODUCT_TYPE.WITH_VARIANTS}`,
                columns: 'esa_default_image,esa_default_label,esa_product_type,sku,esa_template',
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
            const collection = await this.getProductChildren(this.id);

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
            this.rows = rows;
        },
    },
};
</script>
