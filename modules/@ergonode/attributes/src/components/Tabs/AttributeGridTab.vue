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
                :placeholder="noRecordsPlaceholder"
                :is-prefetching-data="isPrefetchingData"
                :is-basic-filter="true"
                :is-border="true"
                @editRow="onEditRow"
                @previewRow="onEditRow"
                @deleteRow="onRemoveRow"
                @fetchData="onFetchData" />
        </template>
    </CenterViewTemplate>
</template>

<script>
import PRIVILEGES from '@Attributes/config/privileges';
import {
    WHITESMOKE,
} from '@Core/assets/scss/_js-variables/colors.scss';
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';
import fetchGridDataMixin from '@Core/mixins/grid/fetchGridDataMixin';

export default {
    name: 'AttributeGridTab',
    components: {
        CenterViewTemplate,
    },
    mixins: [
        fetchGridDataMixin({
            path: 'attributes',
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
        noRecordsPlaceholder() {
            return {
                title: 'No attributes',
                subtitle: 'There are no attributes in the system, you can create the first one.',
                bgUrl: require('@Core/assets/images/placeholders/comments.svg'),
                color: WHITESMOKE,
            };
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.ATTRIBUTE.update,
            ]);
        },
    },
    methods: {
        onEditRow(args) {
            const lastIndex = args.length - 1;

            this.$router.push({
                name: 'attribute-id-general',
                params: {
                    id: args[lastIndex],
                },
            });
        },
    },
};
</script>
