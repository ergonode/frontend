/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="classes"
        ref="gridTableLayout"
        @focusin="onFocusInside"
        @focusout="onFocusOut">
        <Preloader v-if="isPrefetchingData || !isLayoutResolved" />
        <template v-else>
            <GridTableLayoutPinnedSection
                v-if="isSelectColumn"
                :pinned-state="pinnedState.LEFT"
                :sections="pinnedSections">
                <GridSelectRowColumn
                    :style="templateRows"
                    :column-index="0"
                    :data-count="dataCount"
                    :disabled-rows="disabledRows"
                    :rows-offset="rowsOffset"
                    :row-ids="rowIds"
                    :selected-rows="selectedRows"
                    :excluded-from-selection-rows="excludedFromSelectionRows"
                    :is-basic-filter="isBasicFilter"
                    :is-selected-all="isSelectedAll"
                    @rows-select="onRowsSelect"
                    @excluded-rows-select="onExcludedRowsSelect"
                    @select-all="onSelectAllRows" />
            </GridTableLayoutPinnedSection>
            <GridTableLayoutColumnsSection
                :style="templateColumns"
                ref="columnsSection">
                <GridSentinelColumn
                    v-if="isSelectColumn"
                    :pinned-state="pinnedState.LEFT"
                    @sticky="onStickyChange" />
                <template v-for="(column, columnIndex) in orderedColumns">
                    <Component
                        v-if="columnComponents[column.type]"
                        :is="columnComponents[column.type]"
                        :style="templateRows"
                        :key="column.id"
                        :index="columnIndex"
                        :column="column"
                        :rows="rows"
                        :row-ids="rowIds"
                        :drafts="drafts"
                        :filters="filters"
                        :disabled-rows="disabledRows"
                        :selected-rows="selectedRows"
                        :excluded-from-selection-rows="excludedFromSelectionRows"
                        :rows-offset="rowsOffset"
                        :is-basic-filter="isBasicFilter"
                        :is-selected-all="isSelectedAll"
                        @remove="onRemoveColumn"
                        @swap="onSwapColumns"
                        @resize="onResizeColumn"
                        @sort="onSortColumn"
                        @edit-filter-cell="onEditFilterCell"
                        @filter-value="onFilterValueChange"
                        @filter-clear="onFilterValueClear"
                        @cell-value="onCellValueChange"
                        @edit-cell="onEditCell"
                    />
                    <GridDraggableDataColumn
                        v-else
                        :style="templateRows"
                        :key="column.id"
                        :scope="scope"
                        :column-index="columnIndex + columnsOffset"
                        :column="column"
                        :rows="rows"
                        :rows-offset="rowsOffset"
                        :sort-order="sortOrder"
                        :filters="filters"
                        :data-filter-cell-components="dataFilterCellComponents"
                        :data-cell-components="dataCellComponents"
                        :row-ids="rowIds"
                        :errors="errors"
                        :disabled-rows="disabledRows"
                        :drafts="drafts"
                        :selected-rows="selectedRows"
                        :excluded-from-selection-rows="excludedFromSelectionRows"
                        :is-basic-filter="isBasicFilter"
                        :is-editable="isEditable"
                        :is-selected-all="isSelectedAll"
                        @remove="onRemoveColumn"
                        @swap="onSwapColumns"
                        @resize="onResizeColumn"
                        @sort="onSortColumn"
                        @edit-filter-cell="onEditFilterCell"
                        @filter-value="onFilterValueChange"
                        @filter-clear="onFilterValueClear"
                        @cell-value="onCellValueChange"
                        @edit-cell="onEditCell"
                    />
                </template>
                <GridSentinelColumn
                    v-if="actionColumns.length"
                    :style="{ gridColumn: `${orderedColumns.length}`}"
                    :pinned-state="pinnedState.RIGHT"
                    @sticky="onStickyChange" />
            </GridTableLayoutColumnsSection>
            <GridTableLayoutPinnedSection
                :pinned-state="pinnedState.RIGHT"
                :sections="pinnedSections">
                <GridRowActionColumn
                    v-for="(column, columnIndex) in actionColumns"
                    :style="templateRows"
                    :key="column.id"
                    :column="column"
                    :action-cell-components="actionCellComponents"
                    :columns="actionColumns"
                    :rows="rows"
                    :disabled-rows="disabledRows"
                    :row-ids="rowIds"
                    :rows-offset="rowsOffset"
                    :columns-offset="orderedColumns.length + columnIndex + columnsOffset"
                    :selected-rows="selectedRows"
                    :excluded-from-selection-rows="excludedFromSelectionRows"
                    :is-basic-filter="isBasicFilter"
                    :is-selected-all="isSelectedAll"
                    @row-action="onRowAction" />
            </GridTableLayoutPinnedSection>
        </template>
        <Component
            v-if="editCell"
            :is="editCellComponent"
            ref="editCell"
            v-bind="editCell.props"
            @cell-value="onCellValueChange"
            @dismiss="onDismissEditCell" />
        <Component
            v-if="editFilterCell"
            :is="editFilterCellComponent"
            ref="editCell"
            v-bind="editFilterCell.props"
            @filter-value="onFilterValueChange"
            @filter-clear="onFilterValueClear"
            @dismiss="onDismissEditFilterCell" />
        <GridCellResizer
            v-if="cellResizer"
            v-bind="cellResizer"
            @resize="onCellResize"
            @copy="onCopyCellValuesByResizing" />
    </div>
