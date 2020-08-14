/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate>
        <template #content>
            <Grid
                :is-editable="isAllowedToUpdate"
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
import PRIVILEGES from '@Users/config/privileges';

export default {
    name: 'UsersGridTab',
    components: {
        ResponsiveCenteredViewTemplate,
    },
    mixins: [
        fetchGridDataMixin({
            path: 'accounts',
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
                title: 'No users',
                subtitle: 'There are no users in the system, you can create the first one.',
                bgUrl: require('@Core/assets/images/placeholders/comments.svg'),
                color: WHITESMOKE,
            };
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.USER.update,
            ]);
        },
    },
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
