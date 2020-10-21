/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate>
        <template #content>
            <Grid
                :is-editable="isAllowedToUpdate"
                :columns="columns"
                :data-count="filtered"
                :rows="rows"
                :filters="filterValues"
                :collection-cell-binding="collectionCellBinding"
                :is-prefetching-data="isPrefetchingData"
                :is-basic-filter="true"
                :is-header-visible="true"
                :is-border="true"
                :is-collection-layout="true"
                @edit-row="onEditRow"
                @preview-row="onEditRow"
                @delete-row="onRemoveRow"
                @fetch-data="onFetchData"
                @remove-all-filter="onRemoveAllFilters"
                @filter="onFilterChange" />
        </template>
    </CenterViewTemplate>
</template>

<script>
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';
import fetchGridDataMixin from '@Core/mixins/grid/fetchGridDataMixin';
import PRIVILEGES from '@Media/config/privileges';

export default {
    name: 'MediaGridTab',
    components: {
        CenterViewTemplate,
    },
    mixins: [
        fetchGridDataMixin({
            path: 'multimedia',
        }),
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
