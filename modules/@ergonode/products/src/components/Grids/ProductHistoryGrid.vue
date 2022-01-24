/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Grid
        :scope="scope"
        :columns="columns"
        :data-count="filtered"
        :rows="rows"
        :sort-order="sortOrder"
        :filters="filterValues"
        :pagination="pagination"
        :extended-components="extendedGridComponents"
        :is-prefetching-data="isPrefetchingData"
        :is-basic-filter="true"
        :is-border="true"
        @pagination="onPaginationChange"
        @sort-column="onColumnSortChange"
        @filter="onFilterChange"
        @remove-all-filters="onRemoveAllFilters"
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
        <template #appendFooter>
            <Component
                v-for="(footerItem, index) in extendedFooter"
                :is="footerItem.component"
                :key="index"
                v-bind="bindingProps(footerItem)" />
        </template>
    </Grid>
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    DEFAULT_PAGE,
} from '@Core/defaults/grid';
import extendPropsMixin from '@Core/mixins/extend/extendProps';
import extendedGridComponentsMixin from '@Core/mixins/grid/extendedGridComponentsMixin';
import {
    getDefaultDataFromQueryParams,
    getFilterQueryParams,
    getParams,
    getParsedFilters,
} from '@Core/models/mappers/gridDataMapper';
import {
    getGridData,
} from '@Core/services/grid/getGridData.service';
import PRIVILEGES from '@Products/config/privileges';

export default {
    name: 'ProductHistoryGrid',
    mixins: [
        extendPropsMixin({
            extendedKey: '@Products/components/Grids/ProductHistoryGrid/props',
            extendedNames: [
                'grid',
            ],
        }),
        extendedGridComponentsMixin,
    ],
    props: {
        scope: {
            type: String,
            default: '',
        },
    },
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
            return this.$getExtendSlot('@Products/components/Grids/ProductHistoryGrid/actionHeader');
        },
        extendedFooter() {
            return this.$getExtendSlot('@Products/components/Grids/ProductHistoryGrid/footer');
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT.update,
            ]);
        },
    },
    watch: {
        async $route(to, from) {
            if (from.name !== to.name || from.query.layout !== to.query.layout) {
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
    methods: {
        async onFetchData() {
            await getGridData({
                $cookies: this.$gridCookies,
                $axios: this.$axios,
                path: `products/${this.$route.params.id}/history`,
                params: getParams({
                    $route: this.$route,
                    $cookies: this.$gridCookies,
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
                message: 'Product history haven’t been fetched properly',
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
        bindingProps({
            props = {},
        }) {
            const query = getFilterQueryParams(this.$route.query);

            return {
                disabled: !this.isAllowedToUpdate,
                query: query.replace(/\[|\]/g, ''),
                ...props,
            };
        },
    },
};
</script>
