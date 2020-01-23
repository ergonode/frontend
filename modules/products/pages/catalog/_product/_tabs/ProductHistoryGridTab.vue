/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate>
        <template #content>
            <Grid
                title="Product history"
                :columns="columns"
                :basic-filters="basicFilters"
                :sorted-column="sortedColumn"
                :max-rows="filtered"
                :max-page="numberOfPages"
                :current-page="currentPage"
                :cell-values="cellValues"
                :row-ids="rowIds"
                :is-basic-filters="true"
                @sortColumn="setSortedColumn"
                @filterColumn="setBasicFilter" />
        </template>
        <template #footer>
            <GridPageSelector
                :value="maxRowsPerPage"
                :max-rows="filtered"
                @input="setMaxRowsPerPage" />
            <GridPagination
                :value="currentPage"
                :max-page="numberOfPages"
                @input="setCurrentPage" />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import ResponsiveCenteredViewTemplate from '~/core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import gridDataMixin from '~/mixins/grid/gridDataMixin';

export default {
    name: 'ProductHistoryGridTab',
    mixins: [gridDataMixin({ path: 'products/_id/history' })],
    components: {
        ResponsiveCenteredViewTemplate,
        Grid: () => import('~/core/components/Grid/Grid'),
        GridPageSelector: () => import('~/core/components/Grid/GridPageSelector'),
        GridPagination: () => import('~/core/components/Grid/GridPagination'),
    },
};
</script>
