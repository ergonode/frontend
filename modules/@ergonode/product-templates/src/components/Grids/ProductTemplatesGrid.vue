/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Grid
        :columns="columns"
        :data-count="filtered"
        :rows="rows"
        :sort-order="sortOrder"
        :filters="filterValues"
        :pagination="pagination"
        :default-layout="gridLayout.COLLECTION"
        :collection-cell-binding="collectionCellBinding"
        :extended-components="extendedGridComponents"
        :is-editable="isAllowedToUpdate"
        :is-prefetching-data="isPrefetchingData"
        :is-collection-layout="true"
        :is-header-visible="true"
        :is-basic-filter="true"
        :is-border="true"
        @edit-row="onEditRow"
        @preview-row="onEditRow"
        @delete-row="onRemoveRow"
        @pagination="onPaginationChange"
        @sort-column="onColumnSortChange"
        @filter="onFilterChange"
        @remove-all-filters="onRemoveAllFilters"
        v-bind="extendedProps['grid']">
        <template #noDataPlaceholder>
            <GridNoDataPlaceholder
                :title="$t('productTemplate.grid.placeholderTitle')"
                :subtitle="$t('productTemplate.grid.placeholderSubtitle')">
                <template #action>
                    <CreateProductTemplateButton />
                </template>
            </GridNoDataPlaceholder>
        </template>
        <template #actionsHeader>
            <template
                v-for="(actionItem, index) in extendedActionHeader">
                <Component
                    :is="actionItem.component"
                    :key="index"
                    v-bind="bindingProps(actionItem)" />
            </template>
        </template>
    </Grid>
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    DEFAULT_PAGE,
    GRID_LAYOUT,
} from '@Core/defaults/grid';
import extendPropsMixin from '@Core/mixins/extend/extendProps';
import extendedGridComponentsMixin from '@Core/mixins/grid/extendedGridComponentsMixin';
import {
    getDefaultDataFromQueryParams,
    getParams,
    getParsedFilters,
} from '@Core/models/mappers/gridDataMapper';
import {
    getGridData,
} from '@Core/services/grid/getGridData.service';
import CreateProductTemplateButton from '@Templates/components/Buttons/CreateProductTemplateButton';
import PRIVILEGES from '@Templates/config/privileges';
import {
    ROUTE_NAME,
} from '@Templates/config/routes';
import {
    PRODUCT_TEMPLATE_CREATED_EVENT_NAME,
} from '@Templates/defaults';
import Grid from '@UI/components/Grid/Grid';
import GridNoDataPlaceholder from '@UI/components/Grid/GridNoDataPlaceholder';

export default {
    name: 'ProductTemplatesGrid',
    components: {
        CreateProductTemplateButton,
        Grid,
        GridNoDataPlaceholder,
    },
    mixins: [
        extendPropsMixin({
            extendedKey: '@Templates/components/Grids/ProductTemplatesGrid/props',
            extendedNames: [
                'grid',
            ],
        }),
        extendedGridComponentsMixin,
    ],
    async fetch() {
        await this.onFetchData();

        this.isPrefetchingData = false;
    },
    data() {
        const {
            filterValues,
            pagination,
            sortOrder,
        } = getDefaultDataFromQueryParams(this.$route);

        return {
            filterValues,
            pagination,
            sortOrder,
            rows: [],
            columns: [],
            filtered: 0,
            isPrefetchingData: true,
        };
    },
    computed: {
        extendedActionHeader() {
            return this.$getExtendSlot('@Templates/components/Grids/ProductTemplatesGrid/actionsHeader');
        },
        collectionCellBinding() {
            return {
                imageColumn: 'image_id',
                descriptionColumn: 'name',
            };
        },
        gridLayout() {
            return GRID_LAYOUT;
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.TEMPLATE_DESIGNER.update,
            ]);
        },
    },
    watch: {
        async $route(from, to) {
            if (from.name !== to.name) {
                return;
            }

            const {
                filterValues,
                pagination,
                sortOrder,
            } = getDefaultDataFromQueryParams(this.$route);

            this.filterValues = filterValues;
            this.pagination = pagination;
            this.sortOrder = sortOrder;

            await this.onFetchData();

            this.isPrefetchingData = false;
        },
    },
    mounted() {
        document.documentElement.addEventListener(
            PRODUCT_TEMPLATE_CREATED_EVENT_NAME,
            this.onProductTemplateCreated,
        );
    },
    beforeDestroy() {
        document.documentElement.removeEventListener(
            PRODUCT_TEMPLATE_CREATED_EVENT_NAME,
            this.onProductTemplateCreated,
        );
    },
    methods: {
        bindingProps({
            props = {},
        }) {
            return {
                privileges: PRIVILEGES.TEMPLATE_DESIGNER,
                ...props,
            };
        },
        onProductTemplateCreated() {
            this.onFetchData();
        },
        onRemoveRow() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Product template removed',
            });
            this.onFetchData();
        },
        onEditRow(args) {
            const lastIndex = args.length - 1;

            this.$router.push({
                name: ROUTE_NAME.PRODUCT_TEMPLATE_EDIT_GENERAL,
                params: {
                    id: args[lastIndex],
                },
            });
        },
        async onFetchData() {
            await getGridData({
                $route: this.$route,
                $cookies: this.$cookies,
                $axios: this.$axios,
                path: 'templates',
                params: getParams({
                    $route: this.$route,
                    $cookies: this.$cookies,
                }),
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
                message: 'Product templates haven’t been fetched properly',
            });
        },
        onRemoveAllFilters() {
            const query = {
                ...this.$route.query,
                page: DEFAULT_PAGE,
            };

            delete query.filter;

            this.$router.replace({
                query,
            });

            this.isPrefetchingData = true;
        },
        onFilterChange(filters) {
            const query = {
                ...this.$route.query,
                page: DEFAULT_PAGE,
                filter: getParsedFilters(filters),
            };

            if (query.filter === '' || query.filter === null) {
                delete query.filter;
            }

            this.$router.replace({
                query,
            });
        },
        onColumnSortChange(sortOrder) {
            this.$router.replace({
                query: {
                    ...this.$route.query,
                    ...sortOrder,
                },
            });
        },
        onPaginationChange(pagination) {
            this.$router.replace({
                query: {
                    ...this.$route.query,
                    ...pagination,
                },
            });
        },
    },
};
</script>
