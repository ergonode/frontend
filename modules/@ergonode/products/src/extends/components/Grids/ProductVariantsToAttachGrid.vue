/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Grid
        :columns="columns"
        :data-count="filtered"
        :rows="rows"
        :disabled-rows="disabledProducts"
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
        <template #actionsHeader>
            <slot name="actionsHeader" />
        </template>
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
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';
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
import {
    mapState,
} from 'vuex';

export default {
    name: 'ProductVariantsToAttachGrid',
    components: {
        UpdateProductsAttachmentButton,
        Grid,
    },
    mixins: [
        gridDraftMixin,
        extendedGridComponentsMixin,
    ],
    async fetch() {
        await Promise.all([
            this.getProductVariants(),
            this.onFetchData(),
        ]);

        this.isPrefetchingData = false;
    },
    data() {
        return {
            columns: [],
            rows: [],
            productVariants: [],
            filtered: 0,
            filterValues: {},
            isPrefetchingData: true,
            skus: {},
            localParams: DEFAULT_GRID_FETCH_PARAMS(),
            pagination: DEFAULT_GRID_PAGINATION(),
        };
    },
    computed: {
        ...mapState('product', [
            'id',
            'bindings',
            'selectAttributes',
        ]),
        bindingAttributes() {
            return this.selectAttributes.filter(
                attribute => this.bindings.some(
                    binding => binding === attribute.id,
                ),
            );
        },
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
        disabledProductCombinations() {
            const disabledCombinations = [];

            this.productVariants.forEach((row) => {
                const combinations = [];

                this.bindingAttributes.forEach((binding) => {
                    combinations.push(row[binding.key].value);
                });

                disabledCombinations.push(combinations.join('|'));
            });

            return disabledCombinations;
        },
        disabledProducts() {
            const disabledProducts = {};

            this.rows.forEach((row) => {
                if (!(this.drafts[`${row.id.value}/attached`]
                    || (row.attached.value && typeof this.drafts[`${row.id.value}/attached`] === 'undefined'))) {
                    const combinations = [];

                    this.bindingAttributes.forEach((binding) => {
                        combinations.push(row[binding.key].value);
                    });

                    if (this.disabledProductCombinations.includes(combinations.join('|'))) {
                        disabledProducts[row.id.value] = true;
                    }
                }
            });

            return disabledProducts;
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
        async getProductVariants() {
            const params = {
                offset: 0,
                limit: 99999,
                view: 'list',
                extended: true,
                filter: `attached${FILTER_OPERATOR.EQUAL}true`,
            };

            await getGridData({
                $route: this.$route,
                $cookies: this.$cookies,
                $axios: this.$axios,
                path: `products/${this.id}/children-and-available-products`,
                params,
                onSuccess: this.onFetchProductVariantsSuccess,
                onError: this.onFetchProductsVariantsError,
            });
        },
        onFetchProductVariantsSuccess({
            rows,
        }) {
            this.productVariants = rows;
        },
        onFetchProductsVariantsError() {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: 'Product variants haven’t been fetched properly',
            });

            this.isPrefetchingData = false;
        },
        async onFetchData() {
            const {
                sortOrder = {}, ...rest
            } = this.localParams;

            const params = {
                ...rest,
                ...sortOrder,
            };

            await getGridData({
                $route: this.$route,
                $cookies: this.$cookies,
                $axios: this.$axios,
                path: `products/${this.id}/children-and-available-products`,
                params,
                onSuccess: this.onFetchGridDataSuccess,
                onError: this.onFetchGridDataError,
            });
        },
        onFetchGridDataError() {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: 'Product variants haven’t been fetched properly',
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

                if (value) {
                    this.productVariants.push(row);
                } else {
                    this.productVariants = this.productVariants.filter(({
                        id,
                    }) => id.value !== rowId);
                }
            });

            this.setDrafts({
                ...this.drafts,
                ...drafts,
            });
        },
    },
};
</script>
