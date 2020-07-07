/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridColumn
        v-bind="$attrs"
        v-on="$listeners">
        <template #header="{ title }">
            <GridHeaderCell :title="title" />
        </template>
    </GridColumn>
</template>

<script>
import GridHeaderCell from '@Core/components/Grid/Layout/Table/Cells/Header/GridHeaderCell';
import GridColumn from '@Core/components/Grid/Layout/Table/Columns/GridColumn';

export default {
    name: 'GridRowNameColumn',
    components: {
        GridColumn,
        GridHeaderCell,
    },
    inheritAttrs: false,
};
</script>
