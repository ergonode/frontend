/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate>
        <template #content>
            <Grid
                :is-editable="$hasAccess(['MULTIMEDIA_UPDATE'])"
                :columns="columns"
                :data-count="filtered"
                :data="data"
                :collection-cell-binding="collectionCellBinding"
                :is-prefetching-data="isPrefetchingData"
                :is-basic-filter="true"
                :is-header-visible="true"
                :is-centered-view="true"
                :is-collection-layout="true"
                @editRow="onEditRow"
                @removeRow="onRemoveRow"
                @fetchData="getGridData" />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import fetchGridDataMixin from '@Core/mixins/grid/fetchGridDataMixin';

export default {
    name: 'MediaGridTab',
    components: {
        ResponsiveCenteredViewTemplate,
    },
    mixins: [
        fetchGridDataMixin({
            path: 'multimedia',
        }),
    ],
    computed: {
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
                name: 'multimedia-id-general',
                params: {
                    id: args[lastIndex],
                },
            });
        },
    },
};
</script>
