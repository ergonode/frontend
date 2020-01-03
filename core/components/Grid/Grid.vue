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
                v-if="selectColumn"
                :style="templateRows"
                :row-ids="gridState.rowIds"
                :rows-offset="rowsOffset"
                :row-height="rowHeight"
                :is-selected-all-rows="isSelectedAllRows"
                :selected-rows="selectedRows"
                :basic-filters="basicFilters"
                :current-page="gridState.currentPage"
                :number-of-displayed-elements="gridState.numberOfDisplayedElements"
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
                v-for="(column, colIndex) in gridState.columns"
                :key="column.id"
                :style="templateRows"
                :draggable="draggableColumn"
                :namespace="namespace"
                :index="colIndex + columnsOffset"
                :column="column"
                :column-offset="columnsOffset"
                :row-height="rowHeight"
                :is-header-focused="isHeaderFocused"
                :is-mouse-over-grid="isMouseOverGrid"
                @mouseOverGrid="onMouseOverGrid">
                <GridHeaderCell
                    :namespace="namespace"
                    :column-index="colIndex + columnsOffset"
                    :is-column-editable="isColumnEditable"
                    :column="column"
                    :path="editRoute.path"
                    :row-index="getRowIndex(0)"
                    @focus="onHeaderFocus" />
                <GridFilterCell
                    v-if="basicFilters"
                    :namespace="namespace"
                    :column-index="colIndex + columnsOffset"
                    :row-index="getRowIndex(1)"
                    :column="column"
                    :filter="gridState.filters[column.id]"
                    :path="editRoute.path" />
                <slot
                    v-for="(id, rowIndex) in gridState.rowIds"
                    name="cell"
                    :column="column"
                    :row-id="id"
                    :row-index="getRowIndex(rowIndex + rowsOffset)"
                    :column-index="colIndex + columnsOffset"
                    :cell-data="gridState.cellValues[id][column.id]">
                    <GridDataCell
                        :key="id"
                        :column-index="colIndex + columnsOffset"
                        :row-index="getRowIndex(rowIndex + rowsOffset)"
                        :row-id="id"
                        :cell-data="gridState.cellValues[id][column.id] || { value: ''}"
                        :column="column"
                        :draft="drafts[id]"
                        :is-selected="isSelectedAllRows
                            || selectedRows[getRowIndex(rowIndex + rowsOffset)]"
                        :editing-privilege-allowed="editingPrivilegeAllowed" />
                </slot>
            </GridColumnData>
            <GridColumnEdit
                v-if="editColumn"
                :style="templateRows"
                :is-selected-all-rows="isSelectedAllRows"
                :selected-rows="selectedRows"
                :current-page="gridState.currentPage"
                :number-of-displayed-elements="gridState.numberOfDisplayedElements"
                :rows-offset="rowsOffset"
                :column-index="editColumnIndex"
                :basic-filters="basicFilters"
                :row-links="gridState.rowLinks"
                :route-path="editRoute.name"
                :is-pinned="isEditColumnPinned"
                @rowEdit="onRowEdit" />
            <GridColumnSentinel
                v-if="selectColumn"
                :pinned-state="columnPinnedState.LEFT"
                @sticky="onStickyChange" />
            <GridColumnSentinel
                v-if="editColumn"
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
    GHOST_ID,
    PINNED_COLUMN_STATE,
    COLUMN_WIDTH,
} from '~/defaults/grid';
import {
    isMouseOutOfBoundsElement,
} from '~/model/drag_and_drop/helpers';
import selectedRowMixin from '~/mixins/grid/selectedRowMixin';

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
        namespace: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        editRoute: {
            type: Object,
            required: true,
        },
        editingPrivilegeAllowed: {
            type: Boolean,
            default: true,
        },
        draggableColumn: {
            type: Boolean,
            default: false,
        },
        basicFilters: {
            type: Boolean,
            default: false,
        },
        selectColumn: {
            type: Boolean,
            default: true,
        },
        editColumn: {
            type: Boolean,
            default: true,
        },
        isColumnEditable: {
            type: Boolean,
            default: true,
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
        };
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
                this.addGhostFilter();
            } else {
                this.removeGhostColumn();
                this.removeGhostFilter();
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
        gridState() {
            return this.$store.state[this.namespace];
        },
        columnPinnedState() {
            return PINNED_COLUMN_STATE;
        },
        editColumnIndex() {
            let index = this.gridState.columns.length;

            if (this.selectColumn) index += 1;

            return index;
        },
        numberOfPages() {
            return this.$store.getters[`${this.namespace}/numberOfPages`];
        },
        columnsOffset() {
            return this.selectColumn ? 1 : 0;
        },
        rowsOffset() {
            return this.basicFilters ? 2 : 1;
        },
        templateRows() {
            const headerRowsTemplate = this.basicFilters ? `${ROW_HEIGHT.MEDIUM}px ${ROW_HEIGHT.MEDIUM}px` : `${ROW_HEIGHT.MEDIUM}px`;
            const dataRowsTemplate = this.gridState.rowIds.length > 0 ? `repeat(${this.gridState.rowIds.length}, ${this.rowHeight}px)` : '';

            return {
                gridTemplateRows: `${headerRowsTemplate} ${dataRowsTemplate}`,
            };
        },
        templateColumns() {
            const rightWidths = [];
            const leftWidths = [];

            if (this.selectColumn) leftWidths.push(COLUMN_WIDTH.ACTION);
            if (this.editColumn) rightWidths.push(COLUMN_WIDTH.ACTION);

            return {
                gridTemplateColumns: `${leftWidths.join(' ')} ${this.gridState.columnWidths.join(' ')} ${rightWidths.join(' ')}`,
            };
        },
        isFilterExists() {
            const draggedElIndex = this.gridState.advancedFiltersData.findIndex(
                (filter) => filter.id === this.draggedElement,
            );

            return draggedElIndex !== -1;
        },
        isColumnExists() {
            const draggedElIndex = this.gridState.columns.findIndex(
                (column) => column.id === this.draggedElement,
            );

            return draggedElIndex !== -1;
        },
        isPlaceholder() {
            return !this.gridState.rowIds.length;
        },
    },
    methods: {
        ...mapActions('draggable', [
            'setDraggableState',
            'setDraggedElement',
            'setDraggedElIndex',
            'setGhostElXTranslation',
            'setGhostIndex',
            'setGhostFilterIndex',
        ]),
        setEditingCellCoordinates(coordinates = { row: null, column: null }) {
            this.editingCellCoordinates = coordinates;
        },
        getEditingCellCoordinates() {
            return this.editingCellCoordinates;
        },
        getRowIndex(index) {
            return index
                + ((this.gridState.currentPage - 1) * this.gridState.numberOfDisplayedElements);
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
            const isVisible = !!gridContent
                && !!(
                    gridContent.offsetWidth
                    || gridContent.offsetHeight
                    || gridContent.getClientRects().length
                );

            if (!gridContent.contains(event.target) && isVisible) {
                // Dismiss editable cell mode

                this.setEditingCellCoordinates();
            }
        },
        onRowEdit(route) {
            this.$emit('rowEdit', route);
        },
        onMouseOverGrid(isOver) {
            this.isMouseOverGrid = isOver;
        },
        onDragLeave({ pageX, pageY }) {
            if (pageX === 0 && pageY === 0) return false;

            const { gridContent } = this.$refs;
            const elementBelowMouse = document.elementFromPoint(pageX, pageY);
            const isOutOfBounds = isMouseOutOfBoundsElement(gridContent, pageX, pageY);
            const isTrashBelowMouse = elementBelowMouse && elementBelowMouse.className === 'trash-can';

            if (isOutOfBounds || isTrashBelowMouse) {
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
        addGhostColumn() {
            if (!this.isColumnExists) {
                const width = 100;
                const ghostIndex = 0; // 0 because we cannot drag select row column

                this.$store.dispatch(`${this.namespace}/insertColumnAtIndex`, { column: GHOST_ELEMENT_MODEL, index: ghostIndex });
                this.$store.dispatch(`${this.namespace}/insertColumnWidthAtIndex`, { width: `${width}px`, index: ghostIndex });

                this.setGhostIndex(ghostIndex + this.columnsOffset);
                this.setDraggedElIndex(ghostIndex + this.columnsOffset);
            }
        },
        removeGhostColumn() {
            if (this.draggedElIndex !== -1) {
                this.$store.dispatch(`${this.namespace}/removeColumnAtIndex`, this.draggedElIndex - this.columnsOffset);
                this.$store.dispatch(`${this.namespace}/removeColumnWidthAtIndex`, this.draggedElIndex - this.columnsOffset);

                this.setDraggedElIndex();
                this.setGhostIndex();
            }
        },
        addGhostFilter() {
            if (!this.isFilterExists) {
                const ghostIndex = 0;

                this.$store.dispatch(`${this.namespace}/insertAdvancedFilterAtIndex`, {
                    index: ghostIndex,
                    filter: GHOST_ELEMENT_MODEL,
                });
                this.setGhostFilterIndex(ghostIndex);
            }
        },
        removeGhostFilter() {
            const ghostIndex = this.gridState.advancedFiltersData.findIndex(
                (filter) => filter.id === GHOST_ID,
            );

            if (ghostIndex !== -1) {
                this.$store.dispatch(`${this.namespace}/removeAdvancedFilterAtIndex`, ghostIndex);
                this.setGhostFilterIndex();
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
                z-index: 15;
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
