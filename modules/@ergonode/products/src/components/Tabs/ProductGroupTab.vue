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
                :collection-cell-binding="collectionCellBinding"
                :is-collection-layout="true"
                :is-header-visible="true"
                :is-border="true"
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
import IconAdd from '@Core/components/Icons/Actions/IconAdd';
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';
import {
    DATA_LIMIT,
    DEFAULT_GRID_FETCH_PARAMS,
} from '@Core/defaults/grid';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
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
        Grid: () => import('@Core/components/Grid/Grid'),
    },
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
                    type: 'PRODUCT_ATTACH',
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
            selectedAppModalOption: null,
            localParams: {
                offset: 0,
                limit: DATA_LIMIT,
                filters: {},
                sortedColumn: {},
            },
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
            const {
                collection,
            } = await this.getProductChildren(this.id);

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
                    type: 'PRODUCT_ATTACH',
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
