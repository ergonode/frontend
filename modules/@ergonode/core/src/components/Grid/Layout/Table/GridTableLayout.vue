/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="grid-table-layout"
        ref="gridTableLayout"
        @focusin="onFocusInside"
        @focusout="onFocusOut">
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
            <template v-for="(column, columnIndex) in orderedColumns">
                <Component
                    v-if="extendedColumns[column.id]"
                    :is="extendedColumns[column.id]"
                    :style="templateRows"
                    :key="column.id"
                    :index="columnIndex"
                    :column="column"
                    :rows="rows"
                    :row-ids="rowIds"
                    :drafts="drafts"
                    :rows-offset="rowsOffset"
                    :is-basic-filter="isBasicFilter"
                    @remove="onRemoveColumn"
                    @swap="onSwapColumns"
                    @resize="onResizeColumn"
                    @sort="onSortColumn"
                    @editFilterCell="onEditFilterCell"
                    @filterValue="onFilterValueChange"
                    @cellValue="onCellValueChange"
                    @editCell="onEditCell"
                />
                <GridDraggableColumn
                    v-else
                    :style="templateRows"
                    :index="columnIndex + columnsOffset"
                    :column="column"
                    :key="column.id"
                    @remove="onRemoveColumn"
                    @swap="onSwapColumns">
                    <GridColumn
                        :index="columnIndex + columnsOffset"
                        @resize="onResizeColumn">
                        <GridHeaderCell
                            :row-index="rowsOffset"
                            :column-index="columnIndex + columnsOffset"
                            :column-id="column.id"
                            :label="column.label"
                            :deletable="column.deletable"
                            :sorted-column="sortedColumn"
                            @sort="onSortColumn"
                            @remove="onRemoveColumn" />
                        <template v-if="isBasicFilter">
                            <GridFilterDataCell
                                :row-index="rowsOffset + basicFiltersOffset"
                                :value="filterValues[column.id]"
                                :column-index="columnIndex + columnsOffset"
                                :language-code="column.language"
                                :column-id="column.id"
                                :filter="column.filter"
                                @editFilterCell="onEditFilterCell"
                                @filterValue="onFilterValueChange" />
                        </template>
                        <GridDataCell
                            v-for="(row, rowIndex) in rows"
                            :key="`${rowIds[rowIndex]}|${column.id}`"
                            :data="row[column.id]"
                            :draft="drafts[`${rowIds[rowIndex]}/${column.id}`]"
                            :column="column"
                            :type="columnTypes[column.type]"
                            :error-messages="validationErrors[`${rowIds[rowIndex]}/${column.id}`]"
                            :row-id="rowIds[rowIndex]"
                            :column-index="columnIndex + columnsOffset"
                            :row-index="rowsOffset + rowIndex + basicFiltersOffset + 1"
                            :is-locked="!(column.editable && isEditable)"
                            :is-copyable="column.editable && isEditable"
                            :is-selected="isSelectedAllRows
                                || selectedRows[rowsOffset + rowIndex + basicFiltersOffset + 1]"
                            @cellValue="onCellValueChange"
                            @editCell="onEditCell" />
                    </GridColumn>
                </GridDraggableColumn>
            </template>
            <GridSentinelColumn
                v-if="actionColumns.length"
                :style="{ gridColumn: `${orderedColumns.length}`}"
                :pinned-state="pinnedState.RIGHT"
                @sticky="onStickyChange" />
        </GridTableLayoutColumnsSection>
        <GridTableLayoutPinnedSection
            v-if="actionColumns.length"
            :is-pinned="pinnedSections[pinnedState.RIGHT]">
            <GridActionColumn
                v-for="(column, columnIndex) in actionColumns"
                :style="templateRows"
                :key="column.id">
                <GridTableCell
                    :row="rowsOffset"
                    :column="orderedColumns.length + columnIndex + columnsOffset"
                    :locked="true" />
                <GridTableCell
                    v-if="isBasicFilter"
                    :row="rowsOffset + basicFiltersOffset"
                    :column="orderedColumns.length + columnIndex + columnsOffset"
                    :locked="true" />
                <template v-for="(row, rowIndex) in rows">
                    <GridActionCell
                        :key="`${rowIds[rowIndex]}|${column.id}`"
                        :column-index="orderedColumns.length + columnIndex + columnsOffset"
                        :column="column"
                        :action="row._links.value[column.id]"
                        :row-index="rowsOffset + rowIndex + basicFiltersOffset + 1"
                        :is-selected="isSelectedAllRows
                            || selectedRows[rowsOffset + rowIndex + basicFiltersOffset + 1]"
                        @action="onRowAction"
                    />
                </template>
            </GridActionColumn>
        </GridTableLayoutPinnedSection>
        <Component
            v-if="editCell"
            :is="editCellComponent"
            ref="editCell"
            v-bind="editCell.props"
            @cellValue="onCellValueChange"
            @dismiss="onDismissEditCell" />
        <Component
            v-if="editFilterCell"
            :is="editFilterCellComponent"
            ref="editCell"
            v-bind="editFilterCell.props"
            @filterValue="onFilterValueChange"
            @dismiss="onDismissEditFilterCell" />
        <GridCellResizer
            v-if="cellResizer"
            v-bind="cellResizer"
            @resize="onCellResize"
            @copy="onCopyCellValuesByResizing" />
    </div>
