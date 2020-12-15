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
        :is-prefetching-data="isPrefetchingData"
        :is-basic-filter="true"
        :is-border="true"
        @preview-row="onPreviewRow"
        @delete-row="onRemoveRow"
        @pagination="onPaginationChange"
        @sort-column="onColumnSortChange"
        @filter="onFilterChange"
        @remove-all-filters="onRemoveAllFilters">
        <ExportDetailsModalGrid
            v-if="isExportDetailsModalVisible"
            :export-id="selectedRow.exportId"
            :channel-id="selectedRow.channelId"
            @close="onCloseModalGrid" />
    </Grid>
</template>

<script>
import {
    EXPORT_CREATED_EVENT_NAME,
} from '@Channels/defaults';
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
import Grid from '@UI/components/Grid/Grid';

export default {
    name: 'ChannelHistoryGrid',
    components: {
        Grid,
        ExportDetailsModalGrid: () => import('@Channels/components/Modals/ExportDetailsModalGrid'),
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
            selectedRow: {
                importId: '',
                sourceId: '',
            },
            isPrefetchingData: true,
            isExportDetailsModalVisible: false,
        };
    },
    watch: {
        $route(from, to) {
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

            this.onFetchData();
        },
    },
    mounted() {
        document.documentElement.addEventListener(
            EXPORT_CREATED_EVENT_NAME,
            this.onExportCreated,
        );
    },
    beforeDestroy() {
        document.documentElement.removeEventListener(
            EXPORT_CREATED_EVENT_NAME,
            this.onExportCreated,
        );
    },
    methods: {
        onExportCreated() {
            this.onFetchData();
        },
        onRemoveRow() {
            this.onFetchData();
        },
        onPreviewRow(args) {
            const lastIndex = args.length - 1;
            const exportId = args[lastIndex];
            const channelId = args[lastIndex - 2];

            this.selectedRow = {
                exportId,
                channelId,
            };

            this.isExportDetailsModalVisible = true;
        },
        onCloseModalGrid() {
            this.isExportDetailsModalVisible = false;
        },
        async onFetchData() {
            await getGridData({
                $route: this.$route,
                $cookies: this.$cookies,
                $axios: this.$axios,
                path: `channels/${this.$route.params.id}/exports`,
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
                message: 'Channels haven’t been fetched properly',
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
