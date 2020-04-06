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
            <GridTextFilterCell
                :is-locked="isLocked"
                :filter="filter"
                :column-index="columnIndex"
                :row-index="rowIndex"
                @filter="onFilterChange" />
        </template>
        <template
            #cell="{
                data,
                columnIndex,
                rowIndex,
                rowId,
                isLocked,
                isCopyable,
            }">
            <GridTextAreaDataCell
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
import { FILTER_OPERATOR } from '@Core/defaults/operators';
import GridColumn from '@Core/components/Grid/Layout/Table/Columns/GridColumn';
import GridTextAreaDataCell from '@Core/components/Grid/Layout/Table/Cells/Data/GridTextAreaDataCell';

export default {
    name: 'GridTextAreaColumn',
    components: {
        GridColumn,
        GridTextAreaDataCell,
        GridTextFilterCell: () => import('@Core/components/Grid/Layout/Table/Cells/Filter/GridTextFilterCell'),
    },
    inheritAttrs: false,
    methods: {
        onFilterChange(value) {
            this.$emit('filter', {
                id: this.$attrs.column.id,
                value,
                operator: FILTER_OPERATOR.EQUAL,
            });
        },
    },
};
</script>
