/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalGrid
        title="Export details"
        @close="onClose">
        <template #body>
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
                @column-sort="onColumnSortChange"
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
                    <Button
                        v-if="downloadLink"
                        title="DOWNLOAD FILE"
                        :size="smallSize"
                        :disabled="!isAllowedToUpdate"
                        @click.native="onDownloadExportFile" />
                </template>
            </Grid>
        </template>
    </ModalGrid>
</template>

<script>
import PRIVILEGES from '@Channels/config/privileges';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    DEFAULT_GRID_FETCH_PARAMS,
    DEFAULT_GRID_PAGINATION,
} from '@Core/defaults/grid';
import {
    SIZE,
} from '@Core/defaults/theme';
import extendedGridComponentsMixin from '@Core/mixins/grid/extendedGridComponentsMixin';
import {
    getGridData,
} from '@Core/services/grid/getGridData.service';
import Button from '@UI/components/Button/Button';
import Grid from '@UI/components/Grid/Grid';
import ModalGrid from '@UI/components/Modal/ModalGrid';
import Tile from '@UI/components/Tile/Tile';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ExportDetailsModalGrid',
    components: {
        ModalGrid,
        Tile,
        Button,
        Grid,
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
        ...mapState('channel', [
            'type',
        ]),
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.CHANNEL.update,
            ]);
        },
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.CHANNEL.namespace);
        },
        smallSize() {
            return SIZE.SMALL;
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
            this.localParams.filter = {};
            this.localParams.offset = 0;

            this.onFetchData();
        },
        onFilterChange(filters) {
            this.filterValues = filters;
            this.pagination.page = 1;
            this.localParams.filter = filters;
            this.localParams.offset = (this.pagination.page - 1) * this.pagination.itemsPerPage;

            this.onFetchData();
        },
        onColumnSortChange(sortedColumn) {
            this.localParams.sortedColumn = sortedColumn;

            this.onFetchData();
        },
        async onFetchData() {
            await getGridData({
                $route: this.$route,
                $cookies: this.$cookies,
                $axios: this.$axios,
                path: `channels/${this.channelId}/exports/${this.exportId}/errors`,
                params: {
                    ...this.localParams,
                    extended: true,
                },
                onSuccess: this.onFetchGridDataSuccess,
                onError: this.onFetchGridDataError,
            });
        },
        onFetchGridDataError() {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: 'Grid data haven’t been fetched properly',
            });
        },
        onFetchGridDataSuccess({
            columns,
            rows,
            filtered,
        }) {
            this.columns = columns;
            this.rows = rows;
            this.filtered = filtered;
        },
        async onDownloadExportFile() {
            const response = await this.$axios.$get(this.downloadLink, {
                responseType: 'arraybuffer',
            });

            const downloadUrl = window.URL.createObjectURL(new Blob([
                response,
            ]));
            const link = document.createElement('a');

            link.href = downloadUrl;
            link.setAttribute('download', `export_${this.type}_${this.details[1].value}.zip`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        },
        onClose() {
            this.$emit('close');
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
