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
                :is-basic-filter="true"
                @fetchData="getGridData" />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import { mapState } from 'vuex';
import { getGridData } from '@Core/services/grid/getGridData.service';
import { getParsedFilters } from '@Core/models/mappers/gridDataMapper';
import { DATA_LIMIT } from '@Core/defaults/grid';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';

export default {
    name: 'ProductVariantsTab',
    components: {
        ResponsiveCenteredViewTemplate,
        Grid: () => import('@Core/components/Grid/Grid'),
    },
    fetch() {
        return this.getGridData(this.localParams);
    },
    data() {
        return {
            data: {},
            columns: [],
            filtered: 0,
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
                filter: getParsedFilters(filters, []),
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
                this.columns = columns;
                this.data = data;
                this.filtered = filtered;
            });
        },
    },
};
</script>
