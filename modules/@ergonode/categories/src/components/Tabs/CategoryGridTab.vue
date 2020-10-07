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
                :is-prefetching-data="isPrefetchingData"
                :is-basic-filter="true"
                :is-border="true"
                @edit-row="onEditRow"
                @preview-row="onEditRow"
                @delete-row="onRemoveRow"
                @fetch-data="onFetchData" />
        </template>
    </CenterViewTemplate>
</template>

<script>
import PRIVILEGES from '@Categories/config/privileges';
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';
import fetchGridDataMixin from '@Core/mixins/grid/fetchGridDataMixin';

export default {
    name: 'CategoryGridTab',
    components: {
        CenterViewTemplate,
    },
    mixins: [
        fetchGridDataMixin({
            path: 'categories',
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
                PRIVILEGES.CATEGORY.update,
            ]);
        },
    },
    methods: {
        onEditRow(args) {
            const lastIndex = args.length - 1;

            this.$router.push({
                name: 'category-id-general',
                params: {
                    id: args[lastIndex],
                },
            });
        },
    },
};
</script>
