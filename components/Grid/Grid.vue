/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="['grid', {
            'grid--placeholder': isPlaceholder,
            'grid--disabled': isColumnExists || isAdvancedFilterFocused,
        }]">
        <GridAdvancedFilters
            v-if="advancedFilters"
            :filters-data="gridState.advancedFiltersData"
            :filters="gridState.advancedFilters"
            :namespace="namespace"
            :path="routeEdit.getData"
            :disabled="isFilterExists"
            @focus="onAdvancedFilterFocus" />
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
            <GridSelectRowColumn
                v-if="selectRowColumn"
                :row-ids="gridState.rowIds"
                :rows-offset="rowsOffset"
                :row-height="rowHeight"
                :is-selected-all-rows="isSelectedAllRows"
                :selected-rows="selectedRows"
                :basic-filters="basicFilters"
                :current-page="gridState.currentPage"
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
            </GridSelectRowColumn>
            <GridColumn
                v-for="(column, colIndex) in gridState.columns"
                :key="column.id"
                :namespace="namespace"
                :index="colIndex + columnsOffset"
                :column="column"
                :column-offset="columnsOffset"
                :row-height="rowHeight"
                :is-header-focused="isHeaderFocused"
                :is-mouse-over-grid="isMouseOverGrid"
                @mouseOverGrid="onMouseOverGrid">
                <GridWrapperHeaderCell
                    :namespace="namespace"
                    :column-index="colIndex + columnsOffset"
                    :column="column"
                    :path="routeEdit.getData"
                    @focus="onHeaderFocus" />
                <GridWrapperHeaderActionCell
                    v-if="basicFilters"
                    :namespace="namespace"
                    :column-index="colIndex + columnsOffset"
                    :column="column"
                    :filter="gridState.filters[column.id]"
                    :path="routeEdit.getData" />
                <slot
                    v-for="(id, rowIndex) in gridState.rowIds"
                    name="cell"
                    :column="column"
                    :row-id="id"
                    :row-index="(rowIndex + rowsOffset) * gridState.currentPage"
                    :column-index="colIndex + columnsOffset"
                    :cell-data="gridState.cellValues[id][column.id]">
                    <GridWrapperCell
                        :key="id"
                        :namespace="namespace"
                        :column-index="colIndex + columnsOffset"
                        :row-index="(rowIndex + rowsOffset) * gridState.currentPage"
                        :row-id="id"
                        :cell-data="gridState.cellValues[id][column.id] || { value: ''}"
                        :column="column"
                        :draft="drafts[id]"
                        :edit-routing-path="routeEdit.name"
                        :is-selected="isSelectedAllRows
                            || selectedRows[(rowIndex + rowsOffset) * gridState.currentPage]"
                        :editing-privilege-allowed="editingPrivilegeAllowed" />
                </slot>
            </GridColumn>
            <GridExtenderColumn
                v-if="extenderColumn"
                :is-selected-all-rows="isSelectedAllRows"
                :selected-rows="selectedRows"
                :row-height="rowHeight"
                :current-page="gridState.currentPage"
                :rows-number="gridState.rowIds.length + rowsOffset"
                :column-index="extenderColumnIndex" />
            <GridEditColumn
                v-if="editColumn"
                :is-selected-all-rows="isSelectedAllRows"
                :selected-rows="selectedRows"
                :current-page="gridState.currentPage"
                :row-height="rowHeight"
                :column-index="editColumnIndex"
                :row-links="gridState.rowLinks"
                :route-path="routeEdit.name"
                @rowEdit="onRowEdit" />
        </div>
        <GridPlaceholder v-if="isPlaceholder" />
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { sumIntegers } from '~/model/arrayWrapper';
import {
    PINNED_COLUMN_STATE,
    ROW_HEIGHT,
    GRID_LAYOUT,
    GHOST_ELEMENT_MODEL,
    GHOST_ID,
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
        GridAdvancedFilters: () => import('~/components/Grid/AdvancedFilters/GridAdvancedFilters'),
        GridHeader: () => import('~/components/Grid/GridHeader'),
        GridColumn: () => import('~/components/Grid/Columns/GridColumn'),
        GridExtenderColumn: () => import('~/components/Grid/Columns/GridExtenderColumn'),
        GridEditColumn: () => import('~/components/Grid/Columns/GridEditColumn'),
        GridWrapperCell: () => import('~/components/Grid/Wrappers/GridWrapperCell'),
        GridWrapperHeaderActionCell: () => import('~/components/Grid/Wrappers/GridWrapperHeaderActionCell'),
        GridWrapperHeaderCell: () => import('~/components/Grid/Wrappers/GridWrapperHeaderCell'),
        GridPlaceholder: () => import('~/components/Grid/GridPlaceholder'),
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
        routeEdit: {
            type: Object,
            required: true,
        },
        editingPrivilegeAllowed: {
            type: Boolean,
            default: true,
        },
        advancedFilters: {
            type: Boolean,
            default: false,
        },
        basicFilters: {
            type: Boolean,
            default: false,
        },
        extenderColumn: {
            type: Boolean,
            default: true,
        },
        editColumn: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            isHeaderFocused: false,
            isMouseOverGrid: false,
            isAdvancedFilterFocused: false,
            rowHeight: ROW_HEIGHT.LARGE,
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
        editColumnIndex() {
            let index = this.gridState.columns.length;

            if (this.selectRowColumn || this.extenderColumn) index += 1;

            return index;
        },
        extenderColumnIndex() {
            let index = this.gridState.columns.length;

            if (this.selectRowColumn) index += 1;

            return index;
        },
        numberOfPages() {
            return this.$store.getters[`${this.namespace}/numberOfPages`];
        },
        columnsOffset() {
            return this.selectRowColumn ? 1 : 0;
        },
        rowsOffset() {
            return this.basicFilters ? 2 : 1;
        },
        templateColumns() {
            const rightWidths = [];
            const leftWidths = [];

            if (this.selectRowColumn) leftWidths.push(COLUMN_WIDTH.ACTION);
            if (this.extenderColumn) rightWidths.push(COLUMN_WIDTH.AUTO);
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
                this.$store.dispatch(`${this.namespace}/setEditingCellCoordinates`, {});
            }
        },
        onAdvancedFilterFocus(isFocused) {
            this.isAdvancedFilterFocused = isFocused;
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
        onStickyChange({
            sticky, columnId, state,
        }) {
            const columnIndex = this.gridState.columns.findIndex((col) => col.id === columnId);
            const { gridContent: { children: columnEls } } = this.$refs;
            const columnEl = columnEls[columnIndex];

            if (sticky) {
                if (state === PINNED_COLUMN_STATE.RIGHT) {
                    columnEl.style.right = `${sumIntegers(this.rightPinnedColumns)}px`;
                    this.rightPinnedColumns.push(columnEl.offsetWidth);
                    columnEl.classList.add('drop-shadow-right-pinned');
                } else {
                    columnEl.style.left = `${sumIntegers(this.leftPinnedColumns)}px`;
                    this.leftPinnedColumns.push(columnEl.offsetWidth);
                    columnEl.classList.add('drop-shadow-left-pinned');
                }
                columnEl.classList.add('sticky');
            } else {
                if (state === PINNED_COLUMN_STATE.RIGHT) {
                    const indexToRemove = this.rightPinnedColumns.length - 1;

                    columnEl.classList.remove('drop-shadow-right-pinned');
                    this.rightPinnedColumns.splice(indexToRemove, 1);
                    columnEl.style.right = null;
                } else {
                    const indexToRemove = this.leftPinnedColumns.length - 1;

                    columnEl.classList.remove('drop-shadow-left-pinned');
                    this.leftPinnedColumns.splice(indexToRemove, 1);
                    columnEl.style.left = null;
                }
                columnEl.classList.remove('sticky');
            }
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
        border-bottom: none;
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
                z-index: -1;
                width: 100%;
                height: 100%;
                content: "";
            }
        }
    }
</style>
