/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate>
        <template #content>
            <Grid
                :is-editable="$hasAccess(['PRODUCT_UPDATE'])"
                :columns="columns"
                :data-count="filtered"
                :data="data"
                :collection-cell-binding="collectionCellBinding"
                :is-collection-layout="true"
                :is-header-visible="true"
                :is-centered-view="true"
                @fetchData="getGridData">
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
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import { mapState } from 'vuex';
import { SIZE, THEME } from '@Core/defaults/theme';
import { ADD_PRODUCT, PRODUCT_TYPE } from '@Products/defaults';
import { getGridData } from '@Core/services/grid/getGridData.service';
import { getParsedFilters } from '@Core/models/mappers/gridDataMapper';
import { DATA_LIMIT } from '@Core/defaults/grid';

import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import IconAdd from '@Core/components/Icons/Actions/IconAdd';
import ActionButton from '@Core/components/Buttons/ActionButton';

export default {
    name: 'ProductVariantsTab',
    components: {
        ResponsiveCenteredViewTemplate,
        ActionButton,
        IconAdd,
        Grid: () => import('@Core/components/Grid/Grid'),
    },
    asyncData({ app, store, params: { id } }) {
        const { language: languageCode } = store.state.authentication.user;
        const productsParams = {
            limit: 9999,
            offset: 0,
            view: 'list',
            order: 'ASC',
        };

        return app.$axios.$get(`${languageCode}/products/${id}/children`, { params: productsParams }).then((productChildren) => {
            const params = {
                offset: 0,
                limit: DATA_LIMIT,
                extended: true,
                filter: `esa_product_type:${languageCode}=${PRODUCT_TYPE.SIMPLE_PRODUCT},${PRODUCT_TYPE.WITH_VARIANTS}`,
                columns: `esa_default_image:${languageCode},esa_default_label:${languageCode},esa_product_type:${languageCode},sku,esa_template:${languageCode}`,
            };

            return getGridData({
                $axios: app.$axios,
                path: `${languageCode}/products`,
                params,
            }).then(({
                columns,
                data,
                filtered,
            }) => {
                const tmpData = { ...data, esa_attached: [] };

                for (let j = 0; j < data.id.length; j += 1) {
                    tmpData.esa_attached[j] = {
                        value: productChildren.collection.some(item => item.id === data.id[j]),
                        sku: data.sku[j].value,
                    };
                }

                return {
                    columns: [
                        ...columns.map(column => ({ ...column, editable: false })),
                        {
                            language: languageCode,
                            id: 'esa_attached',
                            type: 'ATTACHMENT',
                            label: 'Attached',
                            visible: true,
                            editable: true,
                            deletable: false,
                            parameters: [],
                        },
                    ],
                    filtered,
                    data: tmpData,
                };
            });
        });
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
        ...mapState('product', {
            id: state => state.id,
        }),
        ...mapState('authentication', {
            languageCode: state => state.user.language,
        }),
        collectionCellBinding() {
            return {
                imageColumn: `esa_default_image:${this.languageCode}`,
                descriptionColumn: `esa_default_label:${this.languageCode}`
            }
        },
        isUserAllowedToUpdate() {
            return this.$hasAccess(['PRODUCT_UPDATE']);
        },
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        addProductOptions() {
            return Object.values(ADD_PRODUCT);
        },
        modalComponent() {
            switch (this.selectedAppModalOption) {
            case ADD_PRODUCT.FROM_SEGMENT:
                return () => import('@Products/components/Modals/AddProductsFromSegmentModalForm');
            case ADD_PRODUCT.BY_SKU:
                return () => import('@Products/components/Modals/AddProductsBySKUModalForm');
            default: return null;
            }
        },
    },
    methods: {
        onSelectAddProductOption(option) {
            this.selectedAppModalOption = option;
        },
        onCloseModal() {
            this.selectedAppModalOption = null;
        },
        onCreatedData() {
            this.getGridData(this.localParams);
            this.selectedAppModalOption = null;
        },
        getGridData({
            offset, limit, filters, sortedColumn,
        }) {
            this.localParams = {
                offset, limit, filters, sortedColumn,
            };

            const params = {
                offset,
                limit,
                extended: true,
                filter: `${getParsedFilters(filters, [])},esa_product_type:${this.languageCode}=${PRODUCT_TYPE.SIMPLE_PRODUCT},${PRODUCT_TYPE.WITH_VARIANTS}`,
                columns: `esa_default_image:${this.languageCode},esa_default_label:${this.languageCode},esa_product_type:${this.languageCode},sku,esa_template:${this.languageCode}`,
            };

            if (Object.keys(sortedColumn).length) {
                const { index: colSortID, orderState } = sortedColumn;

                params.field = colSortID;
                params.order = orderState;
            }

            return getGridData({
                $axios: this.$axios,
                path: `${this.languageCode}/products`,
                params,
            }).then(({
                columns,
                data,
                filtered,
            }) => {
                const productsParams = {
                    limit: 9999,
                    offset: 0,
                    view: 'list',
                    order: 'ASC',
                };

                return this.$axios.$get(`${this.languageCode}/products/${this.id}/children`, { params: productsParams }).then(({ collection }) => {
                    const tmpData = { ...data, esa_attached: [] };

                    for (let j = 0; j < data.id.length; j += 1) {
                        tmpData.esa_attached[j] = {
                            value: collection.some(item => item.id === data.id[j]),
                            sku: data.sku[j].value,
                        };
                    }

                    this.columns = [
                        ...columns.map(column => ({ ...column, editable: false })),
                        {
                            language: this.languageCode,
                            id: 'esa_attached',
                            type: 'ATTACHMENT',
                            label: 'Attached',
                            visible: true,
                            editable: true,
                            deletable: false,
                            parameters: [],
                        },
                    ];
                    this.filtered = filtered;
                    this.data = tmpData;
                });
            });
        },
    },
};
</script>
