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
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import {
    DATA_LIMIT,
} from '@Core/defaults/grid';
import fetchGridDataMixin from '@Core/mixins/grid/fetchGridDataMixin';

export default {
    name: 'ChannelHistoryTab',
    components: {
        ResponsiveCenteredViewTemplate,
    },
    mixins: [
        fetchGridDataMixin({
            path: 'channels/_id/exports',
        }),
    ],
    fetch() {
        return this.onFetchData({
            offset: 0,
            limit: DATA_LIMIT,
            filters: '',
            sortedColumn: {},
        }).then(() => {
            this.isPrefetchingData = false;
        });
    },
    data() {
        return {
            isPrefetchingData: true,
        };
    },
    methods: {
        onEditRow(args) {
            const exportIndex = args.length - 1;
            const channelIndex = args.length - 3;

            this.$router.push({
                name: 'export-id-details',
                params: {
                    channel_id: args[channelIndex],
                    export_id: args[exportIndex],
                },
            });
        },
    },
};
</script>
