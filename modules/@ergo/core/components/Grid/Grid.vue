/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<script>
import { mapState, mapActions } from 'vuex';
import {
    ROW_HEIGHT,
    GRID_LAYOUT,
    GHOST_ELEMENT_MODEL,
    PINNED_COLUMN_STATE,
    COLUMN_WIDTH,
    GHOST_ID,
} from '@Core/defaults/grid';
import {
    isMouseOutOfBoundsElement,
    isTrashBelowMouse,
    getPositionForBrowser,
} from '@Core/models/drag_and_drop/helpers';
import selectedRowMixin from '@Core/mixins/grid/selectedRowMixin';
import { swapItemPosition, insertValueAtIndex } from '@Core/models/arrayWrapper';

export default {
    name: 'Grid',
    mixins: [selectedRowMixin],
    components: {
        GridHeader: () => import('@Core/components/Grid/GridHeader'),
        GridColumnData: () => import('@Core/components/Grid/Columns/GridColumnData'),
        GridColumnSentinel: () => import('@Core/components/Grid/Columns/GridColumnSentinel'),
        GridColumnEdit: () => import('@Core/components/Grid/Columns/GridColumnEdit'),
        GridDataCell: () => import('@Core/components/Grid/GridDataCell'),
        GridFilterCell: () => import('@Core/components/Grid/GridFilterCell'),
        GridHeaderCell: () => import('@Core/components/Grid/GridHeaderCell'),
        GridPlaceholder: () => import('@Core/components/Grid/GridPlaceholder'),
        GridAdvancedFiltersContainer: () => import('@Core/components/Grid/AdvancedFilters/GridAdvancedFiltersContainer'),
        GridAdvancedFilter: () => import('@Core/components/Grid/AdvancedFilters/GridAdvancedFilter'),
        GridAdvancedFiltersRemoveAllButton: () => import('@Core/components/Grid/AdvancedFilters/GridAdvancedFiltersRemoveAllButton'),
        GridAdvancedFilterPlaceholder: () => import('@Core/components/Grid/AdvancedFilters/GridAdvancedFilterPlaceholder'),
    },
    render(createElement) {
        const getColumnCells = (column, columnIndex) => {
            const cells = [];
            const GridHeaderCell = createElement('GridHeaderCell', {
                attrs: {
                    columnIndex,
                    sortedColumn: this.sortedColumn,
                    column,
                    rowIndex: this.rowsOffset,
                },
                on: {
                    focus: this.onHeaderFocus,
                    sort: this.onSortColumn,
                    removeColumnAtIndex: this.onRemoveColumnAtIndex,
                },
            });
            let rowIndex = 0;

            cells.push(GridHeaderCell);

            if (this.isBasicFilters) {
                rowIndex += 1;
                const GridFilterCell = createElement('GridFilterCell', {
                    attrs: {
                        columnIndex,
                        rowIndex: this.rowsOffset + rowIndex,
                        column,
                        filter: this.basicFilters[column.id],
                        disabled: typeof this.advancedFiltersValues[column
                            .id] !== 'undefined',
                    },
                    on: {
                        filter: this.onFilterChange,
                    },
                });

                cells.push(GridFilterCell);
            }

            const { length } = this.rowIds;

            for (let i = 0; i < length; i += 1) {
                rowIndex += 1;
                const fixedRowIndex = this.rowsOffset + rowIndex;
                const id = this.rowIds[i];

                if (this.$scopedSlots && this.$scopedSlots.cell) {
                    cells.push(this.$scopedSlots.cell({
                        column,
                        rowId: id,
                        rowIndex: fixedRowIndex,
                        columnIndex,
                        cellData: this.cellValues[id][column.id],
                    }));
                } else {
                    cells.push(createElement('GridDataCell', {
                        key: (`${id}-${column.id}`),
                        attrs: {
                            columnIndex,
                            rowIndex: fixedRowIndex,
                            rowId: id,
                            rowIds: this.rowIds,
                            cellData: this.cellValues[id][column.id],
                            column,
                            draft: this.drafts[id],
                            isSelected: this.isSelectedAllRows
                                || this.selectedRows[fixedRowIndex],
                            editingPrivilegeAllowed: this.editingPrivilegeAllowed,
                        },
                    }));
                }
            }

            return cells;
        };
        const getGridColumns = () => {
            const { length } = this.columns;
            const gridColumns = [];
            let columnIndex = 0;

            if (this.isSelectColumn) {
                columnIndex += 1;
                const { headerSelectAllRowsCell, selectRowCell } = this.$scopedSlots;

                gridColumns.push(createElement('GridColumnSelectRow', {
                    key: columnIndex,
                    style: this.templateRows,
                    attrs: {
                        rowIds: this.rowIds,
                        rowsOffset: this.rowsOffset,
                        rowHeight: this.rowHeight,
                        isSelectedAllRows: this.isSelectedAllRows,
                        selectedRows: this.selectedRows,
                        isBasicFilters: this.isBasicFilters,
                        isPinned: this.isSelectColumnPinned,
                    },
                    slot: ['headerSelectAllRowsCell', 'selectRowCell'],
                    on: {
                        rowSelect: this.onSelectRow,
                        rowsSelect: this.onSelectAllRows,
                    },
                    scopedSlots: {
                        headerCheckCell(props) {
                            return headerSelectAllRowsCell ? headerSelectAllRowsCell(props) : null;
                        },
                        checkCell(props) {
                            return selectRowCell ? selectRowCell(props) : null;
                        },
                    },
                }));
            }

            for (let i = 0; i < length; i += 1) {
                gridColumns.push(createElement('GridColumnData', {
                    key: this.columns[i].id,
                    style: this.templateRows,
                    attrs: {
                        draggable: this.isDraggable,
                        index: i + this.columnsOffset,
                        column: this.columns[i],
                        columnOffset: this.columnsOffset,
                        rowHeight: this.rowHeight,
                        isHeaderFocused: this.isHeaderFocused,
                        isMouseOverGrid: this.isMouseOverGrid,
                    },
                    slot: 'cell',
                    on: {
                        mouseOverGrid: this.onMouseOverGrid,
                        removeColumnAtIndex: this.onRemoveColumnAtIndex,
                        changeColumnsPosition: this.onChangeColumnsPosition,
                        updateColumnWidthAtIndex: this.onUpdateColumnWidthAtIndex,
                        drop: this.onDrop,
                    },
                }, getColumnCells(this.columns[i], columnIndex)));

                columnIndex += 1;
            }

            if (this.isSelectColumn) {
                gridColumns.push(createElement('GridColumnSentinel', {
                    attrs: {
                        pinnedState: PINNED_COLUMN_STATE.LEFT,
                    },
                    on: {
                        sticky: this.onStickyChange,
                    },
                }));
            }

            if (this.isEditColumn) {
                columnIndex += 1;
                gridColumns.push(createElement('GridColumnEdit', {
                    key: columnIndex,
                    style: this.templateRows,
                    attrs: {
                        isSelectedAllRows: this.isSelectedAllRows,
                        selectedRows: this.selectedRows,
                        rowsOffset: this.rowsOffset,
                        columnIndex,
                        isBasicFilters: this.isBasicFilters,
                        rowLinks: this.rowLinks,
                        isPinned: this.isEditColumnPinned,
                    },
                    on: {
                        editRow: this.onEditRow,
                    },
                }));
                gridColumns.push(createElement('GridColumnSentinel', {
                    style: ({
                        gridColumn: (`${columnIndex} / ${columnIndex}`),
                    }),
                    attrs: {
                        pinnedState: PINNED_COLUMN_STATE.RIGHT,
                    },
                    on: {
                        sticky: this.onStickyChange,
                    },
                }));
            }

            return gridColumns;
        };

        const GridBody = createElement('div', {
            ref: 'gridBody',
            staticClass: 'grid__body',
            style: (this.templateColumns),
            on: {
                dragleave: this.onDragLeave,
            },
        }, getGridColumns());

        const gridElements = [];

        if (this.isHeaderVisible) {
            gridElements.push(createElement('GridHeader', {
                attrs: {
                    rowHeight: this.rowHeight,
                    layout: this.layout,
                    filters: this.advancedFilters,
                    isActionsSelected: this.isSelectedAllRows
                        || Object.keys(this.selectedRows).length !== 0,
                },
                on: {
                    rowHeightChange: this.onRowHeightChange,
                    layoutChange: this.onLayoutChange,
                    dropFilter: this.onDropFilterAtIndex,
                    updateFilter: this.onUpdateFilterAtIndex,
                    removeFilter: this.onRemoveFilterAtIndex,
                    insertFilter: this.onInsertFilterAtIndex,
                    clearFilter: this.onClearFilterAtIndex,
                    setGhostFilter: this.onSetGhostFilterAtIndex,
                    swapFilters: this.onSwapFiltersPosition,
                    applyFilter: this.onApplyFilter,
                    removeAllFilters: this.onRemoveAll,
                },
            }));
        }

        gridElements.push(GridBody);

        if (this.isPlaceholder) {
            gridElements.push(createElement('GridPlaceholder'));
        }

        return createElement('div', {
            class: [
                'grid',
                {
                    'grid--placeholder': this.isPlaceholder,
                    'grid--disabled': this.isColumnExists,
                }],
        }, gridElements);
    },
    props: {
        columns: {
            type: Array,
            default: () => [],
        },
        cellValues: {
            type: Object,
            default: () => ({}),
        },
        rowIds: {
            type: Array,
            default: () => [],
        },
        rowLinks: {
            type: Array,
            default: () => [],
        },
        sortedColumn: {
            type: Object,
            default: () => ({}),
        },
        basicFilters: {
            type: Object,
            default: () => ({}),
        },
        advancedFilters: {
            type: Array,
            default: () => [],
        },
        maxRows: {
            type: Number,
            default: 0,
        },
        maxPage: {
            type: Number,
            default: 1,
        },
        currentPage: {
            type: Number,
            default: 1,
        },
        editingPrivilegeAllowed: {
            type: Boolean,
            default: true,
        },
        isDraggable: {
            type: Boolean,
            default: false,
        },
        isBasicFilters: {
            type: Boolean,
            default: false,
        },
        isSelectColumn: {
            type: Boolean,
            default: false,
        },
        isEditColumn: {
            type: Boolean,
            default: false,
        },
        isHeaderVisible: {
            type: Boolean,
            default: false,
        },
    },
    provide() {
        return {
            setEditingCellCoordinates: this.setEditingCellCoordinates,
            getEditingCellCoordinates: this.getEditingCellCoordinates,
        };
    },
    data() {
        return {
            isHeaderFocused: false,
            isMouseOverGrid: false,
            isSelectColumnPinned: false,
            isEditColumnPinned: false,
            editingCellCoordinates: { row: null, column: null },
            rowHeight: ROW_HEIGHT.MEDIUM,
            layout: GRID_LAYOUT.TABLE,
            columnWidths: [],
        };
    },
    created() {
        if (this.isSelectColumn) this.columnWidths.push(COLUMN_WIDTH.ACTION);

        const { length } = this.columns;

        for (let i = 0; i < length; i += 1) {
            if (this.columns[i].id === GHOST_ID) {
                this.columnWidths.push(COLUMN_WIDTH.GHOST);
            } else {
                this.columnWidths.push(COLUMN_WIDTH.DEFAULT);
            }
        }

        if (this.isEditColumn) this.columnWidths.push(COLUMN_WIDTH.ACTION);
    },
    mounted() {
        window.addEventListener('click', this.onClickOutside);
    },
    beforeDestroy() {
        window.removeEventListener('click', this.onClickOutside);
    },
    watch: {
        isListElementDragging() {
            if (this.isListElementDragging) {
                this.addGhostColumn();
            } else {
                this.removeGhostColumn();
            }
        },
    },
    computed: {
        ...mapState('draggable', {
            isListElementDragging: (state) => state.isListElementDragging,
            ghostIndex: (state) => state.ghostIndex,
            ghostFilterIndex: (state) => state.ghostFilterIndex,
            draggedElIndex: (state) => state.draggedElIndex,
            draggedElement: (state) => state.draggedElement,
        }),
        ...mapState('gridDraft', {
            drafts: (state) => state.drafts,
        }),
        templateColumns() {
            return {
                gridTemplateColumns: this.columnWidths.join(' '),
            };
        },
        rowsOffset() {
            return (this.currentPage - 1) * this.maxRows;
        },
        advancedFiltersValues() {
            const { length } = this.advancedFilters;
            const advancedFiltersValues = {};

            for (let i = 0; i < length; i += 1) {
                if (!this.advancedFilters[i].isGhost
                        && Object.keys(this.advancedFilters[i].value).length > 1) {
                    advancedFiltersValues[this.advancedFilters[i].id] = true;
                }
            }

            return advancedFiltersValues;
        },
        columnsOffset() {
            return this.isSelectColumn ? 1 : 0;
        },
        templateRows() {
            const headerRowsTemplate = this.isBasicFilters ? `${ROW_HEIGHT.MEDIUM}px ${ROW_HEIGHT.MEDIUM}px` : `${ROW_HEIGHT.MEDIUM}px`;
            const dataRowsTemplate = this.rowIds.length > 0 ? `repeat(${this.rowIds.length}, ${this.rowHeight}px)` : '';

            return {
                gridTemplateRows: `${headerRowsTemplate} ${dataRowsTemplate}`,
            };
        },
        isColumnExists() {
            const draggedElIndex = this.columns.findIndex(
                (column) => column.id === this.draggedElement,
            );

            return draggedElIndex !== -1;
        },
        isPlaceholder() {
            return !this.rowIds.length;
        },
    },
    methods: {
        ...mapActions('draggable', [
            'setDraggableState',
            'setDraggedElement',
            'setDraggedElIndex',
            'setGhostElXTranslation',
            'setGhostIndex',
        ]),
        setEditingCellCoordinates(coordinates = { row: null, column: null }) {
            this.editingCellCoordinates = coordinates;
        },
        getEditingCellCoordinates() {
            return this.editingCellCoordinates;
        },
        onStickyChange({
            isSticky, state,
        }) {
            if (state === PINNED_COLUMN_STATE.LEFT) {
                this.isSelectColumnPinned = isSticky;
            } else {
                this.isEditColumnPinned = isSticky;
            }
        },
        onClickOutside(event) {
            const { gridBody } = this.$refs;
            const isVisible = !!(
                gridBody.offsetWidth
                    || gridBody.offsetHeight
                    || gridBody.getClientRects().length);

            if (!gridBody.contains(event.target) && isVisible) {
                // Dismiss editable cell mode

                this.setEditingCellCoordinates();
            }
        },
        onEditRow(route) {
            this.$emit('editRow', route);
        },
        onMouseOverGrid(isOver) {
            this.isMouseOverGrid = isOver;
        },
        onDragLeave(event) {
            const { xPos, yPos } = getPositionForBrowser(event);

            if (xPos === 0 && yPos === 0) return false;

            const { gridBody } = this.$refs;
            const isOutOfBounds = isMouseOutOfBoundsElement(gridBody, xPos, yPos);

            if (isOutOfBounds || isTrashBelowMouse(xPos, yPos)) {
                this.isMouseOverGrid = false;
            }

            return true;
        },
        onRowHeightChange(height) {
            this.rowHeight = height;
        },
        onLayoutChange(layout) {
            this.layout = layout;
        },
        onHeaderFocus(isFocused) {
            this.isHeaderFocused = isFocused;
        },
        onDrop(payload) {
            this.columnWidths.splice(this.draggedElIndex, 1);
            this.columnWidths = insertValueAtIndex(
                this.columnWidths,
                COLUMN_WIDTH.DEFAULT,
                this.ghostIndex,
            );
            this.$emit('dropColumn', payload);
        },
        onUpdateColumnWidthAtIndex({ index, width }) {
            this.columnWidths[index] = width;
            this.columnWidths = [...this.columnWidths];
        },
        onChangeColumnsPosition({ from, to }) {
            this.$emit('swapColumns', { from, to });

            this.columnWidths = [
                ...swapItemPosition(
                    this.columnWidths,
                    from + this.columnsOffset,
                    to + this.columnsOffset,
                ),
            ];
        },
        onRemoveColumnAtIndex(index) {
            this.columnWidths.splice(index, 1);
            this.$emit('removeColumn', index - this.columnsOffset);
        },
        onSortColumn(payload) {
            this.$emit('sortColumn', payload);
        },
        onFilterChange(filter) {
            this.$emit('filterColumn', filter);
        },
        addGhostColumn() {
            if (!this.isColumnExists) {
                const ghostIndex = 0; // 0 because we cannot drag select row column

                this.$emit('insertColumn', { column: GHOST_ELEMENT_MODEL, index: ghostIndex });
                this.columnWidths = insertValueAtIndex(
                    this.columnWidths,
                    COLUMN_WIDTH.GHOST,
                    ghostIndex + this.columnsOffset,
                );
                this.setGhostIndex(ghostIndex + this.columnsOffset);
                this.setDraggedElIndex(ghostIndex + this.columnsOffset);
            }
        },
        removeGhostColumn() {
            if (this.draggedElIndex !== -1) {
                const index = this.draggedElIndex - this.columnsOffset;
                const { gridBody } = this.$refs;
                const { length } = gridBody.children;

                for (let i = 0; i < length; i += 1) {
                    gridBody.children[i].style.transform = null;
                }

                this.columnWidths.splice(this.draggedElIndex, 1);
                this.$emit('removeColumn', index);
                this.setDraggedElIndex();
                this.setGhostIndex();
            }
        },
        onDropFilterAtIndex(payload) {
            this.$emit('dropFilter', payload);
        },
        onUpdateFilterAtIndex(payload) {
            this.$emit('updateFilter', payload);
        },
        onRemoveFilterAtIndex(index) {
            this.$emit('removeFilter', index);
        },
        onInsertFilterAtIndex(payload) {
            this.$emit('insertFilter', payload);
        },
        onClearFilterAtIndex(index) {
            this.$emit('clearFilter', index);
        },
        onSetGhostFilterAtIndex(payload) {
            this.$emit('setGhostFilter', payload);
        },
        onSwapFiltersPosition(payload) {
            this.$emit('swapFilters', payload);
        },
        onApplyFilter() {
            this.$emit('applyFilter');
        },
        onRemoveAll() {
            this.$emit('removeAllFilters');
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid {
        $grid: &;

        position: relative;
        display: flex;
        flex: 1 1 auto;
        flex-direction: column;
        height: 0;

        &--placeholder {
            #{$grid}__body {
                flex-shrink: 0;
            }
        }

        &--disabled {
            #{$grid}__body::after {
                z-index: $Z_INDEX_LVL_4;
            }
        }

        &__body {
            position: relative;
            display: grid;
            border-top: $BORDER_1_GREY;
            border-left: $BORDER_1_GREY;
            border-right: $BORDER_1_GREY;
            background-color: $WHITESMOKE;
            overflow: auto;

            &::after {
                position: absolute;
                z-index: $Z_INDEX_NEGATIVE;
                width: 100%;
                height: 100%;
                content: "";
            }
        }
    }
</style>
