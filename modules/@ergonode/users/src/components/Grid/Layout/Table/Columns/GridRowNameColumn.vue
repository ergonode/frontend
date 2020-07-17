/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridColumn
        v-bind="$attrs"
        v-on="$listeners" />
</template>

<script>
import GridTitleHeaderCell from '@Core/components/Grid/Layout/Table/Cells/Header/GridTitleHeaderCell';
import GridColumn from '@Core/components/Grid/Layout/Table/Columns/GridColumn';

export default {
    name: 'GridRowNameColumn',
    components: {
        GridColumn,
        GridTitleHeaderCell,
    },
    inheritAttrs: false,
};
</script>
