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
            <GridRowEditCell
                :key="index"
                :link="data[index]"
                :column="columnIndex"
                :row="rowIndex"
                :is-selected="isSelectedAllRows
                    || selectedRows[rowIndex]"
                @edit="onEdit" />
        </template>
    </GridActionColumn>
</template>


<script>
import GridActionColumn from '@Core/components/Grid/Layout/Table/Columns/Action/GridActionColumn';
import GridRowEditCell from '@Core/components/Grid/Layout/Table/Cells/Edit/GridRowEditCell';

export default {
    name: 'GridEditActionColumn',
    components: {
        GridActionColumn,
        GridRowEditCell,
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
        onEdit(index) {
            this.$emit('action', { action: 'editRow', value: index });
        },
    },
};
</script>
