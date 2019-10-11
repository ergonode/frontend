/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="['grid', {'grid--placeholder': isPlaceholder}]">
        <GridAdvancedFilters
            v-if="advancedFilters"
            :filters="gridState.advancedFilters"
            :store-namespace="storeNamespace" />
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
            <GridColumn
                v-for="(column, colIndex) in gridState.columns"
                :key="column.id"
                :store-namespace="storeNamespace"
                :index="colIndex"
                :column="column"
                :is-last="gridState.columns.length - 1 === colIndex"
                :rows-height="rowHeight"
                :is-header-focused="isHeaderFocused"
                :is-mouse-over-grid="isMouseOverGrid"
                @mouseovergrid="onMouseOverGrid">
                <GridWrapperHeaderCell
                    :store-namespace="storeNamespace"
                    :column-index="colIndex"
                    :column="column"
                    :path="actionPaths.getData"
                    @focus="onHeaderFocus" />
                <GridWrapperHeaderActionCell
                    v-if="basicFilters"
                    :store-namespace="storeNamespace"
                    :column-index="colIndex"
                    :column="column"
                    :path="actionPaths.getData" />
                <slot
                    name="cell"
                    :column="column"
                    :column-index="colIndex">
                    <GridWrapperCell
                        v-for="(id, rowIndex) in gridState.rowIds"
                        :key="`row[${rowIndex + fixedRowOffset}, ${column.id}]`"
                        :store-namespace="storeNamespace"
                        :column-index="colIndex"
                        :row-index="(rowIndex + fixedRowOffset) * gridState.displayedPage"
                        :row-id="id"
                        :cell-data="gridState.cellValues[id][column.id] || { value: ''}"
                        :column="column"
                        :draft="drafts[id]"
                        :edit-routing-path="actionPaths.routerEdit"
                        :is-selected="gridState.isSelectedAllRows
                            || gridState.selectedRows[(rowIndex + fixedRowOffset)
                                * gridState.displayedPage]"
                        :editing-privilege-allowed="editingPrivilegeAllowed" />
                </slot>
            </GridColumn>
            <template v-for="(column, index) in gridState.pinnedColumns">
                <GridColumnSentinel
                    :key="index"
                    :style="{gridColumn: column.position}"
                    :index="gridState.columns.length + index"
                    :column="column"
                    @sticky="onStickyChange" />
            </template>
        </div>
        <GridPlaceholder v-if="isPlaceholder" />
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { sumIntegers } from '~/model/arrayWrapper';
import {
    PINNED_COLUMN_STATE, ROW_HEIGHTS, GRID_LAYOUT, GHOST_ELEMENT_MODEL, GHOST_ID,
} from '~/defaults/grid/main';
import {
    isMouseOutOfBoundsElement,
} from '~/model/drag_and_drop/helpers';

export default {
    name: 'Grid',
    components: {
        GridAdvancedFilters: () => import('~/components/Grid/AdvancedFilters/GridAdvancedFilters'),
        GridHeader: () => import('~/components/Grid/GridHeader'),
        GridColumn: () => import('~/components/Grid/GridColumn'),
        GridColumnSentinel: () => import('~/components/Grid/GridColumnSentinel'),
        GridWrapperCell: () => import('~/components/Grid/Wrappers/GridWrapperCell'),
        GridWrapperHeaderActionCell: () => import('~/components/Grid/Wrappers/GridWrapperHeaderActionCell'),
        GridWrapperHeaderCell: () => import('~/components/Grid/Wrappers/GridWrapperHeaderCell'),
        GridPlaceholder: () => import('~/components/Grid/GridPlaceholder'),
    },
    props: {
        storeNamespace: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        editingPrivilegeAllowed: {
            type: Boolean,
            default: true,
        },
        actionPaths: {
            type: Object,
            required: true,
        },
        advancedFilters: {
            type: Boolean,
            default: false,
        },
        basicFilters: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isHeaderFocused: false,
            rowHeight: ROW_HEIGHTS.LARGE,
            layout: GRID_LAYOUT.TABLE,
            isMouseOverGrid: false,
        };
    },
    beforeCreate() {
        this.fixedRowOffset = this.$options.propsData.basicFilters ? 2 : 1;
        this.rightPinnedColumns = [];
        this.leftPinnedColumns = [];
    },
    beforeDestroy() {
        delete this.rightPinnedColumns;
        delete this.leftPinnedColumns;
        delete this.fixedRowOffset;
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
        }),
        ...mapState('gridDraft', {
            drafts: (state) => state.drafts,
        }),
        gridState() {
            return this.$store.state[this.storeNamespace];
        },
        numberOfPages() {
            return this.$store.getters[`${this.storeNamespace}/numberOfPages`];
        },
        templateColumns() {
            return {
                gridTemplateColumns: this.gridState.columnWidths.join(' '),
            };
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
            const width = 100;
            const ghostIndex = 1;

            this.$store.dispatch(`${this.storeNamespace}/insertColumnAtIndex`, { column: GHOST_ELEMENT_MODEL, index: ghostIndex });
            this.$store.dispatch(`${this.storeNamespace}/insertColumnWidthAtIndex`, { width: `${width}px`, index: ghostIndex });

            this.setGhostIndex(ghostIndex);
            this.setDraggedElIndex(ghostIndex);
        },
        removeGhostColumn() {
            this.$store.dispatch(`${this.storeNamespace}/removeColumnAtIndex`, this.draggedElIndex);
            this.$store.dispatch(`${this.storeNamespace}/removeColumnWidthAtIndex`, this.draggedElIndex);

            this.setDraggedElIndex();
            this.setGhostIndex();
        },
        addGhostFilter() {
            const ghostIndex = 0;

            this.$store.dispatch(`${this.storeNamespace}/insertAdvancedFilterAtIndex`, {
                index: ghostIndex,
                filter: GHOST_ELEMENT_MODEL,
            });
            this.setGhostFilterIndex(ghostIndex);
        },
        removeGhostFilter() {
            if (this.ghostFilterIndex !== -1
                && this.gridState.advancedFilters[this.ghostFilterIndex].id === GHOST_ID) {
                this.$store.dispatch(`${this.storeNamespace}/removeAdvancedFilterAtIndex`, this.ghostFilterIndex);
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

        &__content {
            display: grid;
            border-left: 1px solid $grey;
            border-right: 1px solid $grey;
            background-color: $background;
            overflow: auto;
        }
    }
</style>
