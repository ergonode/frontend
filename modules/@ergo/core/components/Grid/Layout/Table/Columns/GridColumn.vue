/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridDraggableColumn
        :index="columnIndex"
        :column="column"
        :is-header-focused="isHeaderFocused"
        @swapColumns="onSwapColumns"
        @remove="onRemoveColumn"
        @updateWidth="onUpdateWidth">
        <GridTableCell
            :row="rowsOffset"
            :column="columnIndex"
            :locked="true">
            <slot
                name="header"
                :column-index="columnIndex"
                :title="column.label"
                :sorted-column="sortedColumn">
                <GridInteractiveHeaderCell
                    :column-index="columnIndex"
                    :column-id="column.id"
                    :label="column.label"
                    :deletable="column.deletable"
                    :sorted-column="sortedColumn"
                    @focus="onHeaderFocus"
                    @sort="onSortColumn"
                    @remove="onRemoveColumn" />
            </slot>
        </GridTableCell>
        <template v-if="isBasicFilter">
            <Component
                v-if="filterCellComponent"
                :is-locked="isFilterLocked"
                :filter="filter"
                :language-code="column.language"
                :column-index="columnIndex"
                :data="column.filter"
                :row-index="rowsOffset + basicFiltersOffset"
                :is="filterCellComponent"
                @filter="onFilterChange" />
            <GridTableCell
                v-else
                :locked="true"
                :row="rowsOffset + basicFiltersOffset"
                :column="columnIndex" />
        </template>
        <template v-for="(rowId, rowIndex) in rowIds">
            <slot
                name="cell"
                :data="data[rowIndex]"
                :row-id="rowId"
                :column="column"
                :column-index="columnIndex"
                :row-index="rowsOffset + rowIndex + basicFiltersOffset + 1"
                :is-selected="isSelectedAllRows
                    || selectedRows[rowsOffset + rowIndex + basicFiltersOffset + 1]"
                :is-locked="!isEditingAllowed"
                :is-copyable="isEditingAllowed">
                <Component
                    v-if="dataCellComponent"
                    :is="dataCellComponent"
                    :key="`${rowId}|${column.id}`"
                    :data="data[rowIndex]"
                    :column="column"
                    :row-id="rowId"
                    :column-index="columnIndex"
                    :row-index="rowsOffset + rowIndex + basicFiltersOffset + 1"
                    :is-locked="!isEditingAllowed"
                    :is-copyable="isEditingAllowed"
                    :is-selected="isSelectedAllRows
                        || selectedRows[rowsOffset + rowIndex + basicFiltersOffset + 1]"
                    @editCell="onEditCell"
                    @copyCells="onCopyCells" />
            </slot>
        </template>
    </GridDraggableColumn>
</template>

<script>
import GridTableCell from '@Core/components/Grid/Layout/Table/Cells/GridTableCell';
import GridInteractiveHeaderCell from '@Core/components/Grid/Layout/Table/Cells/Header/GridInteractiveHeaderCell';
import GridDraggableColumn from '@Core/components/Grid/Layout/Table/Columns/GridDraggableColumn';
import {
    capitalizeAndConcatenationArray,
} from '@Core/models/stringWrapper';

export default {
    name: 'GridColumn',
    components: {
        GridDraggableColumn,
        GridInteractiveHeaderCell,
        GridTableCell,
    },
    props: {
        column: {
            type: Object,
            required: true,
        },
        filter: {
            type: Object,
            default: null,
        },
        sortedColumn: {
            type: Object,
            default: () => ({}),
        },
        selectedRows: {
            type: Object,
            default: () => ({}),
        },
        data: {
            type: Array,
            default: () => [],
        },
        rowIds: {
            type: Array,
            default: () => [],
        },
        columnIndex: {
            type: Number,
            required: true,
        },
        rowsOffset: {
            type: Number,
            default: 0,
        },
        isSelectedAllRows: {
            type: Boolean,
            default: false,
        },
        isBasicFilter: {
            type: Boolean,
            default: false,
        },
        isEditable: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isHeaderFocused: false,
        };
    },
    computed: {
        basicFiltersOffset() {
            return this.isBasicFilter ? 1 : 0;
        },
        isEditingAllowed() {
            return this.column.editable && this.isEditable;
        },
        isFilterLocked() {
            return typeof this.column.filter === 'undefined';
        },
        filterCellComponent() {
            if (!this.column.filter) return null;

            return () => import(`@Core/components/Grid/Layout/Table/Cells/Filter/Grid${capitalizeAndConcatenationArray(this.column.filter.type.split('_'))}FilterCell`);
        },
        dataCellComponent() {
            const extendedComponents = this.$getExtendedComponents('GRID');
            const isDataCellExtended = typeof extendedComponents !== 'undefined'
                    && typeof extendedComponents.layout !== 'undefined'
                    && typeof extendedComponents.layout.table !== 'undefined'
                    && typeof extendedComponents.layout.table.cells !== 'undefined'
                    && typeof extendedComponents.layout.table.cells.data !== 'undefined';
            const extendedDataCell = isDataCellExtended
                ? extendedComponents.layout.table.cells.data.find(
                    cell => cell.type === this.column.type,
                )
                : null;

            return extendedDataCell
                ? extendedDataCell.component
                : () => import(`@Core/components/Grid/Layout/Table/Cells/Data/Grid${capitalizeAndConcatenationArray(this.column.type.split('_'))}DataCell`);
        },
    },
    methods: {
        onHeaderFocus(isFocused) {
            this.isHeaderFocused = isFocused;
        },
        onSortColumn(sortedColumn) {
            this.$emit('sort', sortedColumn);
        },
        onRemoveColumn(index) {
            this.$emit('remove', index);
        },
        onFilterChange(payload) {
            this.$emit('filter', payload);
        },
        onSwapColumns(payload) {
            this.$emit('swapColumns', payload);
        },
        onUpdateWidth(payload) {
            this.$emit('updateWidth', payload);
        },
        onEditCell(payload) {
            this.$emit('editCell', payload);
        },
        onCopyCells(payload) {
            this.$emit('copyCells', payload);
        },
    },
};
</script>
