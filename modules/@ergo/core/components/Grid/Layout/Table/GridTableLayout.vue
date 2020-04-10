/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :style="templateColumns"
        :class="[
            'grid-table-layout',
            { 'grid-table-layout--disabled': isColumnExists },
        ]"
        ref="gridTemplateLayout">
        <Component
            v-for="(column, index) in orderedColumns"
            :style="templateRows"
            :key="column.id"
            :is="columnComponents[index]"
            :data="data[column.id]"
            :sorted-column="sortedColumn"
            :column="column"
            :column-index="index"
            :row-ids="data.id"
            :rows-offset="rowsOffset"
            :filter="filters[column.id]"
            :is-basic-filter="isBasicFilter"
            :is-editable="isEditable"
            @sort="onSortColumn"
            @filter="onFilterChange"
            @remove="onRemoveColumn"
            @swapColumns="onSwapColumns"
            @updateWidth="onUpdateWidth"
            @drop="onDrop"
            @editCell="onEditCell"
            @copyCells="onCopyCells"
            @editRow="onEditRow"
            @removeRow="onRemoveRow" />
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import {
    PINNED_COLUMN_STATE,
    COLUMN_WIDTH,
    GHOST_ID,
    COLUMN_SELECT_ROW,
    COLUMN_ACTIONS,
    COLUMN_GHOST,
    ROW_HEIGHT,
} from '@Core/defaults/grid';
import { capitalizeAndConcatenationArray } from '@Core/models/stringWrapper';
import { swapItemPosition, insertValueAtIndex } from '@Core/models/arrayWrapper';
import { insertCookieAtIndex, changeCookiePosition, removeCookieAtIndex } from '@Core/models/cookies';

