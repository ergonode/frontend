/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridDraggableColumn
        :scope="scope"
        :index="columnIndex"
        :column="column"
        :key="column.id"
        @remove="onRemoveColumn"
        @swap="onSwapColumns">
        <GridColumn
            :index="columnIndex"
            :resizeable="true"
            @resize="onResizeColumn">
            <template #header>
                <GridHeaderCell
                    :row-index="rowsOffset"
                    :column-index="columnIndex"
                    :column-id="column.id"
                    :label="column.label"
                    :deletable="column.deletable"
                    :sort-order="sortOrder"
                    @sort="onSortColumn"
                    @remove="onRemoveColumn" />
            </template>
            <template v-if="isBasicFilter">
                <GridFilterDataCell
                    v-if="column.filter"
                    :row-index="rowsOffset + basicFiltersOffset"
                    :value="filters[column.id]"
                    :component="dataFilterCellComponents[column.filter.type]"
                    :column-index="columnIndex"
                    :language-code="column.language"
                    :column-id="column.id"
                    :filter="column.filter"
                    @edit-filter-cell="onEditFilterCell"
                    @filter-value="onFilterValueChange"
                    @filter-clear="onFilterValueClear" />
                <GridTableCell
                    v-else
                    :locked="true"
                    :row="rowsOffset + basicFiltersOffset"
                    :column="columnIndex" />
            </template>
            <template v-if="isColumnInRow">
                <GridDataCell
                    v-for="(row, rowIndex) in rows"
                    :key="`${rowIds[rowIndex]}|${column.id}`"
                    :component="dataCellComponents[column.type]"
                    :data="getRowData(row, column)"
                    :drafts="drafts"
                    :column="column"
                    :error-messages="errors[`${rowIds[rowIndex]}/${column.id}`]"
                    :row-id="rowIds[rowIndex]"
                    :column-index="columnIndex"
                    :row-index="rowsOffset + rowIndex + basicFiltersOffset + 1"
                    :is-disabled="disabledRows[rowIds[rowIndex]]"
                    :is-locked="!(column.editable && isEditable)"
                    :is-copyable="column.editable && isEditable && !disabledRows[rowIds[rowIndex]]"
                    :is-selected="getSelectedRowState(rowIndex)"
                    @cell-value="onCellValueChange"
                    @edit-cell="onEditCell" />
            </template>
        </GridColumn>
    </GridDraggableColumn>
</template>

<script>
import GridFilterDataCell from '@UI/components/Grid/Layout/Table/Cells/Data/Filter/GridFilterDataCell';
import GridDataCell from '@UI/components/Grid/Layout/Table/Cells/Data/GridDataCell';
import GridColumn from '@UI/components/Grid/Layout/Table/Columns/GridColumn';
import GridDraggableColumn from '@UI/components/Grid/Layout/Table/Columns/GridDraggableColumn';

export default {
    name: 'GridDraggableDataColumn',
    components: {
        GridDataCell,
        GridFilterDataCell,
        GridColumn,
        GridDraggableColumn,
    },
    props: {
        /**
         * Context scope
         */
        scope: {
            type: String,
            default: '',
        },
        /**
         * Column index of given component at the loop
         */
        columnIndex: {
            type: Number,
            required: true,
        },
        /**
         * Data of the column
         */
        column: {
            type: Object,
            required: true,
        },
        /**
         * List of rows presented at Grid
         */
        rows: {
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
         * Data about order of sorted column
         */
        sortOrder: {
            type: Object,
            required: true,
        },
        /**
         * The filter values
         */
        filters: {
            type: Object,
            default: () => ({}),
        },
        /**
         * The model of each filter cell component
         */
        dataFilterCellComponents: {
            type: Object,
            default: () => ({}),
        },
        /**
         * The model of each data cell component
         */
        dataCellComponents: {
            type: Object,
            default: () => ({}),
        },
        /**
         * List of row ids
         */
        rowIds: {
            type: Array,
            default: () => [],
        },
        /**
         * The validation errors
         */
        errors: {
            type: Object,
            default: () => ({}),
        },
        /**
         * The drafts are unsaved changes, cached changed data at given time
         */
        drafts: {
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
         * Determines if filters are visible
         */
        isBasicFilter: {
            type: Boolean,
            default: false,
        },
        /**
         * Determinate if the component is being able to edit
         */
        isEditable: {
            type: Boolean,
            default: true,
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
        isColumnInRow() {
            return this.column && this.column.id
                ? this.rows.every(row => this.column.id in row)
                : false;
        },
    },
    methods: {
        onRemoveColumn(payload) {
            this.$emit('remove', payload);
        },
        onSwapColumns(payload) {
            this.$emit('swap', payload);
        },
        onResizeColumn(payload) {
            this.$emit('resize', payload);
        },
        onSortColumn(payload) {
            this.$emit('sort', payload);
        },
        onEditFilterCell(payload) {
            this.$emit('edit-filter-cell', payload);
        },
        onFilterValueChange(payload) {
            this.$emit('filter-value', payload);
        },
        onFilterValueClear(payload) {
            this.$emit('filter-clear', payload);
        },
        onCellValueChange(payload) {
            this.$emit('cell-value', payload);
        },
        onEditCell(payload) {
            this.$emit('edit-cell', payload);
        },
        getSelectedRowState(index) {
            return this.selectedRows[this.rowIds[index]]
                || (this.isSelectedAll && !this.excludedFromSelectionRows[this.rowIds[index]]);
        },
        getRowData(row, column) {
            const rowData = 'id' in column ? row[column.id] : null;

            return rowData || {};
        },
    },
};
</script>
