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
            <GridTextHintDataCell
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
import GridTextHintDataCell from '@Users/components/Grid/Layout/Table/Cells/Data/GridTextHintDataCell';
import GridColumn from '@Core/components/Grid/Layout/Table/Columns/GridColumn';
import GridHeaderCell from '@Core/components/Grid/Layout/Table/Cells/Header/GridHeaderCell';

export default {
    name: 'GridPrivilegeNameColumn',
    components: {
        GridColumn,
        GridTextHintDataCell,
        GridHeaderCell,
    },
    inheritAttrs: false,
};
</script>
