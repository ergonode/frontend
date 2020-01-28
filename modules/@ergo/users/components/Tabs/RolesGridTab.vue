/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate>
        <template #content>
            <Grid
                :editing-privilege-allowed="$hasAccess(['USER_ROLE_UPDATE'])"
                :columns="columns"
                :basic-filters="basicFilters"
                :sorted-column="sortedColumn"
                :max-rows="maxRowsPerPage"
                :max-page="numberOfPages"
                :current-page="currentPage"
                :cell-values="cellValues"
                :row-ids="rowIds"
                :row-links="rowLinks"
                :is-basic-filters="true"
                :is-edit-column="true"
                @editRow="onEditRow"
                @sortColumn="setSortedColumn"
                @filterColumn="setBasicFilter" />
        </template>
        <template #footer>
            <GridPageSelector
                :value="maxRowsPerPage"
                :max-rows="filtered"
                @input="setMaxRowsPerPage" />
            <GridPagination
                :value="currentPage"
                :max-page="numberOfPages"
                @input="setCurrentPage" />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import gridDataMixin from '@Core/mixins/grid/gridDataMixin';

export default {
    name: 'RolesGridTab',
    mixins: [gridDataMixin({ path: 'roles' })],
    components: {
        ResponsiveCenteredViewTemplate,
        Grid: () => import('@Core/components/Grid/Grid'),
        GridPageSelector: () => import('@Core/components/Grid/GridPageSelector'),
        GridPagination: () => import('@Core/components/Grid/GridPagination'),
    },
    methods: {
        onEditRow({ links: { value: { edit } } }) {
            const args = edit.href.split('/');
            const lastIndex = args.length - 1;

            this.$router.push({ name: 'user-role-edit-id-general', params: { id: args[lastIndex] } });
        },
    },
};
</script>
