/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<script>
import {
    ROW_HEIGHT,
    GRID_LAYOUT,
    DATA_LIMIT,
} from '@Core/defaults/grid';

export default {
    name: 'Grid',
    components: {
        GridHeader: () => import('@Core/components/Grid/GridHeader'),
        GridTableLayout: () => import('@Core/components/Grid/Layout/GridTableLayout/GridTableLayout'),
        GridPlaceholder: () => import('@Core/components/Grid/GridPlaceholder'),
        GridPagination: () => import('@Core/components/Grid/GridPagination'),
        GridPageSelector: () => import('@Core/components/Grid/GridPageSelector'),
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
        advancedFilters: {
            type: Array,
            default: () => [],
        },
        isAdvancedFilters: {
            type: Boolean,
            default: false,
        },
        isCenteredView: {
            type: Boolean,
            default: false,
        },
        isEditable: {
            type: Boolean,
            default: true,
        },
        dataCount: {
            type: Number,
            default: 0,
        },
        isFooterVisible: {
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
        isActionColumn: {
            type: Boolean,
            default: false,
        },
        isHeaderVisible: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            rowHeight: ROW_HEIGHT.MEDIUM,
            layout: GRID_LAYOUT.TABLE,
            maxRows: DATA_LIMIT,
            currentPage: 1,
            filters: {},
            sortedColumn: {},
        };
    },
    computed: {
        maxPage() {
            const result = Math.ceil(this.dataCount / this.maxRows);

            return result > 0 ? result : 1;
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
    },
    methods: {
        onInsertColumn(payload) {
            this.$emit('insertColumn', payload);
        },
        onEditRow(args) {
            this.$emit('editRow', args);
        },
        onRemoveRowAtIndex(index) {
            this.$emit('removeRowAtIndex', index);
        },
        onRowHeightChange(height) {
            this.rowHeight = height;
        },
        onLayoutChange(layout) {
            this.layout = layout;
        },
        onDropColumn(payload) {
            this.$emit('dropColumn', payload);
            this.emitFetchData();
        },
        onSwapColumns(payload) {
            this.$emit('swapColumns', payload);
        },
        onRemoveColumn(index) {
            this.$emit('removeColumn', index);
        },
        onSortColumn(sortedColumn) {
            this.sortedColumn = sortedColumn;
            this.emitFetchData();
        },
        onFilterChange(filters) {
            this.filters = filters;
            this.emitFetchData();
        },
        setCurrentPage(page) {
            this.currentPage = page;
            this.emitFetchData();
        },
        setMaxRows(maxRows) {
            const number = Math.trunc(maxRows);

            if (number !== this.maxRows) {
                this.currentPage = 1;
                this.maxRows = number;

                this.emitFetchData();
            }
        },
        emitFetchData() {
            this.$emit('fetchData', {
                sortedColumn: this.sortedColumn,
                filters: this.filters,
                offset: (this.currentPage - 1) * this.maxRows,
                limit: this.maxRows,
            });
        },
        onUpdateFilterAtIndex(payload) {
            this.$emit('updateFilter', payload);
            this.emitFetchData();
        },
        onRemoveFilterAtIndex(index) {
            this.$emit('removeFilter', index);
            this.emitFetchData();
        },
        onRemoveGhostFilterAtIndex(index) {
            this.$emit('removeFilter', index);
        },
        onRemoveAll() {
            this.$emit('removeAllFilters');
            this.emitFetchData();
        },
        onDropFilterAtIndex(payload) {
            this.$emit('dropFilter', payload);
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
    },
    render(createElement) {
        const gridBodyElements = [
            createElement('GridTableLayout', {
                attrs: {
                    columns: this.columns,
                    cellValues: this.cellValues,
                    rowIds: this.rowIds,
                    rowLinks: this.rowLinks,
                    advancedFiltersValues: this.advancedFiltersValues,
                    currentPage: this.currentPage,
                    maxRows: this.maxRows,
                    rowHeight: this.rowHeight,
                    isEditable: this.isEditable,
                    isSelectColumn: this.isSelectColumn,
                    isBasicFilters: this.isBasicFilters,
                    isDraggable: this.isDraggable,
                    isActionColumn: this.isActionColumn,
                },
                on: {
                    sort: this.onSortColumn,
                    filter: this.onFilterChange,
                    editRow: this.onEditRow,
                    removeRowAtIndex: this.onRemoveRowAtIndex,
                    removeColumn: this.onRemoveColumn,
                    swapColumns: this.onSwapColumns,
                    dropColumn: this.onDropColumn,
                    insertColumn: this.onInsertColumn,
                },
            }),
        ];

        if (!this.rowIds.length) {
            gridBodyElements.push(createElement('GridPlaceholder'));
        }

        const gridBody = createElement('div', {
            staticClass: 'grid__body',
        }, gridBodyElements);

        const gridElements = [];

        if (this.isHeaderVisible) {
            gridElements.push(createElement('GridHeader', {
                attrs: {
                    rowHeight: this.rowHeight,
                    layout: this.layout,
                    isAdvancedFilters: this.isAdvancedFilters,
                    isCenteredView: this.isCenteredView,
                    filters: this.advancedFilters,
                    // isActionsSelected: this.isSelectedAllRows
                    //         || Object.keys(this.selectedRows).length !== 0,
                },
                on: {
                    rowHeightChange: this.onRowHeightChange,
                    layoutChange: this.onLayoutChange,
                    dropFilter: this.onDropFilterAtIndex,
                    updateFilter: this.onUpdateFilterAtIndex,
                    removeFilter: this.onRemoveFilterAtIndex,
                    removeGhostFilter: this.onRemoveGhostFilterAtIndex,
                    insertFilter: this.onInsertFilterAtIndex,
                    clearFilter: this.onClearFilterAtIndex,
                    setGhostFilter: this.onSetGhostFilterAtIndex,
                    swapFilters: this.onSwapFiltersPosition,
                    applyFilter: this.emitFetchData,
                    removeAllFilters: this.onRemoveAll,
                },
                scopedSlots: {
                    actions: () => this.$slots.actions,
                },
            }));
        }

        gridElements.push(gridBody);

        if (this.isFooterVisible) {
            const gridFooterElements = [
                createElement('GridPageSelector', {
                    attrs: {
                        value: this.maxRows,
                        maxRows: this.dataCount,
                    },
                    on: {
                        input: this.setMaxRows,
                    },
                }),
            ];

            if (this.maxPage > 1) {
                gridFooterElements.push(
                    createElement('GridPagination', {
                        attrs: {
                            value: this.currentPage,
                            maxPage: this.maxPage,
                        },
                        on: {
                            input: this.setCurrentPage,
                        },
                    }),
                );
            }

            gridFooterElements.push(this.$slots.appendFooter);
            gridElements.push(createElement('div', {
                staticClass: 'grid__footer',
            }, gridFooterElements));
        }

        return createElement('div', {
            staticClass: 'grid',
        }, gridElements);
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
        min-width: 0;
        overflow: hidden;

        &__body {
            display: flex;
            flex: 1 1 auto;
            flex-direction: column;
            height: 0;
            background-color: $WHITESMOKE;
            overflow: auto;
            border-top: $BORDER_1_GREY;
            border-left: $BORDER_1_GREY;
            border-right: $BORDER_1_GREY;
        }

        &__footer {
            z-index: $Z_INDEX_LVL_5;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-left: $BORDER_1_GREY;
            border-right: $BORDER_1_GREY;
            border-bottom: $BORDER_1_GREY;
            height: 56px;
            padding: 12px 16px;
            box-sizing: border-box;
            background-color: $WHITE;
            box-shadow: $ELEVATOR_6_DP;
        }
    }
</style>
