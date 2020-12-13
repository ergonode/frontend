/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Grid
        :columns="columns"
        :data-count="filtered"
        :rows="rows"
        :drafts="drafts"
        :pagination="pagination"
        :filters="filterValues"
        :sort-order="localParams.sortOrder"
        :collection-cell-binding="collectionCellBinding"
        :extended-components="extendedGridComponents"
        :is-prefetching-data="isPrefetchingData"
        :is-collection-layout="true"
        :is-editable="true"
        :is-header-visible="true"
        :is-basic-filter="true"
        @cell-value="onCellValueChange"
        @pagination="onPaginationChange"
        @sort-column="onColumnSortChange"
        @remove-all-filters="onRemoveAllFilters"
        @filter="onFilterChange">
        <template #appendFooter>
            <UpdateProductsAttachmentButton
                :skus="skus"
                @updated="onProductsAttachmentUpdated" />
        </template>
    </Grid>
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    DEFAULT_GRID_FETCH_PARAMS,
    DEFAULT_GRID_PAGINATION,
} from '@Core/defaults/grid';
import extendedGridComponentsMixin from '@Core/mixins/grid/extendedGridComponentsMixin';
import gridDraftMixin from '@Core/mixins/grid/gridDraftMixin';
import {
    getParsedFilters,
} from '@Core/models/mappers/gridDataMapper';
import {
    getGridData,
} from '@Core/services/grid/getGridData.service';
import UpdateProductsAttachmentButton from '@Products/extends/components/Buttons/UpdateProductsAttachmentButton';
import Grid from '@UI/components/Grid/Grid';

export default {
    name: 'ProductsToAttachForGroupGrid',
    components: {
        UpdateProductsAttachmentButton,
        Grid,
    },
    mixins: [
        gridDraftMixin,
        extendedGridComponentsMixin,
    ],
    async fetch() {
        await this.onFetchData();

        this.isPrefetchingData = false;
    },
    data() {
        return {
            columns: [],
            rows: [],
            filtered: 0,
            filterValues: {},
            isPrefetchingData: true,
            skus: {},
            localParams: DEFAULT_GRID_FETCH_PARAMS(),
            pagination: DEFAULT_GRID_PAGINATION(),
        };
    },
    computed: {
        collectionCellBinding() {
            return {
                imageColumn: 'default_image',
                descriptionColumn: 'default_label',
                type: 'PRODUCT_ATTACH',
                additionalColumns: [
                    'attached',
                ],
            };
        },
    },
    methods: {
        onPaginationChange(pagination) {
            this.pagination = pagination;
            this.localParams.limit = pagination.itemsPerPage;
            this.localParams.offset = (pagination.page - 1) * pagination.itemsPerPage;

            this.onFetchData();
        },
        onFilterChange(filters) {
            this.filterValues = filters;
            this.pagination.page = 1;
            this.localParams.filter = getParsedFilters(filters);
            this.localParams.offset = (this.pagination.page - 1) * this.pagination.itemsPerPage;

            this.onFetchData();
        },
        onRemoveAllFilters() {
            this.filterValues = {};
            this.pagination.page = 1;
            this.localParams.filter = '';
            this.localParams.offset = 0;

            this.onFetchData();
        },
        onColumnSortChange(sortOrder) {
            this.localParams.sortOrder = sortOrder;

            this.onFetchData();
        },
        async onProductsAttachmentUpdated() {
            const skusKeys = Object.keys(this.skus);

            skusKeys.forEach((key) => {
                const rowIndex = this.rows.findIndex(({
                    id,
                }) => id.value === key);

                if (rowIndex !== -1) {
                    this.rows[rowIndex].attached.value = this.skus[key].value;
                }
            });

            this.setDrafts();
            this.skus = {};
        },
        async onFetchData() {
            await getGridData({
                $route: this.$route,
                $cookies: this.$cookies,
                $axios: this.$axios,
                path: `products/${this.$route.params.id}/children-and-available-products`,
                params: this.localParams,
                onSuccess: this.onFetchGridDataSuccess,
                onError: this.onFetchGridDataError,
            });
        },
        onFetchGridDataError() {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: 'Products haven’t been fetched properly',
            });

            this.isPrefetchingData = false;
        },
        onFetchGridDataSuccess({
            columns,
            rows,
            filtered,
        }) {
            this.columns = columns.map((column) => {
                if (column.id === 'attached') {
                    return {
                        ...column,
                        filter: {
                            type: 'SELECT',
                            options: {
                                false: {
                                    label: 'Not attached',
                                },
                                true: {
                                    label: 'Attached',
                                },
                            },
                        },
                    };
                }

                return {
                    ...column,
                    editable: false,
                };
            });
            this.rows = rows.map(({
                // eslint-disable-next-line no-unused-vars
                _links, ...rest
            }) => ({
                ...rest,
            }));
            this.filtered = filtered;

            this.isPrefetchingData = false;
        },
        onCellValueChange(cellValues) {
            const drafts = {};

            cellValues.forEach(({
                rowId,
                columnId,
                value,
            }) => {
                drafts[`${rowId}/${columnId}`] = value;

                const row = this.rows.find(({
                    id,
                }) => rowId === id.value);

                this.skus[rowId] = {
                    sku: row.sku.value,
                    value,
                };
            });

            this.setDrafts({
                ...this.drafts,
                ...drafts,
            });
        },
    },
};
</script>
