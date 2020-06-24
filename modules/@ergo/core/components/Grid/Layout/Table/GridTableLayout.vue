/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="grid-table-layout"
        ref="gridTableLayout">
        <GridTableLayoutPinnedSection
            v-if="isSelectColumn"
            :is-pinned="pinnedSections[pinnedState.LEFT]">
            <GridSelectRowColumn
                :style="templateRows"
                :column-index="0"
                :data-count="dataCount"
                :rows-offset="rowsOffset"
                :is-basic-filter="isBasicFilter"
                @rowSelect="onRowSelect"
                @rowsSelect="onRowsSelect" />
        </GridTableLayoutPinnedSection>
        <GridTableLayoutColumnsSection
            :style="templateColumns"
            ref="columnsSection">
            <GridSentinelColumn
                v-if="isSelectColumn"
                :pinned-state="pinnedState.LEFT"
                @sticky="onStickyChange" />
            <Component
                v-for="(column, index) in orderedColumns"
                :style="templateRows"
                :key="column.id"
                :is="columnComponents[index]"
                :data="data[column.id]"
                :sorted-column="sortedColumn"
                :column="column"
                :column-index="index + columnsOffset"
                :row-ids="data.id"
                :rows-offset="rowsOffset"
                :filter="filters[column.id]"
                :selected-rows="selectedRows"
                :is-selected-all-rows="isSelectedAllRows"
                :is-basic-filter="isBasicFilter"
                :is-editable="isEditable"
                @sort="onSortColumn"
                @filter="onFilterChange"
                @remove="onRemoveColumn"
                @swapColumns="onSwapColumns"
                @updateWidth="onUpdateWidth"
                @editCell="onEditCell"
                @copyCells="onCopyCells" />
            <GridSentinelColumn
                v-if="typeof data[columnActionId] !== 'undefined'"
                :style="{ gridColumn: `${orderedColumns.length}`}"
                :pinned-state="pinnedState.RIGHT"
                @sticky="onStickyChange" />
        </GridTableLayoutColumnsSection>
        <GridTableLayoutPinnedSection
            v-if="typeof data[columnActionId] !== 'undefined'"
            :is-pinned="pinnedSections[pinnedState.RIGHT]">
            <Component
                v-for="(column, index) in actionColumnComponents"
                :style="templateRows"
                :key="column.key"
                :data="data[columnActionId][column.key]"
                :column-index="orderedColumns.length + index + columnsOffset"
                :column-id="column.key"
                :data-count="dataCount"
                :rows-offset="rowsOffset"
                :index="index"
                :is-basic-filter="isBasicFilter"
                :is="column.component"
                @action="onActionRow" />
        </GridTableLayoutPinnedSection>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import {
    PINNED_COLUMN_STATE,
    COLUMN_WIDTH,
    COLUMN_ACTIONS_ID,
    ROW_HEIGHT,
    GRID_ACTIONS,
} from '@Core/defaults/grid';
import {
    capitalizeAndConcatenationArray,
    toCapitalize,
} from '@Core/models/stringWrapper';
import {
    swapItemPosition,
} from '@Core/models/arrayWrapper';
import {
    changeCookiePosition,
    removeCookieAtIndex,
} from '@Core/models/cookies';
import GridTableLayoutColumnsSection from '@Core/components/Grid/Layout/Table/Sections/GridTableLayoutColumnsSection';
import GridDropZone from '@Core/components/Grid/GridDropZone';

