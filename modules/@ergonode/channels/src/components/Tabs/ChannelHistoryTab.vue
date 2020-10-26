/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate>
        <template #content>
            <Grid
                :columns="columns"
                :data-count="filtered"
                :rows="rows"
                :filters="filterValues"
                :extended-columns="extendedColumns"
                :extended-data-cells="extendedDataCells"
                :extended-data-filter-cells="extendedDataFilterCells"
                :extended-data-edit-cells="extendedDataEditCells"
                :extended-edit-filter-cells="extendedDataEditFilterCells"
                :is-prefetching-data="isPrefetchingData"
                :is-basic-filter="true"
                :is-border="true"
                @preview-row="onPreviewRow"
                @fetch-data="onFetchData"
                @filter="onFilterChange"
                @remove-all-filters="onRemoveAllFilters" />
            <ExportDetailsModalGrid
                v-if="isExportDetailsModalVisible"
                :export-id="selectedRow.exportId"
                :channel-id="selectedRow.channelId"
                @close="onCloseModalGrid" />
        </template>
    </CenterViewTemplate>
</template>

<script>
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';
import extendedGridComponentsMixin from '@Core/mixins/grid/extendedGridComponentsMixin';
import fetchGridDataMixin from '@Core/mixins/grid/fetchGridDataMixin';

export default {
    name: 'ChannelHistoryTab',
    components: {
        CenterViewTemplate,
        ExportDetailsModalGrid: () => import('@Channels/components/Modals/ExportDetailsModalGrid'),
    },
    mixins: [
        fetchGridDataMixin({
            path: 'channels/_id/exports',
        }),
        extendedGridComponentsMixin,
    ],
    async fetch() {
        await this.onFetchData();
        this.isPrefetchingData = false;
    },
    data() {
        return {
            isPrefetchingData: true,
            isExportDetailsModalVisible: false,
            selectedRow: {
                importId: '',
                sourceId: '',
            },
        };
    },
    methods: {
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
    },
};
</script>
