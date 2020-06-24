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
                :collection-cell-binding="{
                    imageColumn: 'default_image',
                    descriptionColumn: 'default_label'
                }"
                :is-collection-layout="true"
                :is-header-visible="true"
                :is-centered-view="true"
                @fetchData="getGridData" />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import { mapState } from 'vuex';
import { TYPES } from '@Attributes/defaults/attributes';
import { getGridData } from '@Core/services/grid/getGridData.service';
import { getParsedFilters } from '@Core/models/mappers/gridDataMapper';
import { DATA_LIMIT } from '@Core/defaults/grid';
import { PRODUCT_TYPE } from '@Products/defaults';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';

const getAttributesByFilter = () => import('@Attributes/services/getAttributesByFilter.service');

export default {
    name: 'ProductVariantsTab',
    components: {
        ResponsiveCenteredViewTemplate,
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

        return Promise.all([
            getAttributesByFilter().then(
                response => response.default({
                    $axios: app.$axios,
                    $store: store,
                    filter: `type=${TYPES.SELECT}`,
                }),
            ),
            app.$axios.$get(`${languageCode}/products/${id}/bindings`),
            app.$axios.$get(`${languageCode}/products/${id}/children`, { params: productsParams }),
        ]).then(([selectAttributes, productBindings, productChildren]) => {
            const attributeCodes = selectAttributes
                .filter(
                    attribute => productBindings
                        .some(
                            attrId => attribute.id === attrId,
                        ),
                )
                .map(({ key }) => key);

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
                        ...columns.map(column => ({
                            ...column,
                            editable: false,
                            deletable: false,
                        })),
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
        isUserAllowedToUpdate() {
            return this.$hasAccess(['PRODUCT_UPDATE']);
        },
        attributeCodes() {
            return this.selectAttributes
                .filter(
                    attribute => this.bindingAttributesIds
                        .some(
                            id => attribute.id === id,
                        ),
                )
                .map(({ key }) => key).join(',');
        },
    },
    methods: {
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
                filter: `${getParsedFilters(filters, [])},esa_product_type:${this.languageCode}=${PRODUCT_TYPE.SIMPLE_PRODUCT}`,
                columns: `esa_default_image:${this.languageCode},esa_default_label:${this.languageCode},${this.attributeCodes},sku,esa_template:${this.languageCode}`,
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
                        ...columns.map(column => ({
                            ...column,
                            editable: false,
                            deletable: false,
                        })),
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
