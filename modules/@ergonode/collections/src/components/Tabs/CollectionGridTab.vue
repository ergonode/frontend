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
                :data="data"
                :is-prefetching-data="isPrefetchingData"
                :is-basic-filter="true"
                @editRow="onEditRow"
                @removeRow="onRemoveRow"
                @fetchData="getGridData" />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import PRIVILEGES from '@Collections/config/privileges';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import fetchGridDataMixin from '@Core/mixins/grid/fetchGridDataMixin';

export default {
    name: 'CollectionGridTab',
    components: {
        ResponsiveCenteredViewTemplate,
    },
    mixins: [
        fetchGridDataMixin({
            path: 'collections',
        }),
    ],
    computed: {
        isUserAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT_COLLECTION.update,
            ]);
        },
    },
    methods: {
        onEditRow(args) {
            const lastIndex = args.length - 1;

            this.$router.push({
                name: 'collection-id-general',
                params: {
                    id: args[lastIndex],
                },
            });
        },
    },
};
</script>
