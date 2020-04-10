/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridColumn
        v-bind="$attrs"
        v-on="$listeners">
        <template
            #filter="{
                columnIndex,
                isLocked,
                rowIndex,
                filter,
            }">
            <GridDateFilterCell
                :is-locked="isLocked"
                :filter="filter"
                :column-index="columnIndex"
                :row-index="rowIndex"
                @filter="$listeners.filter" />
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
import { DEFAULT_FORMAT } from '@Core/models/calendar/calendar';
import GridDateDataCell from '@Core/components/Grid/Layout/Table/Cells/Data/GridDateDataCell';
import GridColumn from '@Core/components/Grid/Layout/Table/Columns/GridColumn';

export default {
    name: 'GridDateColumn',
    components: {
        GridColumn,
        GridDateDataCell,
        GridDateFilterCell: () => import('@Core/components/Grid/Layout/Table/Cells/Filter/GridDateFilterCell'),
    },
    inheritAttrs: false,
    computed: {
        dateFormat() {
            if (!this.$attrs.column.parameters) {
                return DEFAULT_FORMAT;
            }

            return this.$attrs.column.parameters.format;
        },
    },
};
</script>
