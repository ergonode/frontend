/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate>
        <template #content>
            <Grid
                :is-editable="isAllowedToDelete"
                :columns="columns"
                :data-count="filtered"
                :rows="rows"
                :placeholder="noRecordsPlaceholder"
                :is-prefetching-data="isPrefetchingData"
                :is-basic-filter="true"
                :is-border="true"
                @editRow="onEditRow"
                @deleteRow="onRemoveRow"
                @fetchData="onFetchData" />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import {
    WHITESMOKE,
} from '@Core/assets/scss/_js-variables/colors.scss';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import {
    DATA_LIMIT,
} from '@Core/defaults/grid';
import fetchGridDataMixin from '@Core/mixins/grid/fetchGridDataMixin';
import PRIVILEGES from '@Trees/config/privileges';

export default {
    name: 'CategoryTreesGridTab',
    components: {
        ResponsiveCenteredViewTemplate,
    },
    mixins: [
        fetchGridDataMixin({
            path: 'trees',
        }),
    ],
    fetch() {
        return this.onFetchData({
            offset: 0,
            limit: DATA_LIMIT,
            filters: '',
            sortedColumn: {},
        }).then(() => {
            this.isPrefetchingData = false;
        });
    },
    data() {
        return {
            isPrefetchingData: true,
        };
    },
    computed: {
        noRecordsPlaceholder() {
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
