/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Grid
        :columns="columns"
        :data-count="filtered"
        :pagination="pagination"
        :filters="filterValues"
        :sort-order="localParams.sortOrder"
        :rows="rows"
        :collection-cell-binding="collectionCellBinding"
        :extended-components="extendedGridComponents"
        :is-editable="isAllowedToUpdate"
        :is-prefetching-data="isPrefetchingData"
        :is-select-column="true"
        :is-basic-filter="true"
        :is-header-visible="true"
        @edit-row="onEditRow"
        @preview-row="onEditRow"
        @delete-row="onRemoveRow"
        @pagination="onPaginationChange"
        @sort-column="onColumnSortChange"
        @remove-all-filters="onRemoveAllFilters"
        @filter="onFilterChange"
        v-bind="extendedProps['grid']">
        <template #actionsHeader="actionsHeaderProps">
            <Component
                v-for="(headerItem, index) in extendedActionHeader"
                :is="headerItem.component"
                :key="index"
                v-bind="bindingProps({
                    props: {
                        ...actionsHeaderProps,
                        ...headerItem.props,
                    },
                })" />
        </template>
        <template #noDataPlaceholder>
            <GridNoDataPlaceholder
                :title="$t('@Products.product._.noProduct')"
                :subtitle="$t('@Products.product._.createFirst')" />
        </template>
        <template
            #appendFooter="{
                selectedRows,
                excludedFromSelectionRows,
                selectedRowsCount,
                onClearSelectedRows,
            }">
            <Component
                v-for="(footerItem, index) in extendedFooter"
                :is="footerItem.component"
                :key="index"
                v-bind="bindingProps(footerItem)" />
            <AddProductRelationsButton
                :selected-rows="selectedRows"
                :excluded-from-selection-rows="excludedFromSelectionRows"
                :selected-rows-count="selectedRowsCount"
                :on-clear-selected-rows="onClearSelectedRows" />
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
import extendPropsMixin from '@Core/mixins/extend/extendProps';
import extendedGridComponentsMixin from '@Core/mixins/grid/extendedGridComponentsMixin';
import {
    getParsedFilters,
} from '@Core/models/mappers/gridDataMapper';
import {
    getGridData,
} from '@Core/services/grid/getGridData.service';
import AddProductRelationsButton from '@Products/components/Buttons/AddProductRelationsButton';
import PRIVILEGES from '@Products/config/privileges';
import {
    ROUTE_NAME,
} from '@Products/config/routes';
import Grid from '@UI/components/Grid/Grid';
import GridNoDataPlaceholder from '@UI/components/Grid/GridNoDataPlaceholder';
import IntersectionObserver from '@UI/components/Observers/IntersectionObserver';
import {
    debounce,
} from 'debounce';

export default {
    name: 'AddProductRelationsGrid',
    components: {
        AddProductRelationsButton,
        Grid,
        GridNoDataPlaceholder,
        IntersectionObserver,
    },
    mixins: [
        extendPropsMixin({
            extendedKey: '@Products/components/Grids/AddProductRelationsGrid/props',
            extendedNames: [
                'grid',
            ],
        }),
        extendedGridComponentsMixin,
    ],
    props: {
        value: {
            type: [
                String,
                Array,
            ],
            default: '',
        },
        productId: {
            type: String,
            default: '',
        },
    },
    async fetch() {
        await this.onFetchData();

        this.isPrefetchingData = false;
    },
    data() {
        return {
            searchValue: null,
            isPrefetchingData: true,
            filterValues: {},
            rows: [],
            columns: [],
            filtered: 0,
            localParams: DEFAULT_GRID_FETCH_PARAMS(),
            pagination: DEFAULT_GRID_PAGINATION(),
        };
    },
    computed: {
        extendedActionHeader() {
            return this.$getExtendSlot('@Products/components/Grids/AddProductRelationsGrid/actionHeader');
        },
        extendedFooter() {
            return this.$getExtendSlot('@Products/components/Grids/AddProductRelationsGrid/footer');
        },
        collectionCellBinding() {
            return {
                imageColumn: 'esa_default_image',
                descriptionColumn: 'esa_default_label',
                type: 'PRODUCT_ATTACH',
                additionalColumns: [
                    'attached',
                ],
            };
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT.update,
            ]);
        },
    },
    created() {
        this.onDebounceSearch = debounce(this.onSearch, 500);
    },
    beforeDestroy() {
        delete this.onDebounceSearch;
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
        async onFetchData() {
            const {
                sortOrder = {}, ...rest
            } = this.localParams;

            const path = 'products';
            const columns = 'sku,esa_template,esa_default_label,esa_default_image,_links';

            // TODO:
            // Filter based: Get all products except this.productId and this.value

            const params = {
                ...rest,
                ...sortOrder,
                columns,
            };

            await getGridData({
                $route: this.$route,
                $cookies: this.$userCookies,
                $axios: this.$axios,
                path,
                params,
                onSuccess: this.onFetchDataSuccess,
                onError: this.onFetchDataError,
            });
        },
        onFetchDataSuccess({
            columns,
            rows,
            filtered,
        }) {
            this.columns = columns;
            this.rows = rows;
            this.filtered = filtered;
        },
        onFetchDataError() {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: this.$t('@Products.product.components.AddProductRelationsGrid.errorGetMessage'),
            });
        },
        onRemoveRow() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Products.product.components.AddProductRelationsGrid.successRemoveMessage'),
            });
            this.onFetchData();
        },
        onSearch(value) {
            this.searchValue = value;
        },
        onEditRow(args) {
            const lastIndex = args.length - 1;

            this.$router.push({
                name: ROUTE_NAME.PRODUCT_EDIT_GENERAL,
                params: {
                    id: args[lastIndex],
                },
            });
        },
        bindingProps({
            props = {},
        }) {
            return {
                disabled: !this.isAllowedToUpdate,
                query: getParsedFilters(this.localParams.filter),
                ...props,
            };
        },
    },
};
</script>
