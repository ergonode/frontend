/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate>
        <template #content>
            <Grid
                :is-editable="isUserAllowedToUpdate"
                :columns="columns"
                :data-count="filtered"
                :rows="rows"
                :is-prefetching-data="isPrefetchingData"
                :is-basic-filter="true"
                :is-border="true"
                @editRow="onEditRow"
                @deleteRow="onRemoveRow"
                @fetchData="onFetchData" />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import PRIVILEGES from '@Channels/config/privileges';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import gridFetchDataMixin from '@Core/mixins/grid/gridFetchDataMixin';

export default {
    name: 'ChannelGridTab',
    components: {
        ResponsiveCenteredViewTemplate,
    },
    mixins: [
        gridFetchDataMixin({
            path: 'channels',
        }),
    ],
    computed: {
        isUserAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.CHANNEL.update,
            ]);
        },
    },
    methods: {
        onEditRow(args) {
            const lastIndex = args.length - 1;

            this.$router.push({
                name: 'channel-id-general',
                params: {
                    id: args[lastIndex],
                },
            });
        },
    },
};
</script>
