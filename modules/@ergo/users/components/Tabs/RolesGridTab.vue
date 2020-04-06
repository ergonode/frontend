/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate>
        <template #content>
            <Grid
                :is-editable="$hasAccess(['USER_ROLE_UPDATE'])"
                :columns="columns"
                :data-count="filtered"
                :data="data"
                :is-basic-filter="true"
                :is-action-column="true"
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
    name: 'RolesGridTab',
    components: {
        ResponsiveCenteredViewTemplate,
        Grid: () => import('@Core/components/Grid/Grid'),
    },
    mixins: [fetchGridDataMixin({ path: 'roles' })],
    methods: {
        onEditRow(args) {
            const lastIndex = args.length - 1;

            this.$router.push({ name: 'user-role-id-general', params: { id: args[lastIndex] } });
        },
    },
};
</script>