</template>

<script>
import {
    COLUMN_WIDTH,
    DEFAULT_GRID_PAGINATION,
    GRID_ACTION,
    GRID_LAYOUT,
    PINNED_COLUMN_STATE,
    ROW_HEIGHT,
} from '@Core/defaults/grid';
import {
    swapItemPosition,
} from '@Core/models/arrayWrapper';
import {
    capitalizeAndConcatenationArray,
} from '@Core/models/stringWrapper';
import DropZone from '@UI/components/DropZone/DropZone';
import GridDraggableDataColumn from '@UI/components/Grid/Layout/Table/Columns/GridDraggableDataColumn';
import GridRowActionColumn from '@UI/components/Grid/Layout/Table/Columns/GridRowActionColumn';
import GridSelectRowColumn from '@UI/components/Grid/Layout/Table/Columns/GridSelectRowColumn';
import GridSentinelColumn from '@UI/components/Grid/Layout/Table/Columns/GridSentinelColumn';
import GridTableLayoutColumnsSection from '@UI/components/Grid/Layout/Table/Sections/GridTableLayoutColumnsSection';
import GridTableLayoutPinnedSection from '@UI/components/Grid/Layout/Table/Sections/GridTableLayoutPinnedSection';
import Preloader from '@UI/components/Preloader/Preloader';
import gridResizerCellMixin from '@UI/mixins/grid/gridResizerCellMixin';
import {
    getFixedMousePosition,
    isMouseOutsideElement,
} from '@UI/models/mouse';

