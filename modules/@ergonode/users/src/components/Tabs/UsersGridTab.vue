/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate>
        <template #content>
            <Grid
                :is-editable="$hasAccess(['USER_UPDATE'])"
                :columns="columns"
                :data-count="filtered"
                :rows="rows"
                :is-prefetching-data="isPrefetchingData"
                :is-basic-filter="true"
                :is-border="true"
                @editRow="onEditRow"
                @deleteRow="onRemoveRow"
                @fetchData="getGridData" />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import gridFetchDataMixin from '@Core/mixins/grid/gridFetchDataMixin';

export default {
    name: 'UsersGridTab',
    components: {
        ResponsiveCenteredViewTemplate,
    },
    mixins: [
        gridFetchDataMixin({
            path: 'accounts',
        }),
    ],
    methods: {
        onEditRow(args) {
            const lastIndex = args.length - 1;

            this.$router.push({
                name: 'user-id-general',
                params: {
                    id: args[lastIndex],
                },
            });
        },
    },
};
</script>
