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
                :data="data"
                :is-prefetching-data="isPrefetchingData"
                @fetchData="getGridData" />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import fetchGridDataMixin from '@Core/mixins/grid/fetchGridDataMixin';

export default {
    name: 'UserActivityLogsGridTab',
    components: {
        ResponsiveCenteredViewTemplate,
    },
    mixins: [
        fetchGridDataMixin({
            path: 'profile/log',
        }),
    ],
};
</script>
