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
        :extended-components="extendedGridComponents"
        :is-editable="isAllowedToUpdate"
        :is-prefetching-data="isPrefetchingData"
        :is-basic-filter="true"
        :is-border="true"
        @edit-row="onEditRow"
        @preview-row="onEditRow"
        @delete-row="onRemoveRow"
        @pagination="onPaginationChange"
        @sort-column="onColumnSortChange"
        @filter="onFilterChange"
        @remove-all-filters="onRemoveAllFilters">
        <template #noDataPlaceholder>
            <GridNoDataPlaceholder
                :title="$t('transition.grid.placeholderTitle')"
                :subtitle="$t('transition.grid.placeholderSubtitle')">
                <template #action>
                    <CreateStatusTransitionButton />
                </template>
            </GridNoDataPlaceholder>
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
import extendedGridComponentsMixin from '@Core/mixins/grid/extendedGridComponentsMixin';
import {
    getDefaultDataFromQueryParams,
    getParams,
    getParsedFilters,
} from '@Core/models/mappers/gridDataMapper';
import {
    getGridData,
} from '@Core/services/grid/getGridData.service';
import PRIVILEGES from '@Transitions/config/privileges';
import {
    ROUTE_NAME,
} from '@Transitions/config/routes';
import {
    TRANSITION_CREATED_EVENT_NAME,
} from '@Transitions/defaults';
import {
    WHITESMOKE,
} from '@UI/assets/scss/_js-variables/colors.scss';
import Grid from '@UI/components/Grid/Grid';
import GridNoDataPlaceholder from "@UI/components/Grid/GridNoDataPlaceholder";
import CreateStatusTransitionButton from "@Transitions/components/Buttons/CreateStatusTransitionButton";

export default {
    name: 'TransitionsGrid',
    components: {
        CreateStatusTransitionButton,
        Grid,
        GridNoDataPlaceholder,
    },
    mixins: [
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
        noDataPlaceholder() {
            return {
                title: 'No workflow transitions',
                subtitle: 'There are no workflow transitions in the system, you can create the first one.',
                bgUrl: require('@UI/assets/images/placeholders/comments.svg'),
                color: WHITESMOKE,
            };
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.WORKFLOW.update,
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
            TRANSITION_CREATED_EVENT_NAME,
            this.onTransitionCreated,
        );
    },
    beforeDestroy() {
        document.documentElement.removeEventListener(
            TRANSITION_CREATED_EVENT_NAME,
            this.onTransitionCreated,
        );
    },
    methods: {
        onTransitionCreated() {
            this.onFetchData();
        },
        onRemoveRow() {
            this.onFetchData();
        },
        onEditRow(args) {
            const lastIndex = args.length - 1;
            const id = `${args[lastIndex - 1].replace(/%20/g, ' ')}--${args[lastIndex].replace(/%20/g, ' ')}`;

            this.$router.push({
                name: ROUTE_NAME.STATUS_TRANSITION_EDIT_GENERAL,
                params: {
                    id,
                },
            });
        },
        async onFetchData() {
            await getGridData({
                $route: this.$route,
                $cookies: this.$cookies,
                $axios: this.$axios,
                path: 'workflow/default/transitions',
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
                message: 'Status transitions haven’t been fetched properly',
            });
        },
        onRemoveAllFilters() {
            this.$router.replace({
                query: {
                    ...this.$route.query,
                    filter: '',
                    page: DEFAULT_PAGE,
                },
            });

            this.isPrefetchingData = true;
        },
        onFilterChange(filters) {
            this.$router.replace({
                query: {
                    ...this.$route.query,
                    page: DEFAULT_PAGE,
                    filter: getParsedFilters(filters),
                },
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
