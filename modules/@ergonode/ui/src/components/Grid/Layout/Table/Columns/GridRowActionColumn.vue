/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridActionColumn>
        <template #header>
            <GridTableCell
                :row="rowsOffset"
                :column="columnsOffset"
                :locked="true" />
        </template>
        <GridTableCell
            v-if="isBasicFilter"
            :row="rowsOffset + basicFiltersOffset"
            :column="columnsOffset"
            :locked="true" />
        <GridActionCell
            v-for="(row, rowIndex) in rows"
            :key="`${rowIds[rowIndex]}|${column.id}`"
            :component="actionCellComponents[column.id]"
            :column-index="columnsOffset"
            :column="column"
            :row-id="rowIds[rowIndex]"
            :action="row._links.value[column.id]"
            :row-index="rowsOffset + rowIndex + basicFiltersOffset + 1"
            :disabled="disabledRows[rowIds[rowIndex]]"
            :selected="getSelectedRowState(rowIndex)"
            @action="onRowAction" />
    </GridActionColumn>
</template>

<script>
import GridActionCell from '@UI/components/Grid/Layout/Table/Cells/Action/GridActionCell';
import GridActionColumn from '@UI/components/Grid/Layout/Table/Columns/GridActionColumn';

export default {
    name: 'GridRowActionColumn',
    components: {
        GridActionColumn,
        GridActionCell,
    },
    props: {
        /**
         * The list of action columns
         */
        columns: {
            type: Array,
            default: () => [],
        },
        /**
         * List of rows presented at Grid
         */
        rows: {
            type: Array,
            default: () => [],
        },
        /**
         * The model of each action cell component
         */
        actionCellComponents: {
            type: Object,
            default: () => ({}),
        },
        /**
         * The map of selected rows
         */
        selectedRows: {
            type: Object,
            default: () => ({}),
        },
        /**
         * The map of rows excluded from selection
         */
        excludedFromSelectionRows: {
            type: Object,
            default: () => ({}),
        },
        /**
         * Data of the column
         */
        column: {
            type: Object,
            required: true,
        },
        /**
         * List of row ids
         */
        rowIds: {
            type: Array,
            default: () => [],
        },
        /**
         * The number from which rows are enumerated
         */
        rowsOffset: {
            type: Number,
            default: 0,
        },
        /**
         * The disabled rows are defining which rows are not being able to interact with
         */
        disabledRows: {
            type: Object,
            default: () => ({}),
        },
        /**
         * The number from which columns are enumerated
         */
        columnsOffset: {
            type: Number,
            default: 0,
        },
        /**
         * Determines if filters are visible
         */
        isBasicFilter: {
            type: Boolean,
            default: false,
        },
        /**
         * Determines if every row should be selected
         */
        isSelectedAll: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        basicFiltersOffset() {
            return this.isBasicFilter ? 1 : 0;
        },
    },
    methods: {
        onRowAction(payload) {
            this.$emit('row-action', payload);
        },
        getSelectedRowState(index) {
            return this.selectedRows[this.rowIds[index]]
                || (this.isSelectedAll && !this.excludedFromSelectionRows[this.rowIds[index]]);
        },
    },
};
</script>
