/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<script>
import { mapState, mapActions } from 'vuex';
import {
    PINNED_COLUMN_STATE,
    COLUMN_WIDTH,
    GHOST_ID,
    ROW_HEIGHT,
    GHOST_ELEMENT_MODEL,
} from '@Core/defaults/grid';
import selectGridRowMixin from '@Core/mixins/grid/selectGridRowMixin';
import { swapItemPosition, insertValueAtIndex } from '@Core/models/arrayWrapper';
import {
    isMouseOutOfBoundsElement,
    isTrashBelowMouse,
    getPositionForBrowser,
} from '@Core/models/drag_and_drop/helpers';

export default {
    name: 'GridTableLayout',
    components: {
        GridDataColumn: () => import('@Core/components/Grid/Columns/GridDataColumn'),
        GridSentinelColumn: () => import('@Core/components/Grid/Columns/GridSentinelColumn'),
        GridActionColumn: () => import('@Core/components/Grid/Columns/GridActionColumn'),
        GridDataCell: () => import('@Core/components/Grid/GridDataCell'),
        GridFilterCell: () => import('@Core/components/Grid/GridFilterCell'),
        GridHeaderCell: () => import('@Core/components/Grid/GridHeaderCell'),
    },
    mixins: [selectGridRowMixin],
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
        advancedFiltersValues: {
            type: Object,
            default: () => ({}),
        },
        currentPage: {
            type: Number,
            default: 1,
        },
        maxRows: {
            type: Number,
            default: 1,
        },
        rowHeight: {
            type: Number,
            default: ROW_HEIGHT.MEDIUM,
        },
        isEditable: {
            type: Boolean,
            default: false,
        },
        isSelectColumn: {
            type: Boolean,
            default: false,
        },
        isBasicFilters: {
            type: Boolean,
            default: false,
        },
        isDraggable: {
            type: Boolean,
            default: false,
        },
        isActionColumn: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isMouseOverGrid: false,
            isHeaderFocused: false,
            isSelectColumnPinned: false,
            isActionColumnPinned: false,
            isColumnDropped: false,
            editingCellCoordinates: { row: null, column: null },
            columnWidths: [],
            filters: {},
            sortedColumn: {},
        };
    },
    computed: {
        ...mapState('gridDraft', {
            drafts: state => state.drafts,
        }),
        ...mapState('draggable', {
            isListElementDragging: state => state.isListElementDragging,
            ghostIndex: state => state.ghostIndex,
            ghostFilterIndex: state => state.ghostFilterIndex,
            draggedElIndex: state => state.draggedElIndex,
            draggedElement: state => state.draggedElement,
        }),
        rowsOffset() {
            return (this.currentPage - 1) * this.maxRows;
        },
        templateColumns() {
            return {
                gridTemplateColumns: this.columnWidths.join(' '),
            };
        },
        columnsOffset() {
            return this.isSelectColumn ? 1 : 0;
        },
        isColumnExists() {
            const draggedElIndex = this.columns.findIndex(
                column => column.id === this.draggedElement,
            );

            return draggedElIndex !== -1;
        },
        templateRows() {
            const headerRowsTemplate = this.isBasicFilters ? `${ROW_HEIGHT.MEDIUM}px ${ROW_HEIGHT.MEDIUM}px` : `${ROW_HEIGHT.MEDIUM}px`;
            const dataRowsTemplate = this.rowIds.length > 0 ? `repeat(${this.rowIds.length}, ${this.rowHeight}px)` : '';

            return {
                gridTemplateRows: `${headerRowsTemplate} ${dataRowsTemplate}`,
            };
        },
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
    created() {
        if (this.isSelectColumn) this.columnWidths.push(COLUMN_WIDTH.SELECT_ROW);

        const { length } = this.columns;

        for (let i = 0; i < length; i += 1) {
            if (this.columns[i].id === GHOST_ID) {
                this.columnWidths.push(COLUMN_WIDTH.GHOST);
            } else {
                this.columnWidths.push(COLUMN_WIDTH.DEFAULT);
            }
        }

        if (this.isActionColumn) this.columnWidths.push(COLUMN_WIDTH.ACTION);
    },
    mounted() {
        window.addEventListener('click', this.onClickOutside);
    },
    beforeDestroy() {
        window.removeEventListener('click', this.onClickOutside);
    },
    methods: {
        ...mapActions('draggable', [
            'setDraggableState',
            'setDraggedElement',
            'setDraggedElIndex',
            'setGhostElXTranslation',
            'setGhostIndex',
        ]),
        onMouseOverGrid(isOver) {
            this.isMouseOverGrid = isOver;
        },
        onHeaderFocus(isFocused) {
            this.isHeaderFocused = isFocused;
        },
        onSortColumn(sortedColumn) {
            this.sortedColumn = sortedColumn;
            this.$emit('sort', sortedColumn);
        },
        onFilterChange({ id, value, operator }) {
            if (!value || !value.length) {
                delete this.filters[id];
            } else {
                this.filters[id] = { value, operator };
            }
            this.$emit('filter', this.filters);
        },
        onRemoveColumnAtIndex(index) {
            this.columnWidths.splice(index, 1);
            this.$emit('removeColumn', index - this.columnsOffset);
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
        setEditingCellCoordinates(coordinates = { row: null, column: null }) {
            this.editingCellCoordinates = coordinates;
        },
        getEditingCellCoordinates() {
            return this.editingCellCoordinates;
        },
        onClickOutside({ pageX, pageY }) {
            const { gridTemplateLayout } = this.$refs;
            const {
                top, left, width, height,
            } = gridTemplateLayout.getBoundingClientRect();

            if (!(pageX > left
                && pageX < left + width
                && pageY > top
                && pageY < top + height)) {
                this.setEditingCellCoordinates();
            }
        },
        onDragLeave(event) {
            const { xPos, yPos } = getPositionForBrowser(event);

            if (xPos === 0 && yPos === 0) return false;

            const { gridTemplateLayout } = this.$refs;
            const isOutOfBounds = isMouseOutOfBoundsElement(gridTemplateLayout, xPos, yPos);

            if (isOutOfBounds || isTrashBelowMouse(xPos, yPos)) {
                this.isMouseOverGrid = false;
            }

            return true;
        },
        onStickyChange({
            isSticky, state,
        }) {
            if (state === PINNED_COLUMN_STATE.LEFT) {
                this.isSelectColumnPinned = isSticky;
            } else {
                this.isActionColumnPinned = isSticky;
            }
        },
        onDrop(payload) {
            this.isColumnDropped = true;
            let tmpColumnWidths = [...this.columnWidths];
            tmpColumnWidths = swapItemPosition(
                tmpColumnWidths,
                this.draggedElIndex,
                this.ghostIndex,
            );
            tmpColumnWidths[this.ghostIndex] = COLUMN_WIDTH.DEFAULT;
            this.columnWidths = tmpColumnWidths;
            this.$emit('removeColumn', this.draggedElement);
            this.$emit('dropColumn', payload);
        },
        onEditRow(args) {
            this.$emit('editRow', args);
        },
        onRemoveRowAtIndex(index) {
            this.$emit('removeRowAtIndex', index);
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
            if (!this.isColumnDropped
                && this.columnWidths.findIndex(width => width === COLUMN_WIDTH.GHOST) !== -1) {
                const { gridTemplateLayout } = this.$refs;
                const { length } = gridTemplateLayout.children;

                for (let i = 0; i < length; i += 1) {
                    gridTemplateLayout.children[i].style.transform = null;
                }

                this.columnWidths = this.columnWidths.filter(width => width !== COLUMN_WIDTH.GHOST);
                this.$emit('removeColumn', this.draggedElement);
                this.setDraggedElIndex();
                this.setGhostIndex();
            }

            this.isColumnDropped = false;
        },
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
                        filter: this.filters[column.id],
                        disabled: typeof this.advancedFiltersValues[column.id] !== 'undefined',
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
                            isEditable: this.isEditable,
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

                gridColumns.push(createElement('GridSelectRowColumn', {
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
                gridColumns.push(createElement('GridDataColumn', {
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
                gridColumns.push(createElement('GridSentinelColumn', {
                    attrs: {
                        pinnedState: PINNED_COLUMN_STATE.LEFT,
                    },
                    on: {
                        sticky: this.onStickyChange,
                    },
                }));
            }

            if (this.isActionColumn) {
                gridColumns.push(createElement('GridActionColumn', {
                    key: columnIndex,
                    style: this.templateRows,
                    attrs: {
                        isSelectedAllRows: this.isSelectedAllRows,
                        selectedRows: this.selectedRows,
                        rowsOffset: this.rowsOffset,
                        columnIndex,
                        isBasicFilters: this.isBasicFilters,
                        rowLinks: this.rowLinks,
                        isPinned: this.isActionColumnPinned,
                    },
                    on: {
                        editRow: this.onEditRow,
                        removeRowAtIndex: this.onRemoveRowAtIndex,
                    },
                }));

                columnIndex += 1;

                gridColumns.push(createElement('GridSentinelColumn', {
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

        return createElement('div', {
            ref: 'gridTemplateLayout',
            staticClass: 'grid-table-layout',
            class: {
                'grid-table-layout--disabled': this.isColumnExists,
            },
            style: this.templateColumns,
            on: {
                dragleave: this.onDragLeave,
            },
        }, getGridColumns());
    },
    provide() {
        return {
            setEditingCellCoordinates: this.setEditingCellCoordinates,
            getEditingCellCoordinates: this.getEditingCellCoordinates,
        };
    },
};
</script>

<style lang="scss" scoped>
    .grid__columns {
        position: relative;
        display: grid;

        &::after {
            position: absolute;
            z-index: $Z_INDEX_NEGATIVE;
            width: 100%;
            height: 100%;
            content: "";
        }

        &--disabled {
            &::after {
                z-index: $Z_INDEX_LVL_4;
            }
        }
    }
</style>