export default {
    name: 'GridTableLayout',
    components: {
        GridSentinelColumn: () => import('@Core/components/Grid/Columns/GridSentinelColumn'),
    },
    props: {
        columns: {
            type: Array,
            default: () => [],
        },
        data: {
            type: Object,
            default: () => ({}),
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
        isBasicFilter: {
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
            isHeaderFocused: false,
            isSelectColumnPinned: false,
            isActionColumnPinned: false,
            isColumnDropped: false,
            hasInitialWidths: true,
            editingCellCoordinates: { row: null, column: null },
            orderedColumns: [],
            columnComponents: [],
            columnWidths: [],
            filters: {},
            sortedColumn: {},
        };
    },
    computed: {
        ...mapState('grid', {
            drafts: state => state.drafts,
        }),
        ...mapState('draggable', {
            isListElementDragging: state => state.isListElementDragging,
            ghostIndex: state => state.ghostIndex,
            ghostFilterIndex: state => state.ghostFilterIndex,
            draggedElIndex: state => state.draggedElIndex,
            draggedElement: state => state.draggedElement,
        }),
        dataCount() {
            const keys = Object.keys(this.data);

            if (!keys.length) {
                return 0;
            }

            return this.data[keys[0]].length;
        },
        rowsOffset() {
            return (this.currentPage - 1) * this.maxRows;
        },
        templateColumns() {
            return {
                gridTemplateColumns: this.columnWidths.join(' '),
            };
        },
        isColumnExists() {
            const draggedElIndex = this.orderedColumns.findIndex(
                column => column.id === this.draggedElement,
            );

            return draggedElIndex !== -1;
        },
        templateRows() {
            const headerRowsTemplate = this.isBasicFilter ? `${ROW_HEIGHT.MEDIUM}px ${ROW_HEIGHT.MEDIUM}px` : `${ROW_HEIGHT.MEDIUM}px`;

            if (this.dataCount) {
                return {
                    gridTemplateRows: `${headerRowsTemplate} repeat(${this.dataCount}, ${this.rowHeight}px)`,
                };
            }

            return {
                gridTemplateRows: headerRowsTemplate,
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
        columns() {
            const droppedColumn = this.columns
                .find(column => this.orderedColumns
                    .filter(orderedColumn => orderedColumn.id === column.id).length === 0);

            if (droppedColumn) {
                const ghostIndex = this.orderedColumns
                    .findIndex(orderedColumn => orderedColumn.id === GHOST_ID);

                this.columnComponents[ghostIndex] = () => import(`@Core/components/Grid/Layout/Table/Columns/Grid${capitalizeAndConcatenationArray(droppedColumn.type.split('_'))}Column`);
                this.orderedColumns[ghostIndex] = droppedColumn;
            }
        },
    },
    created() {
        const orderedColumns = [];
        const columnComponents = [];
        const columnWidths = [];
        const extendedComponents = this.$getExtendedComponents('GRID');
        const isColumnExtended = typeof extendedComponents !== 'undefined'
            && typeof extendedComponents.layout !== 'undefined'
            && typeof extendedComponents.layout.table !== 'undefined'
            && typeof extendedComponents.layout.table.columns !== 'undefined';

        if (this.isSelectColumn) {
            orderedColumns.push(COLUMN_SELECT_ROW);
            columnComponents.push(
                () => import('@Core/components/Grid/Layout/Table/Columns/GridSelectRowColumn'),
            );
            columnWidths.push(COLUMN_WIDTH.SELECT_ROW);
        }

        const { length } = this.columns;

        for (let i = 0; i < length; i += 1) {
            orderedColumns.push(this.columns[i]);
            const extendedColumn = isColumnExtended
                ? extendedComponents.layout.table.columns.find(
                    column => column.type === this.columns[i].type,
                )
                : null;

            if (extendedColumn) {
                columnComponents.push(extendedColumn.component);
                columnWidths.push(extendedColumn.width);
            } else {
                columnComponents.push(
                    () => import(`@Core/components/Grid/Layout/Table/Columns/Grid${capitalizeAndConcatenationArray(this.columns[i].type.split('_'))}Column`),
                );
                columnWidths.push(COLUMN_WIDTH.DEFAULT);
            }
        }

        if (this.isActionColumn) {
            orderedColumns.push(COLUMN_ACTIONS);
            columnComponents.push(
                () => import('@Core/components/Grid/Layout/Table/Columns/GridActionColumn'),
            );
            columnWidths.push(COLUMN_WIDTH.ACTION);
        }

        this.orderedColumns = orderedColumns;
        this.columnComponents = columnComponents;
        this.columnWidths = columnWidths;
    },
    mounted() {
        const config = this.$cookies.get(`GRID_CONFIG:${this.$route.name}`);

        if (!config) {
            this.$cookies.set(
                `GRID_CONFIG:${this.$route.name}`,
                this.columns
                    .map(({ id }) => id)
                    .join(','),
            );
        }
        window.addEventListener('click', this.onClickOutside);
    },
    beforeDestroy() {
        window.removeEventListener('click', this.onClickOutside);
    },
    methods: {
        ...mapActions('list', [
            'setDisabledElement',
        ]),
        ...mapActions('draggable', [
            'setDraggableState',
            'setDraggedElement',
            'setDraggedElIndex',
            'setGhostElXTranslation',
            'setGhostIndex',
        ]),
        ...mapActions('grid', [
            'setDraftValue',
            'setDraftsValues',
        ]),
        onHeaderFocus(isFocused) {
            this.isHeaderFocused = isFocused;
        },
        onSortColumn(sortedColumn) {
            this.sortedColumn = sortedColumn;
            this.$emit('sort', sortedColumn);
        },
        onFilterChange({ index, value, operator }) {
            const { id } = this.orderedColumns[index];

            if (this.filters[id] && (value === '' || value === null || value.length === 0)) {
                delete this.filters[id];
            } else {
                this.filters[id] = { value, operator };
            }
            this.$emit('filter', this.filters);
        },
        onRemoveColumn(index) {
            if (this.orderedColumns[index].element_id) {
                const { language: languageCode, element_id } = this.orderedColumns[index];

                this.setDisabledElement({
                    languageCode,
                    elementId: element_id,
                    disabled: false,
                });
            }

            this.columnComponents.splice(index, 1);
            this.orderedColumns.splice(index, 1);
            this.columnWidths.splice(index, 1);
            removeCookieAtIndex({
                cookies: this.$cookies,
                cookieName: `GRID_CONFIG:${this.$route.name}`,
                index: this.isSelectColumn ? index - 1 : index,
            });
        },
        onSwapColumns({ from, to }) {
            this.columnComponents = [
                ...swapItemPosition(
                    this.columnComponents,
                    from,
                    to,
                ),
            ];
            this.columnWidths = [
                ...swapItemPosition(
                    this.columnWidths,
                    from,
                    to,
                ),
            ];
            this.orderedColumns = [
                ...swapItemPosition(
                    this.orderedColumns,
                    from,
                    to,
                ),
            ];
            changeCookiePosition({
                cookies: this.$cookies,
                cookieName: `GRID_CONFIG:${this.$route.name}`,
                from: this.isSelectColumn ? from - 1 : from,
                to: this.isSelectColumn ? to - 1 : to,
            });
        },
        onUpdateWidth({ index, width }) {
            if (this.hasInitialWidths) {
                this.initialColumnWidths();
            }

            this.columnWidths[index] = width;
            this.columnWidths = [...this.columnWidths];
        },
        setEditingCellCoordinates(coordinates = { row: null, column: null }) {
            this.editingCellCoordinates = coordinates;
        },
        getEditingCellCoordinates() {
            return this.editingCellCoordinates;
        },
        onClickOutside({ pageX, pageY, target }) {
            const { gridTemplateLayout } = this.$refs;
            const {
                top, left, width, height,
            } = gridTemplateLayout.getBoundingClientRect();

            if (!(pageX > left
                && pageX < left + width
                && pageY > top
                && pageY < top + height)
                && !gridTemplateLayout.contains(target)) {
                this.setEditingCellCoordinates();
            }
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
        onDrop({ from, to, columnId }) {
            this.isColumnDropped = true;
            this.onSwapColumns({ from, to });
            this.removeColumnsTransform();
            insertCookieAtIndex({
                cookies: this.$cookies,
                cookieName: `GRID_CONFIG:${this.$route.name}`,
                index: this.isSelectColumn ? to - 1 : to,
                data: columnId,
            });

            this.$emit('dropColumn', columnId);
        },
        onEditCell(payload) {
            this.setDraftValue(payload);
            this.$emit('editCell', payload);
        },
        onCopyCells({
            from, to, rowId, columnId, value,
        }) {
            const rowIndex = this.data.id.findIndex(id => id === rowId);
            const offset = from.row - rowIndex;
            const drafts = {};
            const editedCells = [];

            if (from.row < to.row) {
                for (let i = from.row - offset; i <= to.row - offset; i += 1) {
                    drafts[this.data.id[i]] = { [columnId]: value };
                    editedCells.push({
                        rowId: this.data.id[i],
                        columnId,
                        value,
                    });
                }
            } else {
                for (let i = to.row - offset; i <= from.row - offset; i += 1) {
                    drafts[this.data.id[i]] = { [columnId]: value };
                    editedCells.push({
                        rowId: this.data.id[i],
                        columnId,
                        value,
                    });
                }
            }

            this.setDraftsValues(drafts);
            this.$emit('editCells', editedCells);
        },
        onEditRow(args) {
            this.$emit('editRow', args);
        },
        onRemoveRow(index) {
            this.$emit('removeRow', index);
        },
        addGhostColumn() {
            if (!this.isColumnExists) {
                const ghostIndex = this.isSelectColumn ? 1 : 0;

                this.columnComponents = insertValueAtIndex(
                    this.columnComponents,
                    () => import('@Core/components/Grid/Layout/Table/Columns/GridGhostColumn'),
                    ghostIndex,
                );
                this.orderedColumns = insertValueAtIndex(
                    this.orderedColumns,
                    COLUMN_GHOST,
                    ghostIndex,
                );
                this.columnWidths = insertValueAtIndex(
                    this.columnWidths,
                    COLUMN_WIDTH.GHOST,
                    ghostIndex,
                );

                this.setGhostIndex(ghostIndex);
                this.setDraggedElIndex(ghostIndex);
            }
        },
        removeGhostColumn() {
            if (!this.isColumnDropped) {
                if (this.ghostIndex > -1) {
                    this.columnComponents.splice(this.draggedElIndex, 1);
                    this.orderedColumns.splice(this.draggedElIndex, 1);
                    this.columnWidths.splice(this.draggedElIndex, 1);
                    this.removeColumnsTransform();
                }

                this.setDraggedElIndex();
                this.setGhostIndex();
            }

            this.isColumnDropped = false;
        },
        initialColumnWidths() {
            const { gridTemplateLayout } = this.$refs;
            const { length } = gridTemplateLayout.children;

            for (let i = 0; i < length; i += 1) {
                const { width } = gridTemplateLayout.children[i].getBoundingClientRect();

                this.columnWidths[i] = `${width}px`;
            }

            this.hasInitialWidths = false;
        },
        removeColumnsTransform() {
            const { gridTemplateLayout } = this.$refs;
            const { length } = gridTemplateLayout.children;

            for (let i = 0; i < length; i += 1) {
                gridTemplateLayout.children[i].style.transform = null;
            }
        },
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
    .grid-table-layout {
        position: relative;
        display: grid;
        overflow: auto;

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
