/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate>
        <template #content>
            <Grid
                :editing-privilege-allowed="$hasAccess(['ATTRIBUTE_GROUP_UPDATE'])"
                :columns="columns"
                :data-count="filtered"
                :cell-values="cellValues"
                :row-ids="rowIds"
                :row-links="rowLinks"
                :is-edit-column="true"
                :is-basic-filters="true"
                @editRow="onEditRow"
                @fetchData="getGridData" />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import gridDataMixin from '@Core/mixins/grid/gridDataMixin';

export default {
    name: 'AttributeGroupGridTab',
    mixins: [gridDataMixin({ path: 'attributes/groups' })],
    components: {
        ResponsiveCenteredViewTemplate,
        Grid: () => import('@Core/components/Grid/Grid'),
    },
    methods: {
        onEditRow({ links: { value: { edit } } }) {
            const args = edit.href.split('/');
            const lastIndex = args.length - 1;

            this.$router.push({ name: 'attribute-group-edit-id-general', params: { id: args[lastIndex] } });
        },
    },
};
</script>
