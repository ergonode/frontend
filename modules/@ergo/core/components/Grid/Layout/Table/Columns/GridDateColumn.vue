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
                dataIndex,
                columnIndex,
                rowIndex,
                rowId,
                columnId,
                isLocked,
                isCopyable,
            }">
            <GridDateDataCell
                :key="`${rowId}|${columnId}`"
                :data="data"
                :data-index="dataIndex"
                :row-id="rowId"
                :column-id="columnId"
                :column-index="columnIndex"
                :row-index="rowIndex"
                :is-locked="isLocked"
                :is-copyable="isCopyable"
                @input="$listeners.editCell"
                @copy="$listeners.copyCells" />
        </template>
    </GridColumn>
</template>

<script>
import GridDateDataCell from '@Core/components/Grid/Layout/Table/Cells/Data/GridDateDataCell';
import GridColumn from '@Core/components/Grid/Layout/Table/Columns/GridColumn';

export default {
    name: 'GridDateColumn',
    components: {
        GridColumn,
        GridDateDataCell,
    },
    inheritAttrs: false,
};
</script>
