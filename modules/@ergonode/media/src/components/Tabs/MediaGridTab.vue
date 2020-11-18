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
                :collection-cell-binding="collectionCellBinding"
                :extended-columns="extendedColumns"
                :extended-data-cells="extendedDataCells"
                :extended-data-filter-cells="extendedDataFilterCells"
                :extended-data-edit-cells="extendedDataEditCells"
                :extended-edit-filter-cells="extendedDataEditFilterCells"
                :is-editable="isAllowedToUpdate"
                :is-prefetching-data="isPrefetchingData"
                :is-basic-filter="true"
                :is-header-visible="true"
                :is-border="true"
                :is-collection-layout="true"
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
import PRIVILEGES from '@Media/config/privileges';
import CenterViewTemplate from '@UI/components/Layout/Templates/CenterViewTemplate';

export default {
    name: 'MediaGridTab',
    components: {
        CenterViewTemplate,
    },
    mixins: [
        fetchGridDataMixin({
            path: 'multimedia',
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
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.MULTIMEDIA.update,
            ]);
        },
        collectionCellBinding() {
            return {
                imageColumn: 'image',
                descriptionColumn: 'name',
            };
        },
    },
    methods: {
        onEditRow(args) {
            const lastIndex = args.length - 1;

            this.$router.push({
                name: 'media-id-general',
                params: {
                    id: args[lastIndex],
                },
            });
        },
    },
};
</script>