export default {
    name: 'GridTableLayout',
    components: {
        GridDropZone,
        GridTableLayoutColumnsSection,
        GridTableLayoutPinnedSection: () => import('@Core/components/Grid/Layout/Table/Sections/GridTableLayoutPinnedSection'),
        GridSentinelColumn: () => import('@Core/components/Grid/Layout/Table/Columns/GridSentinelColumn'),
        GridSelectRowColumn: () => import('@Core/components/Grid/Layout/Table/Columns/GridSelectRowColumn'),
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
    },
    data() {
        return {
            isHeaderFocused: false,
            hasInitialWidths: true,
            isSelectedAllRows: false,
            selectedRows: {},
            editingCellCoordinates: { row: null, column: null },
            focusedCellCoordinates: { row: null, column: null },
            orderedColumns: [],
            columnComponents: [],
            columnWidths: [],
            filters: {},
            sortedColumn: {},
            pinnedSections: {},
        };
    },
    computed: {
        ...mapState('grid', {
            drafts: state => state.drafts,
        }),
        ...mapState('draggable', {
            ghostIndex: state => state.ghostIndex,
            draggedElIndex: state => state.draggedElIndex,
            draggedElement: state => state.draggedElement,
        }),
        columnActionId() {
            return COLUMN_ACTIONS_ID;
        },
        actionColumnComponents() {
            return GRID_ACTIONS.reduce((prev, acc) => {
                const tmp = prev;

                if (this.data[COLUMN_ACTIONS_ID][acc]) {
                    tmp.push({
                        key: acc,
                        component: () => import(`@Core/components/Grid/Layout/Table/Columns/Action/Grid${toCapitalize(acc)}ActionColumn`),
                    });
                }

                return tmp;
            }, []);
        },
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
        columnsOffset() {
            return this.isSelectColumn ? 1 : 0;
        },
        templateColumns() {
            return {
                gridTemplateColumns: this.columnWidths.join(' '),
            };
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
        pinnedState() {
            return PINNED_COLUMN_STATE;
        },
    },
    watch: {
        columns: {
            immediate: true,
            handler() {
                if (this.orderedColumns.length !== this.columns.length) {
                    // Columns might be lazy loaded - we need to handle that
                    this.initializeDataColumns();
                }
            },
        },
    },
    mounted() {
        window.addEventListener('click', this.onClickOutside);
    },
    beforeDestroy() {
        window.removeEventListener('click', this.onClickOutside);
    },
    methods: {
        ...mapActions('list', [
            'setDisabledElement',
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
        setFocusedCellCoordinates(coordinates = { row: null, column: null }) {
            const { row, column } = coordinates;

            if (row !== null && column !== null) {
                this.$emit('focusCell', {
                    column: this.orderedColumns[column],
                    rowId: this.data.id[row - 2],
                });
            }
            this.focusedCellCoordinates = coordinates;
        },
        getEditingCellCoordinates() {
            return this.editingCellCoordinates;
        },
        getTableLayoutElement() {
            return this.$refs.gridTableLayout;
        },
        onClickOutside({ pageX, pageY, target }) {
            const { gridTableLayout } = this.$refs;
            const {
                top, left, width, height,
            } = gridTableLayout.getBoundingClientRect();

            if (!(pageX > left
                && pageX < left + width
                && pageY > top
                && pageY < top + height)
                && !gridTableLayout.contains(target)) {
                this.setEditingCellCoordinates();
            }
        },
        onStickyChange({
            isSticky, state,
        }) {
            this.pinnedSections = { ...this.pinnedSections, [state]: isSticky };
        },
        onRowSelect(selectedRows) {
            this.selectedRows = selectedRows;

            this.$emit('rowSelect', this.selectedRows);
        },
        onRowsSelect(isSelectedAllRows) {
            this.isSelectedAllRows = isSelectedAllRows;

            this.$emit('rowsSelect', this.isSelectedAllRows);
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
                    if (this.data[columnId][i] && this.data[columnId][i].value !== value) {
                        drafts[this.data.id[i]] = { [columnId]: value };
                        editedCells.push({
                            rowId: this.data.id[i],
                            columnId,
                            value,
                        });
                    }
                }
            } else {
                for (let i = to.row - offset; i <= from.row - offset; i += 1) {
                    if (this.data[columnId][i] && this.data[columnId][i].value !== value) {
                        drafts[this.data.id[i]] = { [columnId]: value };
                        editedCells.push({
                            rowId: this.data.id[i],
                            columnId,
                            value,
                        });
                    }
                }
            }

            this.setDraftsValues(drafts);
            this.$emit('editCells', editedCells);
        },
        onActionRow({ action, value }) {
            this.$emit(action, value);
        },
        initializeDataColumns() {
            const config = this.$cookies.get(`GRID_CONFIG:${this.$route.name}`);

            if (!config) {
                this.$cookies.set(
                    `GRID_CONFIG:${this.$route.name}`,
                    this.columns
                        .map(({ id }) => id)
                        .join(','),
                );
            }

            const orderedColumns = [];
            const columnComponents = [];
            const columnWidths = [];
            const { length } = this.columns;
            const extendedComponents = this.$getExtendedComponents('GRID');
            const isColumnExtended = typeof extendedComponents !== 'undefined'
                && typeof extendedComponents.layout !== 'undefined'
                && typeof extendedComponents.layout.table !== 'undefined'
                && typeof extendedComponents.layout.table.columns !== 'undefined';

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

            this.orderedColumns = orderedColumns;
            this.columnComponents = columnComponents;
            this.columnWidths = columnWidths;
        },
        initialColumnWidths() {
            const { columnsSection } = this.$refs;
            const { length } = columnsSection.$el.children;

            for (let i = 0; i < length; i += 1) {
                const { width } = columnsSection.$el.children[i].getBoundingClientRect();

                this.columnWidths[i] = `${width}px`;
            }

            this.hasInitialWidths = false;
        },
    },
    provide() {
        return {
            setEditingCellCoordinates: this.setEditingCellCoordinates,
            setFocusedCellCoordinates: this.setFocusedCellCoordinates,
            getEditingCellCoordinates: this.getEditingCellCoordinates,
            getTableLayoutElement: this.getTableLayoutElement,
        };
    },
};
</script>

<style lang="scss" scoped>
    .grid-table-layout {
        position: relative;
        display: flex;
        overflow: auto;
    }
</style>
