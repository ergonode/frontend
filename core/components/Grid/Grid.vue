/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="['grid', {
            'grid--placeholder': isPlaceholder,
            'grid--disabled': isColumnExists,
        }]">
        <GridHeader
            :title="title"
            :row-height="rowHeight"
            :layout="layout"
            @rowHeightChange="onRowHeightChange"
            @layoutChange="onLayoutChange" />
        <div
            ref="gridContent"
            class="grid__content"
            :style="templateColumns"
            @dragleave="onDragLeave">
            <GridColumnSelectRow
                v-if="isSelectColumn"
                :style="templateRows"
                :row-ids="rowIds"
                :rows-offset="rowsOffset"
                :row-height="rowHeight"
                :is-selected-all-rows="isSelectedAllRows"
                :selected-rows="selectedRows"
                :is-basic-filters="isBasicFilters"
                :current-page="currentPage"
                :number-of-displayed-elements="maxRows"
                :is-pinned="isSelectColumnPinned"
                @rowSelect="onSelectRow"
                @rowsSelect="onSelectAllRows">
                <template #headerCheckCell="{ row, column }">
                    <slot
                        name="headerSelectAllRowsCell"
                        :row="row"
                        :column="column" />
                </template>
                <template #checkCell="{ row, column }">
                    <slot
                        name="selectRowCell"
                        :row="row"
                        :column="column" />
                </template>
            </GridColumnSelectRow>
            <GridColumnData
                v-for="(column, colIndex) in columns"
                :key="column.id"
                :style="templateRows"
                :draggable="isDraggable"
                :index="colIndex + columnsOffset"
                :column="column"
                :column-offset="columnsOffset"
                :row-height="rowHeight"
                :is-header-focused="isHeaderFocused"
                :is-mouse-over-grid="isMouseOverGrid"
                @mouseOverGrid="onMouseOverGrid"
                @removeColumnAtIndex="onRemoveColumnAtIndex"
                @changeColumnsPosition="onChangeColumnsPosition"
                @updateColumnWidthAtIndex="onUpdateColumnWidthAtIndex"
                @drop="onDrop">
                <GridHeaderCell
                    :column-index="colIndex + columnsOffset"
                    :sorted-column="sortedColumn"
                    :column="column"
                    :row-index="getRowIndex(0)"
                    @focus="onHeaderFocus"
                    @sort="onSortColumn"
                    @removeColumnAtIndex="onRemoveColumnAtIndex" />
                <GridFilterCell
                    v-if="isBasicFilters"
                    :column-index="colIndex + columnsOffset"
                    :row-index="getRowIndex(1)"
                    :column="column"
                    :filter="basicFilters[column.id]"
                    :disabled="typeof advancedFiltersValues[column.id] !== 'undefined'"
                    @filter="onFilterChange" />
                <slot
                    v-for="(id, rowIndex) in rowIds"
                    name="cell"
                    :column="column"
                    :row-id="id"
                    :row-index="getRowIndex(rowIndex + rowsOffset)"
                    :column-index="colIndex + columnsOffset"
                    :cell-data="cellValues[id][column.id]">
                    <GridDataCell
                        :key="`${id}-${column.id}`"
                        :column-index="colIndex + columnsOffset"
                        :row-index="getRowIndex(rowIndex + rowsOffset)"
                        :row-id="id"
                        :row-ids="rowIds"
                        :cell-data="cellValues[id][column.id]"
                        :column="column"
                        :draft="drafts[id]"
                        :is-selected="isSelectedAllRows
                            || selectedRows[getRowIndex(rowIndex + rowsOffset)]"
                        :editing-privilege-allowed="editingPrivilegeAllowed" />
                </slot>
            </GridColumnData>
            <GridColumnEdit
                v-if="isEditColumn"
                :style="templateRows"
                :is-selected-all-rows="isSelectedAllRows"
                :selected-rows="selectedRows"
                :current-page="currentPage"
                :number-of-displayed-elements="maxRows"
                :rows-offset="rowsOffset"
                :column-index="editColumnIndex"
                :is-basic-filters="isBasicFilters"
                :row-links="rowLinks"
                :is-pinned="isEditColumnPinned"
                @editRow="onEditRow" />
            <GridColumnSentinel
                v-if="isSelectColumn"
                :pinned-state="columnPinnedState.LEFT"
                @sticky="onStickyChange" />
            <GridColumnSentinel
                v-if="isEditColumn"
                :style="{ gridColumn: `${editColumnIndex} / ${editColumnIndex}`}"
                :pinned-state="columnPinnedState.RIGHT"
                @sticky="onStickyChange" />
        </div>
        <GridPlaceholder v-if="isPlaceholder" />
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import {
    ROW_HEIGHT,
    GRID_LAYOUT,
    GHOST_ELEMENT_MODEL,
    PINNED_COLUMN_STATE,
    COLUMN_WIDTH,
    GHOST_ID,
} from '~/defaults/grid';
import {
    isMouseOutOfBoundsElement,
    isTrashBelowMouse,
    getPositionForBrowser,
} from '~/model/drag_and_drop/helpers';
import selectedRowMixin from '~/mixins/grid/selectedRowMixin';
import { swapItemPosition, insertValueAtIndex } from '~/model/arrayWrapper';

export default {
    name: 'Grid',
    mixins: [selectedRowMixin],
    components: {
        GridHeader: () => import('~/core/components/Grid/GridHeader'),
        GridColumnData: () => import('~/core/components/Grid/Columns/GridColumnData'),
        GridColumnSentinel: () => import('~/core/components/Grid/Columns/GridColumnSentinel'),
        GridColumnEdit: () => import('~/core/components/Grid/Columns/GridColumnEdit'),
        GridDataCell: () => import('~/core/components/Grid/GridDataCell'),
        GridFilterCell: () => import('~/core/components/Grid/GridFilterCell'),
        GridHeaderCell: () => import('~/core/components/Grid/GridHeaderCell'),
        GridPlaceholder: () => import('~/core/components/Grid/GridPlaceholder'),
    },
    props: {
        title: {
            type: String,
            required: true,
        },
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
        columnPinnedState() {
            return PINNED_COLUMN_STATE;
        },
        editColumnIndex() {
            let index = this.columns.length;

            if (this.isSelectColumn) index += 1;

            return index;
        },
        columnsOffset() {
            return this.isSelectColumn ? 1 : 0;
        },
        rowsOffset() {
            return this.isBasicFilters ? 2 : 1;
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
        getRowIndex(index) {
            return index
                + ((this.currentPage - 1) * this.maxRows);
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
            const { gridContent } = this.$refs;
            const isVisible = !!(
                gridContent.offsetWidth
                || gridContent.offsetHeight
                || gridContent.getClientRects().length);

            if (!gridContent.contains(event.target) && isVisible) {
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

            const { gridContent } = this.$refs;
            const isOutOfBounds = isMouseOutOfBoundsElement(gridContent, xPos, yPos);

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
            this.$emit('removeColumn', index);
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
                const { gridContent } = this.$refs;
                const { length } = gridContent.children;

                for (let i = 0; i < length; i += 1) {
                    gridContent.children[i].style.transform = null;
                }

                this.columnWidths.splice(this.ghostIndex, 1);
                this.$emit('removeColumn', index);
                this.setDraggedElIndex();
                this.setGhostIndex();
            }
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
            #{$grid}__content {
                flex-shrink: 0;
            }
        }

        &--disabled {
            #{$grid}__content::after {
                z-index: $Z_INDEX_LVL_4;
            }
        }

        &__content {
            position: relative;
            display: grid;
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