export default {
    name: 'GridTableLayout',
    components: {
        Preloader,
        DropZone,
        GridDraggableDataColumn,
        GridRowActionColumn,
        GridTableLayoutColumnsSection,
        GridTableLayoutPinnedSection,
        GridSelectRowColumn,
        GridSentinelColumn,
    },
    mixins: [
        gridResizerCellMixin,
    ],
    props: {
        /**
         * Context scope
         */
        scope: {
            type: String,
            default: '',
        },
        /**
         * List of columns presented at Grid
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
         * List of row ids
         */
        rowIds: {
            type: Array,
            default: () => [],
        },
        /**
         * The drafts are unsaved changes, cached changed data at given time
         */
        drafts: {
            type: Object,
            default: () => ({}),
        },
        /**
         * The validation errors
         */
        errors: {
            type: Object,
            default: () => ({}),
        },
        /**
         * Selected filter values
         */
        filters: {
            type: Object,
            default: () => ({}),
        },
        /**
         * The disabled rows are defining which rows are not being able to interact with
         */
        disabledRows: {
            type: Object,
            default: () => ({}),
        },
        /**
         * Data model of pagination
         */
        pagination: {
            type: Object,
            default: DEFAULT_GRID_PAGINATION,
        },
        /**
         * Determines the row height
         */
        rowHeight: {
            type: Number,
            default: ROW_HEIGHT.SMALL,
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
         * Determines if data is loaded asynchronously
         */
        isPrefetchingData: {
            type: Boolean,
            default: false,
        },
        /**
         * Determines if layout is resolved
         */
        isLayoutResolved: {
            type: Boolean,
            default: false,
        },
        /**
         * Determinate if the component is being able to edit
         */
        isEditable: {
            type: Boolean,
            default: false,
        },
        /**
         * Determines if selecting row column is visible
         */
        isSelectColumn: {
            type: Boolean,
            default: false,
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
        /**
         * Determinate if action column is visible
         */
        isActionColumn: {
            type: Boolean,
            default: true,
        },
        /**
         * The data model of sorted column
         */
        sortOrder: {
            type: Object,
            default: () => ({}),
        },
        /**
         * The data model of extended table layout components
         */
        extendedComponents: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            hasInitialWidths: true,
            orderedColumns: [],
            actionColumns: [],
            columnWidths: [],
            columnComponents: {},
            dataCellComponents: {},
            actionCellComponents: {},
            dataFilterCellComponents: {},
            filterTypes: {},
            columnTypes: {},
            pinnedSections: {},
            editCell: null,
            editFilterCell: null,
        };
    },
    computed: {
        classes() {
            return [
                'grid-table-layout',
                {
                    'grid-table-layout--placeholder': this.dataCount === 0,
                },
            ];
        },
        visibleColumns() {
            return this.columns.filter(column => column.visible);
        },
        gridActions() {
            return Object.values(GRID_ACTION);
        },
        editCellComponent() {
            const type = this.columnTypes[this.editCell.type];

            if (this.extendedComponents.dataEditCells
                && this.extendedComponents.dataEditCells[this.editCell.type]) {
                return this.extendedComponents.dataEditCells[this.editCell.type];
            }

            // TODO: Change deafult component to placeholder if the type is not recognized.
            return () => import(`@UI/components/Grid/Layout/Table/Cells/Edit/Grid${type}EditCell`)
                .catch(() => import('@UI/components/Grid/Layout/Table/Cells/Edit/GridTextEditCell'));
        },
        editFilterCellComponent() {
            const type = this.filterTypes[this.editFilterCell.type];

            if (this.extendedComponents.dataEditFilterCells
                && this.extendedComponents.dataEditFilterCells[this.editFilterCell.type]) {
                return this.extendedComponents.dataEditFilterCells[this.editFilterCell.type];
            }

            return () => import(`@UI/components/Grid/Layout/Table/Cells/Edit/Filter/Grid${type}EditFilterCell`)
                .catch(() => import('@UI/components/Grid/Layout/Table/Cells/Edit/Filter/GridTextEditFilterCell'));
        },
        dataCount() {
            return this.rows.length;
        },
        rowsOffset() {
            return (this.pagination.page - 1) * this.pagination.itemsPerPage;
        },
        columnsOffset() {
            return this.isSelectColumn ? 1 : 0;
        },
        templateColumns() {
            return {
                gridTemplateColumns: this.columnWidths.join(' '),
            };
        },
        headerRowsTemplate() {
            return this.isBasicFilter ? `${ROW_HEIGHT.TINY}px ${ROW_HEIGHT.TINY}px` : `${ROW_HEIGHT.TINY}px`;
        },
        templateRows() {
            if (this.dataCount) {
                return {
                    gridTemplateRows: `${this.headerRowsTemplate} repeat(${this.dataCount}, ${this.rowHeight}px)`,
                };
            }

            return {
                gridTemplateRows: this.headerRowsTemplate,
            };
        },
        pinnedState() {
            return PINNED_COLUMN_STATE;
        },
    },
    watch: {
        columns: {
            immediate: true,
            async handler() {
                if (this.orderedColumns.length !== this.visibleColumns.length
                    || (this.rows.length && !Object.keys(this.actionCellComponents).length)) {
                    await this.initializeColumns();
                }
            },
        },
    },
    methods: {
        onMouseDown(event) {
            if (this.$refs.editCell) {
                const {
                    xPos, yPos,
                } = getFixedMousePosition(event);
                if (isMouseOutsideElement(this.$refs.editCell.$el, xPos, yPos)) {
                    if (this.editCell) {
                        this.onDismissEditCell();
                    } else {
                        this.onDismissEditFilterCell();
                    }
                }
            }
        },
        onDismissEditCell() {
            const {
                row,
                column,
            } = this.editCell.props;

            this.$refs.gridTableLayout.querySelector(`.coordinates-${column}-${row}`).focus();
            this.onEditCell();
        },
        onDismissEditFilterCell() {
            const {
                row,
                column,
            } = this.editFilterCell.props;

            this.$refs.gridTableLayout.querySelector(`.coordinates-${column}-${row}`).focus();
            this.onEditFilterCell();
        },
        onEditCell(editCell = null) {
            this.editCell = editCell;

            if (editCell) {
                this.$refs.gridTableLayout.addEventListener('mousedown', this.onMouseDown);
            } else {
                this.$refs.gridTableLayout.removeEventListener('mousedown', this.onMouseDown);
            }
        },
        onEditFilterCell(editFilterCell = null) {
            this.editFilterCell = editFilterCell;

            if (editFilterCell) {
                this.$refs.gridTableLayout.addEventListener('mousedown', this.onMouseDown);
            } else {
                this.$refs.gridTableLayout.removeEventListener('mousedown', this.onMouseDown);
            }
        },
        onSortColumn(sortOrder) {
            this.$emit('sort-column', sortOrder);
        },
        onFilterValueChange({
            value,
            columnId,
        }) {
            this.$emit('filter', {
                ...this.filters,
                [columnId]: value,
            });
        },
        onFilterValueClear(columnId) {
            const filters = {
                ...this.filters,
            };

            delete filters[columnId];

            this.$emit('filter', filters);
        },
        onRemoveColumn(index) {
            const fixedIndex = index - this.columnsOffset;
            const column = this.orderedColumns[fixedIndex];

            this.orderedColumns.splice(fixedIndex, 1);
            this.columnWidths.splice(fixedIndex, 1);

            this.$emit('remove-column', {
                index: fixedIndex,
                column,
            });
        },
        onResizeColumn({
            index,
            width,
        }) {
            if (this.hasInitialWidths) {
                this.initialColumnWidths();
            }

            this.columnWidths[index - this.columnsOffset] = width;
            this.columnWidths = [
                ...this.columnWidths,
            ];
        },
        onSwapColumns({
            from,
            to,
        }) {
            const fixedFromIndex = from - this.columnsOffset;
            const fixedToIndex = to - this.columnsOffset;

            this.swapColumnWidths({
                from: fixedFromIndex,
                to: fixedToIndex,
            });
            this.swapColumnsOrder({
                from: fixedFromIndex,
                to: fixedToIndex,
            });
            this.$emit('swap-columns', {
                from: fixedFromIndex,
                to: fixedToIndex,
            });
        },
        onStickyChange({
            isSticky,
            state,
        }) {
            this.pinnedSections = {
                ...this.pinnedSections,
                [state]: isSticky,
            };
        },
        onRowsSelect(payload) {
            this.$emit('rows-select', payload);
        },
        onExcludedRowsSelect(excludedFromSelectionRows) {
            this.$emit('excluded-rows-select', excludedFromSelectionRows);
        },
        onSelectAllRows(isSelected) {
            this.$emit('select-all', isSelected);
        },
        onCellValueChange(value) {
            this.$emit('cell-value', value);
        },
        onRowAction(payload) {
            this.$emit('row-action', payload);
        },
        async initializeColumns() {
            const actionColumns = this.isActionColumn ? this.getActionColumns() : [];
            const orderedColumns = [];
            const columnWidths = [];
            const {
                length,
            } = this.visibleColumns;

            const requests = [];

            for (let i = 0; i < length; i += 1) {
                const column = this.visibleColumns[i];
                const {
                    type,
                } = column;

                if (typeof this.extendedComponents.columns[type] !== 'undefined') {
                    requests.push(this.setExtendedColumn(type));
                } else {
                    if (typeof this.columnTypes[type] === 'undefined') {
                        this.columnTypes[type] = this.getColumnTypeName(column);

                        try {
                            if (this.extendedComponents.dataCells
                                && this.extendedComponents.dataCells[type]) {
                                requests.push(this.setExtendedDataCell(type));
                            } else {
                                requests.push(this.setDataCell(type));
                            }
                        } catch (e) {
                            requests.push(this.setDefaultDataCell(type));
                        }
                    }

                    if (column.filter && typeof this.filterTypes[column.filter.type] === 'undefined') {
                        const {
                            type: filterType,
                        } = column.filter;

                        this.filterTypes[filterType] = this.getColumnFilterTypeName(column);

                        try {
                            if (this.extendedComponents.dataFilterCells
                                && this.extendedComponents.dataFilterCells[filterType]) {
                                requests.push(this.setExtendedFilterDataCell(filterType));
                            } else {
                                requests.push(this.setDataFilterCell(filterType));
                            }
                        } catch (e) {
                            requests.push(this.setDefaultDataFilterCell(filterType));
                        }
                    }
                }

                orderedColumns.push(column);
                columnWidths.push(column.width || COLUMN_WIDTH.DEFAULT);
            }

            for (let i = 0; i < actionColumns.length; i += 1) {
                const {
                    id,
                } = actionColumns[i];

                if (typeof this.actionCellComponents[id] === 'undefined') {
                    try {
                        requests.push(this.setActionCell(id));
                    } catch (e) {
                        requests.push(this.setDefaultActionCell(id));
                    }
                }
            }

            await Promise.all(requests);

            this.actionColumns = actionColumns;
            this.orderedColumns = orderedColumns;
            this.columnWidths = columnWidths;

            if (!this.isLayoutResolved) {
                this.$emit('resolved', {
                    layout: GRID_LAYOUT.TABLE,
                    isResolved: true,
                });
            }
        },
        initialColumnWidths() {
            const {
                columnsSection,
            } = this.$refs;
            const {
                length,
            } = columnsSection.$el.children;

            for (let i = 0; i < length; i += 1) {
                const child = columnsSection.$el.children[i];

                if (!child.classList.contains('column-sentinel')) {
                    const {
                        width,
                    } = child.getBoundingClientRect();

                    this.columnWidths[i - this.columnsOffset] = `${width}px`;
                }
            }

            this.hasInitialWidths = false;
        },
        swapColumnWidths({
            from,
            to,
        }) {
            this.columnWidths = [
                ...swapItemPosition(
                    this.columnWidths,
                    from,
                    to,
                ),
            ];
        },
        swapColumnsOrder({
            from,
            to,
        }) {
            this.orderedColumns = [
                ...swapItemPosition(
                    this.orderedColumns,
                    from,
                    to,
                ),
            ];
        },
        getActionColumns() {
            const {
                length: dataLength,
            } = this.rows;
            const {
                length: actionsLength,
            } = this.gridActions;
            const actionColumns = [];
            const tmp = {};

            for (let i = 0; i < dataLength; i += 1) {
                const row = this.rows[i];

                for (let j = 0; j < actionsLength; j += 1) {
                    const action = this.gridActions[j];

                    if (!tmp[action]
                        && row._links
                        && row._links.value[action]) {
                        tmp[action] = true;

                        if ((action === GRID_ACTION.GET && !tmp[GRID_ACTION.EDIT])
                            || action !== GRID_ACTION.GET) {
                            actionColumns.push({
                                id: action,
                            });
                        }
                    }
                }
            }

            return actionColumns;
        },
        getColumnFilterTypeName(column) {
            return this.columnTypes[column.filter.type] || capitalizeAndConcatenationArray(column.filter.type.split('_'));
        },
        getColumnTypeName(column) {
            return capitalizeAndConcatenationArray(column.type.split('_'));
        },
        setExtendedFilterDataCell(type) {
            return this.extendedComponents.dataFilterCells[type]().then((response) => {
                this.dataFilterCellComponents[type] = response;
            });
        },
        setDataFilterCell(type) {
            return import(`@UI/components/Grid/Layout/Table/Cells/Data/Filter/Grid${this.filterTypes[type]}FilterDataCell`)
                .then((response) => {
                    this.dataFilterCellComponents[type] = response.default;
                });
        },
        setDefaultDataFilterCell(type) {
            return import('@UI/components/Grid/Layout/Table/Cells/Data/Filter/GridDefaultFilterDataCell')
                .then((response) => {
                    this.dataFilterCellComponents[type] = response.default;
                });
        },
        setExtendedDataCell(type) {
            return this.extendedComponents.dataCells[type]().then((response) => {
                this.dataCellComponents[type] = response;
            });
        },
        setExtendedColumn(type) {
            return this.extendedComponents.columns[type]().then((response) => {
                this.columnComponents[type] = response;
            });
        },
        setDataCell(type) {
            return import(`@UI/components/Grid/Layout/Table/Cells/Data/Grid${this.columnTypes[type]}DataCell`)
                .then((response) => {
                    this.dataCellComponents[type] = response.default;
                });
        },
        setDefaultDataCell(type) {
            return import('@UI/components/Grid/Layout/Table/Cells/Data/GridTextDataCell')
                .then((response) => {
                    this.dataCellComponents[type] = response.default;
                });
        },
        setActionCell(id) {
            const type = capitalizeAndConcatenationArray(id.split('_'));

            return import(`@UI/components/Grid/Layout/Table/Cells/Action/Grid${type}ActionCell`)
                .then((response) => {
                    this.actionCellComponents[id] = response.default;
                });
        },
        setDefaultActionCell(id) {
            return import('@UI/components/Grid/Layout/Table/Cells/GridTableCell')
                .then((response) => {
                    this.actionCellComponents[id] = response.default;
                });
        },
        getGridTableLayoutReference() {
            return this.$refs.gridTableLayout;
        },
    },
    provide() {
        return {
            getGridTableLayoutReference: this.getGridTableLayoutReference,
        };
    },
};
</script>

<style lang="scss" scoped>
    .grid-table-layout {
        position: relative;
        display: flex;
        flex: 1 1 auto;
        overflow: auto;

        &--placeholder {
            flex: 0 0 auto;
        }
    }
</style>
