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
                @fetchData="onFetchData" />
        </template>
    </CenterViewTemplate>
</template>

<script>
import {
    TYPES,
} from '@Attributes/defaults/attributes';
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';
import {
    DATA_LIMIT,
    DEFAULT_GRID_FETCH_PARAMS,
} from '@Core/defaults/grid';
import {
    getGridData,
} from '@Core/services/grid/getGridData.service';
import PRIVILEGES from '@Products/config/privileges';
import {
    PRODUCT_TYPE,
} from '@Products/defaults';
import {
    mapState,
} from 'vuex';

const getAttributesByFilter = () => import('@Attributes/services/getAttributesByFilter.service');

export default {
    name: 'ProductVariantsTab',
    components: {
        CenterViewTemplate,
        Grid: () => import('@Core/components/Grid/Grid'),
    },
    asyncData({
        app, store, params: {
            id,
        },
    }) {
        const {
            language: languageCode,
        } = store.state.authentication.user;
        const productsParams = {
            limit: 9999,
            offset: 0,
            view: 'list',
            order: 'ASC',
        };

        return Promise.all([
            getAttributesByFilter().then(
                response => response.default({
                    $axios: app.$axios,
                    $store: store,
                    filter: `type=${TYPES.SELECT}`,
                }),
            ),
            app.$axios.$get(`${languageCode}/products/${id}/bindings`),
            app.$axios.$get(`${languageCode}/products/${id}/children`, {
                params: productsParams,
            }),
        ]).then(([
            selectAttributes,
            productBindings,
            productChildren,
        ]) => {
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

            const params = {
                offset: 0,
                limit: DATA_LIMIT,
                extended: true,
                filter: `${attributeCodes.map(attr => `${attr}!=`).join(';')},esa_product_type:${languageCode}=${PRODUCT_TYPE.SIMPLE_PRODUCT}`,
                columns: `esa_default_image:${languageCode},esa_default_label:${languageCode},${attributeCodes.join(',')},sku,esa_template:${languageCode}`,
            };

            return getGridData({
                $axios: app.$axios,
                path: `${languageCode}/products`,
                params,
            }).then(({
                columns,
                rows,
                filtered,
            }) => {
                const tmpRows = [
                    ...rows,
                ];

                for (let i = 0; i < rows.length; i += 1) {
                    tmpRows[i].esa_attached = {
                        value: productChildren.collection
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
            });
        });
    },
    data() {
        return {
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
            selectAttributes: state => state.selectAttributes,
            bindingAttributesIds: state => state.bindingAttributesIds,
        }),
        ...mapState('authentication', {
            languageCode: state => state.user.language,
        }),
        collectionCellBinding() {
            return {
                imageColumn: `esa_default_image:${this.languageCode}`,
                descriptionColumn: `esa_default_label:${this.languageCode}`,
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
                }) => key).join(',');
        },
    },
    methods: {
        onFetchData({
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
                filter: `esa_product_type:${this.languageCode}=${PRODUCT_TYPE.SIMPLE_PRODUCT}`,
                columns: `esa_default_image:${this.languageCode},esa_default_label:${this.languageCode},${this.attributeCodes},sku,esa_template:${this.languageCode}`,
            };

            if (Object.keys(sortedColumn).length) {
                const {
                    index: colSortID, orderState,
                } = sortedColumn;

                params.field = colSortID;
                params.order = orderState;
            }

            return getGridData({
                $axios: this.$axios,
                path: `${this.languageCode}/products`,
                params,
            }).then(({
                columns,
                rows,
                filtered,
            }) => {
                const productsParams = {
                    limit: 9999,
                    offset: 0,
                    view: 'list',
                    order: 'ASC',
                };

                return this.$axios.$get(`${this.languageCode}/products/${this.id}/children`, {
                    params: productsParams,
                }).then(({
                    collection,
                }) => {
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
                    this.rows = tmpRows;
                });
            });
        },
    },
};
</script>
