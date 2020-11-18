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
                :placeholder="noDataPlaceholder"
                :extended-columns="extendedColumns"
                :extended-data-cells="extendedDataCells"
                :extended-data-filter-cells="extendedDataFilterCells"
                :extended-data-edit-cells="extendedDataEditCells"
                :extended-edit-filter-cells="extendedDataEditFilterCells"
                :is-editable="isAllowedToUpdate"
                :is-prefetching-data="isPrefetchingData"
                :is-basic-filter="true"
                :is-border="true"
                @edit-row="onEditRow"
                @preview-row="onEditRow"
                @delete-row="onRemoveRow"
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
import PRIVILEGES from '@Segments/config/privileges';
import {
    WHITESMOKE,
} from '@UI/assets/scss/_js-variables/colors.scss';
import CenterViewTemplate from '@UI/components/Layout/Templates/CenterViewTemplate';

export default {
    name: 'SegmentsGridTab',
    components: {
        CenterViewTemplate,
    },
    mixins: [
        fetchGridDataMixin({
            path: 'segments',
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
    computed: {
        noDataPlaceholder() {
            return {
                title: 'No segments',
                subtitle: 'There are no segments in the system, you can create the first one.',
                bgUrl: require('@UI/assets/images/placeholders/comments.svg'),
                color: WHITESMOKE,
            };
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.SEGMENT.update,
            ]);
        },
    },
    methods: {
        onEditRow(args) {
            const lastIndex = args.length - 1;

            this.$router.push({
                name: 'segment-id-general',
                params: {
                    id: args[lastIndex],
                },
            });
        },
    },
};
</script>
