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
                :cell-values="cellValues"
                :row-ids="rowIds"
                :is-basic-filters="true"
                @fetchData="getGridData" />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import gridDataMixin from '@Core/mixins/grid/gridDataMixin';

export default {
    name: 'ProductHistoryGridTab',
    mixins: [gridDataMixin({ path: 'products/_id/history' })],
    components: {
        ResponsiveCenteredViewTemplate,
        Grid: () => import('@Core/components/Grid/Grid'),
    },
};
</script>
