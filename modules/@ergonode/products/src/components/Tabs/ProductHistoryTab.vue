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
                :pagination="pagination"
                :extended-components="extendedGridComponents"
                :is-prefetching-data="isPrefetchingData"
                :is-basic-filter="true"
                :is-border="true"
                @pagination="onPaginationChange"
                @column-sort="onColumnSortChange"
                @remove-all-filters="onRemoveAllFilters"
                @filter="onFilterChange" />
        </template>
    </CenterViewTemplate>
</template>

<script>
import extendedGridComponentsMixin from '@Core/mixins/grid/extendedGridComponentsMixin';
import fetchGridDataMixin from '@Core/mixins/grid/fetchGridDataMixin';
import CenterViewTemplate from '@UI/components/Layout/Templates/CenterViewTemplate';

export default {
    name: 'ProductHistoryTab',
    components: {
        CenterViewTemplate,
    },
    mixins: [
        fetchGridDataMixin({
            path: 'products/_id/history',
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
        };
    },
};
</script>
