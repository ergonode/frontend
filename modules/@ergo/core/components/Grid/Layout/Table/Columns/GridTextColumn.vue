/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridColumn
        v-bind="$attrs"
        v-on="$listeners">
        <template
            v-if="$attrs.isBasicFilter"
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
                draftValue,
                data,
                dataIndex,
                columnIndex,
                rowIndex,
                rowId,
                columnId,
                languageCode,
                isLocked,
                isCopyable,
                onValueChange,
                onCopyValues,
            }">
            <GridTextDataCell
                :key="`${rowId}|${columnId}`"
                :draft-value="draftValue"
                :data="data"
                :data-index="dataIndex"
                :row-id="rowId"
                :column-id="columnId"
                :column-index="columnIndex"
                :row-index="rowIndex"
                :language-code="languageCode"
                :is-locked="isLocked"
                :is-copyable="isCopyable"
                @input="onValueChange"
                @copy="onCopyValues" />
        </template>
    </GridColumn>
</template>

<script>
import { FILTER_OPERATOR } from '@Core/defaults/operators';
import GridTextDataCell from '@Core/components/Grid/Layout/Table/Cells/Data/GridTextDataCell';
import GridColumn from '@Core/components/Grid/Layout/Table/Columns/GridColumn';

export default {
    name: 'GridTextColumn',
    components: {
        GridColumn,
        GridTextDataCell,
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
