/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridActionColumn
        :column-index="columnIndex"
        :rows-offset="rowsOffset"
        :data-count="dataCount"
        :is-basic-filter="isBasicFilter">
        <template #cell="{ index, rowIndex }">
            <GridRowRemoveEditCell
                :key="index"
                :link="data[index]"
                :index="index"
                :column="columnIndex"
                :row="rowIndex"
                :is-selected="isSelectedAllRows
                    || selectedRows[rowIndex]"
                @remove="onRemove" />
        </template>
    </GridActionColumn>
</template>

<script>
import GridRowRemoveEditCell from '@Core/components/Grid/Layout/Table/Cells/Edit/GridRowRemoveEditCell';
import GridActionColumn from '@Core/components/Grid/Layout/Table/Columns/Action/GridActionColumn';

export default {
    name: 'GridDeleteActionColumn',
    components: {
        GridActionColumn,
        GridRowRemoveEditCell,
    },
    props: {
        columnIndex: {
            type: Number,
            required: true,
        },
        data: {
            type: Object,
            default: () => ({}),
        },
        rowsOffset: {
            type: Number,
            default: 0,
        },
        dataCount: {
            type: Number,
            default: 0,
        },
        isBasicFilter: {
            type: Boolean,
            default: false,
        },
        isSelectedAllRows: {
            type: Boolean,
            default: false,
        },
        selectedRows: {
            type: Object,
            default: () => ({}),
        },
    },
    methods: {
        onRemove(index) {
            this.$emit('action', { action: 'removeRow', value: index });
        },
    },
};
</script>
