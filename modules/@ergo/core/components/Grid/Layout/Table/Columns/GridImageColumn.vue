/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridColumn
        v-bind="$attrs"
        v-on="$listeners">
        <template
            #cell="{
                data,
                columnIndex,
                rowIndex,
                rowId,
                isLocked,
                isCopyable,
            }">
            <GridImageDataCell
                :key="rowId"
                :data="data"
                :column-index="columnIndex"
                :row-index="rowIndex"
                :is-locked="isLocked"
                :is-copyable="isCopyable" />
        </template>
    </GridColumn>
</template>

<script>
import GridImageDataCell from '@Core/components/Grid/Layout/Table/Cells/Data/GridImageDataCell';
import GridColumn from '@Core/components/Grid/Layout/Table/Columns/GridColumn';

export default {
    name: 'GridImageColumn',
    components: {
        GridColumn,
        GridImageDataCell,
    },
    inheritAttrs: false,
};
</script>
