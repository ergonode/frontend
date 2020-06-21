/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate>
        <template #content>
            <Grid
                :is-editable="$hasAccess(['SEGMENT_UPDATE'])"
                :columns="columns"
                :data-count="filtered"
                :data="data"
                :is-basic-filter="true"
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
    name: 'SegmentsGridTab',
    components: {
        ResponsiveCenteredViewTemplate,
    },
    mixins: [
        fetchGridDataMixin({
            path: 'segments',
        }),
    ],
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
