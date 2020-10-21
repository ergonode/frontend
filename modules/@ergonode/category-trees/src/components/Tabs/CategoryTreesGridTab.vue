/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate>
        <template #content>
            <Grid
                :is-editable="isAllowedToDelete"
                :columns="columns"
                :data-count="filtered"
                :rows="rows"
                :filters="filterValues"
                :placeholder="noDataPlaceholder"
                :is-prefetching-data="isPrefetchingData"
                :is-basic-filter="true"
                :is-border="true"
                @edit-row="onEditRow"
                @preview-row="onEditRow"
                @delete-row="onRemoveRow"
                @fetch-data="onFetchData"
                @filter="onFilterChange"
                @remove-all-filters="onRemoveAllFilters" />
        </template>
    </CenterViewTemplate>
</template>

<script>
import {
    WHITESMOKE,
} from '@Core/assets/scss/_js-variables/colors.scss';
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';
import fetchGridDataMixin from '@Core/mixins/grid/fetchGridDataMixin';
import PRIVILEGES from '@Trees/config/privileges';

export default {
    name: 'CategoryTreesGridTab',
    components: {
        CenterViewTemplate,
    },
    mixins: [
        fetchGridDataMixin({
            path: 'trees',
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
        noDataPlaceholder() {
            return {
                title: 'No category trees',
                subtitle: 'There are no category trees in the system, you can create the first one.',
                bgUrl: require('@Core/assets/images/placeholders/comments.svg'),
                color: WHITESMOKE,
            };
        },
        isAllowedToDelete() {
            return this.$hasAccess([
                PRIVILEGES.CATEGORY_TREE.update,
            ]);
        },
    },
    methods: {
        onEditRow(args) {
            const lastIndex = args.length - 1;

            this.$router.push({
                name: 'category-tree-id-general',
                params: {
                    id: args[lastIndex],
                },
            });
        },
    },
};
</script>