</template>

<script>
import DropZone from '@Core/components/DropZone/DropZone';
import GridActionCell from '@Core/components/Grid/Layout/Table/Cells/Action/GridActionCell';
import GridFilterDataCell from '@Core/components/Grid/Layout/Table/Cells/Data/Filter/GridFilterDataCell';
import GridDataCell from '@Core/components/Grid/Layout/Table/Cells/Data/GridDataCell';
import GridTableCell from '@Core/components/Grid/Layout/Table/Cells/GridTableCell';
import GridHeaderCell from '@Core/components/Grid/Layout/Table/Cells/Header/GridHeaderCell';
import GridActionColumn from '@Core/components/Grid/Layout/Table/Columns/GridActionColumn';
import GridColumn from '@Core/components/Grid/Layout/Table/Columns/GridColumn';
import GridDraggableColumn from '@Core/components/Grid/Layout/Table/Columns/GridDraggableColumn';
import GridTableLayoutColumnsSection from '@Core/components/Grid/Layout/Table/Sections/GridTableLayoutColumnsSection';
import {
    COLUMN_WIDTH,
    PINNED_COLUMN_STATE,
    ROW_HEIGHT,
} from '@Core/defaults/grid';
import gridResizerCellMixin from '@Core/mixins/grid/cell/gridResizerCellMixin';
import {
    swapItemPosition,
} from '@Core/models/arrayWrapper';
import {
    changeCookiePosition,
    removeCookieAtIndex,
} from '@Core/models/cookies';
import {
    getPositionForBrowser,
    isMouseInsideElement,
} from '@Core/models/drag_and_drop/helpers';
import {
    getParsedFilter,
} from '@Core/models/mappers/gridDataMapper';
import {
    capitalizeAndConcatenationArray,
} from '@Core/models/stringWrapper';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'GridTableLayout',
    components: {
        DropZone,
        GridDraggableColumn,
        GridTableLayoutColumnsSection,
        GridColumn,
        GridActionColumn,
        GridTableCell,
        GridFilterDataCell,
        GridActionCell,
        GridDataCell,
        GridHeaderCell,
        GridTableLayoutPinnedSection: () => import('@Core/components/Grid/Layout/Table/Sections/GridTableLayoutPinnedSection'),
        GridSentinelColumn: () => import('@Core/components/Grid/Layout/Table/Columns/GridSentinelColumn'),
        GridSelectRowColumn: () => import('@Core/components/Grid/Layout/Table/Columns/GridSelectRowColumn'),
    },
    mixins: [
        gridResizerCellMixin,
    ],
    props: {
        columns: {
            type: Array,
            default: () => [],
        },
        actionColumns: {
            type: Array,
            default: () => [],
        },
        rows: {
            type: Array,
            default: () => [],
        },
        rowIds: {
            type: Array,
            default: () => [],
        },
        drafts: {
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
            default: ROW_HEIGHT.SMALL,
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
            hasInitialWidths: true,
            isSelectedAllRows: false,
            selectedRows: {},
            orderedColumns: [],
            extendedColumns: {},
            columnWidths: [],
            filters: {},
            filterValues: {},
            sortedColumn: {},
            pinnedSections: {},
            editCell: null,
            editFilterCell: null,
        };
    },
    computed: {
        ...mapState('validations', {
            validationErrors: state => state.validationErrors,
        }),
        ...mapState('list', {
            disabledElements: state => state.disabledElements,
        }),
        visibleColumns() {
            return this.columns.filter(column => column.visible);
        },
        columnTypes() {
            return this.visibleColumns.reduce((acc, current) => {
                const tmp = acc;
                tmp[current.type] = capitalizeAndConcatenationArray(current.type.split('_'));
                return tmp;
            }, {});
        },
        editCellComponent() {
            const type = capitalizeAndConcatenationArray(this.editCell.type.split('_'));

            return () => import(`@Core/components/Grid/Layout/Table/Cells/Edit/Grid${type}EditCell`);
        },
        editFilterCellComponent() {
            const type = capitalizeAndConcatenationArray(this.editFilterCell.type.split('_'));

            return () => import(`@Core/components/Grid/Layout/Table/Cells/Edit/Filter/Grid${type}EditFilterCell`);
        },
        dataCount() {
            return this.rows.length;
        },
        rowsOffset() {
            return (this.currentPage - 1) * this.maxRows;
        },
        columnsOffset() {
            return this.isSelectColumn ? 1 : 0;
        },
        basicFiltersOffset() {
            return this.isBasicFilter ? 1 : 0;
        },
        templateColumns() {
            return {
                gridTemplateColumns: this.columnWidths.join(' '),
            };
        },
        templateRows() {
            const headerRowsTemplate = this.isBasicFilter ? `${ROW_HEIGHT.SMALL}px ${ROW_HEIGHT.SMALL}px` : `${ROW_HEIGHT.SMALL}px`;

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
                if (this.orderedColumns.length !== this.visibleColumns.length) {
                    // Columns might be lazy loaded - we need to handle that
                    this.initializeColumns();
                }
            },
        },
    },
    methods: {
        ...mapActions('list', [
            'setDisabledElement',
            'removeDisabledElement',
        ]),
        onMouseDown(event) {
            if (this.$refs.editCell) {
                const {
                    xPos, yPos,
                } = getPositionForBrowser(event);
                if (!isMouseInsideElement(this.$refs.editCell.$el, xPos, yPos)) {
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
        onSortColumn(sortedColumn) {
            this.sortedColumn = sortedColumn;
            this.$emit('sort', sortedColumn);
        },
        onFilterValueChange({
            value,
            columnId,
        }) {
            this.filters[columnId] = getParsedFilter({
                id: columnId,
                filter: value,
            });
            this.filterValues = {
                ...this.filterValues,
                [columnId]: value,
            };

            this.$emit('filter', this.filters);
        },
        onRemoveColumn(index) {
            const {
                id,
            } = this.orderedColumns[index];

            if (this.orderedColumns[index].element_id) {
                const {
                    language: languageCode, element_id,
                } = this.orderedColumns[index];

                this.disableListElement({
                    languageCode,
                    attributeId: element_id,
                });
            }

            delete this.filters[id];

            this.orderedColumns.splice(index, 1);
            this.columnWidths.splice(index, 1);
            removeCookieAtIndex({
                cookies: this.$cookies,
                cookieName: `GRID_CONFIG:${this.$route.name}`,
                index: this.isSelectColumn ? index - 1 : index,
            });
            this.$emit('filter', this.filters);
        },
        onResizeColumn({
            index, width,
        }) {
            if (this.hasInitialWidths) {
                this.initialColumnWidths();
            }

            this.columnWidths[index] = width;
            this.columnWidths = [
                ...this.columnWidths,
            ];
        },
        onSwapColumns({
            from, to,
        }) {
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
        onStickyChange({
            isSticky, state,
        }) {
            this.pinnedSections = {
                ...this.pinnedSections,
                [state]: isSticky,
            };
        },
        onRowSelect(selectedRows) {
            this.selectedRows = selectedRows;

            this.$emit('rowSelect', this.selectedRows);
        },
        onRowsSelect(isSelectedAllRows) {
            this.isSelectedAllRows = isSelectedAllRows;

            this.$emit('rowsSelect', this.isSelectedAllRows);
        },
        onCellValueChange(value) {
            this.$emit('cellValue', value);
        },
        onRowAction(payload) {
            this.$emit('rowAction', payload);
        },
        initializeColumns() {
            const config = this.$cookies.get(`GRID_CONFIG:${this.$route.name}`);

            if (!config) {
                this.$cookies.set(
                    `GRID_CONFIG:${this.$route.name}`,
                    this.columns
                        .map(({
                            id,
                        }) => id)
                        .join(','),
                );
            }

            const orderedColumns = [];
            const columnWidths = [];
            const {
                length,
            } = this.visibleColumns;

            for (let i = 0; i < length; i += 1) {
                const column = this.visibleColumns[i];

                orderedColumns.push(column);
                columnWidths.push(column.width || COLUMN_WIDTH.DEFAULT);

                const extendedComponents = this.$getExtendedComponents('@Core/components/Grid/Layout/Table/Columns');

                if (extendedComponents && extendedComponents[column.type]) {
                    this.extendedColumns[column.id] = extendedComponents[column.type];
                }
            }

            this.orderedColumns = orderedColumns;
            this.columnWidths = columnWidths;
        },
        initialColumnWidths() {
            const {
                columnsSection,
            } = this.$refs;
            const {
                length,
            } = columnsSection.$el.children;

            for (let i = 0; i < length; i += 1) {
                const {
                    width,
                } = columnsSection.$el.children[i].getBoundingClientRect();

                this.columnWidths[i] = `${width}px`;
            }

            this.hasInitialWidths = false;
        },
        disableListElement({
            languageCode, attributeId,
        }) {
            if (this.disabledElements[languageCode][attributeId]) {
                this.setDisabledElement({
                    languageCode,
                    elementId: attributeId,
                    disabled: false,
                });
            } else {
                this.removeDisabledElement({
                    languageCode,
                    elementId: attributeId,
                });
            }
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
        overflow: auto;
    }
</style>
