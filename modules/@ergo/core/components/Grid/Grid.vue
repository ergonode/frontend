/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

<template>
    <div class="grid">
        <GridHeader
            v-if="isHeaderVisible"
            :row-height="rowHeight"
            :layout="layout"
            :is-advanced-filters="isAdvancedFilters"
            :is-centered-view="isCenteredView"
            :filters="advancedFilters"
            @rowHeightChange="onRowHeightChange"
            @layoutChange="onLayoutChange"
            @dropFilter="onDropFilterAtIndex"
            @updateFilter="onUpdateFilterAtIndex"
            @removeFilter="onRemoveFilterAtIndex"
            @removeGhostFilter="onRemoveGhostFilterAtIndex"
            @insertFilter="onInsertFilterAtIndex"
            @clearFilter="onClearFilterAtIndex"
            @setGhostFilter="onSetGhostFilterAtIndex"
            @swapFilters="onSwapFiltersPosition"
            @applyFilter="emitFetchData"
            @removeAllFilters="onRemoveAll">
            <template #actions>
                <slot name="actions" />
            </template>
        </GridHeader>
        <div class="grid__body">
            <GridTableLayout
                :columns="columns"
                :data="data"
                :advanced-filters-values="advancedFiltersValues"
                :current-page="currentPage"
                :max-rows="maxRows"
                :row-height="rowHeight"
                :is-editable="isEditable"
                :is-select-column="isSelectColumn"
                :is-basic-filter="isBasicFilter"
                :is-action-column="isActionColumn"
                @sort="onSortColumn"
                @filter="onFilterChange"
                @editCell="onEditCell"
                @editCells="onEditCells"
                @editRow="onEditRow"
                @removeRow="onRemoveRow"
                @removeColumn="onRemoveColumn"
                @swapColumns="onSwapColumns"
                @dropColumn="onDropColumn"
                @insertColumn="onInsertColumn" />
            <GridPlaceholder v-if="dataCount === 0" />
            <div
                class="grid__footer"
                v-if="isFooterVisible">
                <GridPageSelector
                    :value="maxRows"
                    :max-rows="dataCount"
                    @input="setMaxRows" />
                <GridPagination
                    :value="currentPage"
                    :max-page="maxPage"
                    @input="setCurrentPage" />
                <slot name="appendFooter" />
            </div>
        </div>
    </div>
</template>

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
        GridTableLayout: () => import('@Core/components/Grid/Layout/Table/GridTableLayout'),
        GridPlaceholder: () => import('@Core/components/Grid/GridPlaceholder'),
        GridPagination: () => import('@Core/components/Grid/GridPagination'),
        GridPageSelector: () => import('@Core/components/Grid/GridPageSelector'),
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
            required: true,
        },
        isFooterVisible: {
            type: Boolean,
            default: true,
        },
        isBasicFilter: {
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
        onEditCell(payload) {
            this.$emit('editCell', payload);
        },
        onEditCells(payload) {
            this.$emit('editCells', payload);
        },
        onEditRow(args) {
            this.$emit('editRow', args);
        },
        onRemoveRow(index) {
            this.$emit('removeRow', index);
        },
        onRowHeightChange(height) {
            this.rowHeight = height;
        },
        onLayoutChange(layout) {
            this.layout = layout;
        },
        onDropColumn(columnId) {
            this.$emit('dropColumn', columnId);
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
            justify-content: space-between;
            height: 0;
            border: $BORDER_1_GREY;
            background-color: $WHITESMOKE;
        }

        &__footer {
            z-index: $Z_INDEX_LVL_5;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 56px;
            padding: 12px 16px;
            box-sizing: border-box;
            background-color: $WHITE;
            box-shadow: $ELEVATOR_6_DP;
        }
    }
</style>
