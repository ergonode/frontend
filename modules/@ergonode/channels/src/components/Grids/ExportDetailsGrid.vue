/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Grid
        :columns="columns"
        :data-count="filtered"
        :rows="rows"
        :pagination="pagination"
        :filters="filterValues"
        :extended-components="extendedGridComponents"
        :is-prefetching-data="isPrefetchingData"
        :is-header-visible="true"
        :is-basic-filter="true"
        @pagination="onPaginationChange"
        @sort-column="onColumnSortChange"
        @filter="onFilterChange"
        @remove-all-filters="onRemoveAllFilters">
        <template #actionsHeader>
            <div class="export-details-tiles">
                <Tile
                    v-for="(detail, index) in details"
                    :key="index"
                    :label="detail.label"
                    :value="detail.value" />
            </div>
        </template>
        <template #appendFooter>
            <DownloadExportFileButton
                v-if="downloadLink"
                :link="downloadLink"
                :filename="exportFilename" />
        </template>
    </Grid>
</template>

<script>
import DownloadExportFileButton from '@Channels/components/Buttons/DownloadExportFileButton';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    DEFAULT_GRID_FETCH_PARAMS,
    DEFAULT_GRID_PAGINATION,
} from '@Core/defaults/grid';
import extendedGridComponentsMixin from '@Core/mixins/grid/extendedGridComponentsMixin';
import {
    getParsedFilters,
} from '@Core/models/mappers/gridDataMapper';
import {
    getGridData,
} from '@Core/services/grid/getGridData.service';
import Grid from '@UI/components/Grid/Grid';
import Tile from '@UI/components/Tile/Tile';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'ExportDetailsGrid',
    components: {
        Tile,
        Grid,
        DownloadExportFileButton,
    },
    mixins: [
        extendedGridComponentsMixin,
    ],
    props: {
        channelId: {
            type: String,
            required: true,
        },
        exportId: {
            type: String,
            required: true,
        },
    },
    async fetch() {
        await Promise.all([
            this.getExportDetails({
                channelId: this.channelId,
                exportId: this.exportId,
                onSuccess: this.onGetExportDetailsSuccess,
            }),
            this.onFetchData(),
        ]);
    },
    data() {
        return {
            columns: [],
            rows: [],
            filtered: 0,
            filterValues: {},
            isPrefetchingData: true,
            details: [],
            downloadLink: '',
            localParams: DEFAULT_GRID_FETCH_PARAMS(),
            pagination: DEFAULT_GRID_PAGINATION(),
        };
    },
    computed: {
        exportFilename() {
            if (this.details.length < 1) {
                return 'not specified';
            }

            return this.details[1].value;
        },
    },
    methods: {
        ...mapActions('channel', [
            'getExportDetails',
        ]),
        onPaginationChange(pagination) {
            this.pagination = pagination;
            this.localParams.limit = pagination.itemsPerPage;
            this.localParams.offset = (pagination.page - 1) * pagination.itemsPerPage;

            this.onFetchData();
        },
        onGetExportDetailsSuccess({
            details,
            links,
        }) {
            this.details = details;

            if (links && links.attachment) {
                this.downloadLink = links.attachment.href;
            }

            this.isPrefetchingData = false;
        },
        onRemoveAllFilters() {
            this.filterValues = {};
            this.pagination.page = 1;
            this.localParams.filter = '';
            this.localParams.offset = 0;

            this.onFetchData();
        },
        onFilterChange(filters) {
            this.filterValues = filters;
            this.pagination.page = 1;
            this.localParams.filter = getParsedFilters(filters);
            this.localParams.offset = (this.pagination.page - 1) * this.pagination.itemsPerPage;

            this.onFetchData();
        },
        onColumnSortChange(sortOrder) {
            this.localParams.sortOrder = sortOrder;

            this.onFetchData();
        },
        async onFetchData() {
            await getGridData({
                $route: this.$route,
                $cookies: this.$cookies,
                $axios: this.$axios,
                path: `channels/${this.channelId}/exports/${this.exportId}/errors`,
                params: this.localParams,
                onSuccess: this.onFetchGridDataSuccess,
                onError: this.onFetchGridDataError,
            });
        },
        onFetchGridDataError() {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: 'Export details haven’t been fetched properly',
            });

            this.isPrefetchingData = false;
        },
        onFetchGridDataSuccess({
            columns,
            rows,
            filtered,
        }) {
            this.columns = columns;
            this.rows = rows;
            this.filtered = filtered;
            this.isPrefetchingData = false;
        },
    },
};
</script>

<style lang="scss" scoped>
    .export-details-tiles {
        display: flex;
        flex-wrap: wrap;

        & > * {
            margin-right: 12px;
        }
    }
</style>
