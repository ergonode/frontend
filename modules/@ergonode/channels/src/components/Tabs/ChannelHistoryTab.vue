/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate>
        <template #content>
            <Grid
                :columns="columns"
                :data-count="filtered"
                :rows="rows"
                :is-prefetching-data="isPrefetchingData"
                :is-basic-filter="true"
                :is-border="true"
                @editRow="onEditRow"
                @fetchData="onFetchData" />
            <ExportDetailsModalGrid
                v-if="isExportDetailsModalVisible"
                :export-id="selectedRow.exportId"
                :channel-id="selectedRow.channelId"
                @close="onCloseModalGrid" />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import fetchGridDataMixin from '@Core/mixins/grid/fetchGridDataMixin';

export default {
    name: 'ChannelHistoryTab',
    components: {
        ResponsiveCenteredViewTemplate,
        ExportDetailsModalGrid: () => import('@Channels/components/Modals/ExportDetailsModalGrid'),
    },
    mixins: [
        fetchGridDataMixin({
            path: 'channels/_id/exports',
        }),
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
        onEditRow(args) {
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
