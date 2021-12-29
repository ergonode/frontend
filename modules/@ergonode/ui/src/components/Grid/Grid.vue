/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

<template>
    <div
        data-cy="grid"
        :class="classes">
        <GridHeader
            v-if="isHeaderVisible"
            :layout="layout"
            :layout-configs="layoutConfigs"
            :layout-activators="layoutActivators"
            @layout-change="onLayoutChange"
            @apply-settings="onApplySettings">
            <template #prepend>
                <slot name="prependHeader" />
            </template>
            <template #actions>
                <slot
                    name="actionsHeader"
                    :selected-rows="selectedRows"
                    :excluded-from-selection-rows="excludedFromSelectionRows"
                    :selected-rows-count="selectedRowsCount"
                    :is-selected-all="isSelectedAll"
                    :on-clear-selected-rows="onClearSelectedRows" />
            </template>
            <template #configuration>
                <slot name="headerConfiguration" />
            </template>
            <template #append>
                <slot name="appendHeader" />
            </template>
        </GridHeader>
        <GridBody
            :disabled="isElementDraggingToAdd && isColumnExist"
            :is-border="isHeaderVisible">
            <slot name="body">
                <AddGridColumnDropZone
                    :is-visible="isDropZoneVisible"
                    @drop="onDropColumn" />
                <KeepAlive>
                    <Component
                        v-if="activeLayout"
                        :is="activeLayout.layout.component"
                        :scope="scope"
                        :columns="columns"
                        :rows="rows"
                        :row-ids="rowIds"
                        :drafts="drafts"
                        :errors="errors"
                        :disabled-rows="disabledRows"
                        :filters="filters"
                        :sort-order="sortOrder"
                        :pagination="pagination"
                        :extended-components="extendedComponents[activeLayout.key]"
                        :selected-rows="selectedRows"
                        :excluded-from-selection-rows="excludedFromSelectionRows"
                        :multiselect="multiselect"
                        :is-prefetching-data="isPrefetchingData"
                        :is-layout-resolved="isLayoutResolved[layout]"
                        :is-editable="isEditable"
                        :is-select-column="isSelectColumn"
                        :is-basic-filter="isBasicFilter"
                        :is-selected-all="isSelectedAll"
                        :is-action-column="isActionColumn"
                        v-bind="layoutConfigs[activeLayout.key]"
                        @sort-column="onSortColumn"
                        @filter="onFilterChange"
                        @cell-value="onCellValueChange"
                        @focus-cell="onFocusCell"
                        @row-action="onRowAction"
                        @remove-column="onRemoveColumn"
                        @swap-columns="onSwapColumns"
                        @rows-select="onRowsSelect"
                        @excluded-rows-select="onExcludedRowsSelect"
                        @select-all="onSelectAllRows"
                        @resolved="onResolvedLayout" />
                </KeepAlive>
                <slot
                    v-if="isPlaceholderVisible"
                    name="noDataPlaceholder">
                    <GridNoDataPlaceholder />
                </slot>
                <slot
                    v-if="isFilterPlaceholderVisible"
                    name="noResultsPlaceholder">
                    <GridNoResultsPlaceholder @clear="onRemoveAllFilters" />
                </slot>
            </slot>
        </GridBody>
        <GridFooter v-if="isFooterVisible && activeLayout && activeLayout.isFooterVisible">
            <slot name="footer">
                <GridPageSelector
                    :value="pagination.itemsPerPage"
                    :data-count="dataCount"
                    @input="onItemsPerPageChange" />
                <GridPagination
                    :value="pagination.page"
                    :max-page="maxPage"
                    @input="onPageChange" />
                <slot
                    name="appendFooter"
                    :selected-rows="selectedRows"
                    :excluded-from-selection-rows="excludedFromSelectionRows"
                    :selected-rows-count="selectedRowsCount"
                    :is-selected-all="isSelectedAll"
                    :on-clear-selected-rows="onClearSelectedRows" />
            </slot>
        </GridFooter>
        <slot />
    </div>
</template>

<script>
import {
    COLUMNS_NUMBER,
    DEFAULT_GRID_PAGINATION,
    DEFAULT_PAGE,
    DRAGGED_ELEMENT,
    GRID_LAYOUT,
    OBJECT_FIT,
    ROW_HEIGHT,
} from '@Core/defaults/grid';
import {
    getUUID,
} from '@Core/models/stringWrapper';
import GridCollectionLayout from '@UI/components/Grid/Layout/Collection/GridCollectionLayout';
import GridCollectionLayoutActivator from '@UI/components/Grid/Layout/Collection/GridCollectionLayoutActivator';
import GridTableLayout from '@UI/components/Grid/Layout/Table/GridTableLayout';
import GridTableLayoutActivator from '@UI/components/Grid/Layout/Table/GridTableLayoutActivator';
import deepmerge from 'deepmerge';
import {
    mapState,
} from 'vuex';

export default {
    name: 'Grid',
    props: {
        /**
         * Context scope
         */
        scope: {
            type: String,
            default: '',
        },
        /**
         * List of columns presented at Grid
         */
        columns: {
            type: Array,
            default: () => [],
        },
        /**
         * List of rows presented at Grid
         */
        rows: {
            type: Array,
            default: () => [],
        },
        /**
         * The drafts are unsaved changes, cached changed data at given time
         */
        drafts: {
            type: Object,
            default: () => ({}),
        },
        /**
         * The disabled rows are defining which rows are not being able to interact with
         */
        disabledRows: {
            type: Object,
            default: () => ({}),
        },
        /**
         * The filter values
         */
        filters: {
            type: Object,
            default: () => ({}),
        },
        /**
         * The validation errors
         */
        errors: {
            type: Object,
            default: () => ({}),
        },
        /**
         * The model of data at which collection layout cells are going to be binded with data of Grid
         */
        collectionCellBinding: {
            type: Object,
            default: null,
        },
        /**
         * Data model of pagination
         */
        pagination: {
            type: Object,
            default: DEFAULT_GRID_PAGINATION,
        },
        /**
         * Determines default layout of Grid
         */
        defaultLayout: {
            type: String,
            default: GRID_LAYOUT.TABLE,
            validator: value => Object.values(GRID_LAYOUT).indexOf(value) !== -1,
        },
        /**
         * Determines chosen layout of Grid
         */
        layout: {
            type: String,
            default: GRID_LAYOUT.TABLE,
        },
        /**
         * Number of all data
         */
        dataCount: {
            type: Number,
            required: true,
        },
        /**
         * Type of the place from where element is dragging
         */
        draggingElementType: {
            type: String,
            default: DRAGGED_ELEMENT.LIST,
        },
        /**
         * Determines if the component is multiple choice
         */
        multiselect: {
            type: Boolean,
            default: true,
        },
        /**
         * Determines if data is loaded asynchronously
         */
        isPrefetchingData: {
            type: Boolean,
            default: false,
        },
        /**
         * Determines if collection layout might be chosen
         */
        isCollectionLayout: {
            type: Boolean,
            default: false,
        },
        /**
         * Determinate if the component has border
         */
        isBorder: {
            type: Boolean,
            default: false,
        },
        /**
         * Determinate if action column is visible
         */
        isActionColumn: {
            type: Boolean,
            default: true,
        },
        /**
         * Determinate if the component is being able to edit
         */
        isEditable: {
            type: Boolean,
            default: true,
        },
        /**
         * Determines if filters are visible
         */
        isBasicFilter: {
            type: Boolean,
            default: false,
        },
        /**
         * Determines if selecting row column is visible
         */
        isSelectColumn: {
            type: Boolean,
            default: false,
        },
        /**
         * Determines if footer is visible
         */
        isFooterVisible: {
            type: Boolean,
            default: true,
        },
        /**
         * Determines if header is visible
         */
        isHeaderVisible: {
            type: Boolean,
            default: false,
        },
        /**
         * The data model of sorted column
         */
        sortOrder: {
            type: Object,
            default: () => ({}),
        },
        /**
         * The data model of extended Grid components
         */
        extendedComponents: {
            type: Object,
            default: () => ({
                [GRID_LAYOUT.TABLE]: {},
                [GRID_LAYOUT.COLLECTION]: {},
            }),
        },
        /**
         * Custom layout definitions
         */
        customLayouts: {
            type: Array,
            default: () => [],
        },
        /**
         * The state of the selected rows
         */
        selectionState: {
            type: Object,
            default: () => ({
                isSelectedAll: false,
                selectedRows: {},
                excludedFromSelectionRows: {},
            }),
        },
    },
    data() {
        const layoutConfigs = {
            [GRID_LAYOUT.TABLE]: {
                rowHeight: ROW_HEIGHT.SMALL,
            },
        };

        if (this.isCollectionLayout) {
            layoutConfigs[GRID_LAYOUT.COLLECTION] = {
                columnsNumber: COLUMNS_NUMBER.FOURTH_COLUMNS.value,
                objectFit: OBJECT_FIT.FIT_TO_SIZE.value,
                collectionCellBinding: this.collectionCellBinding,
            };
        }

        return {
            layoutConfigs,
            selectedRows: {},
            excludedFromSelectionRows: {},
            isSelectedAll: false,
            isLayoutResolved: {
                [GRID_LAYOUT.TABLE]: false,
                [GRID_LAYOUT.COLLECTION]: false,
            },
        };
    },
    computed: {
        ...mapState('draggable', [
            'isElementDragging',
            'draggedElement',
        ]),
        classes() {
            return [
                'grid',
                {
                    'grid--border': this.isBorder,
                },
            ];
        },
        layouts() {
            const layouts = [
                {
                    key: GRID_LAYOUT.TABLE,
                    layout: {
                        component: GridTableLayout,
                    },
                    activator: {
                        component: GridTableLayoutActivator,
                        dataCy: 'grid-table-view',
                    },
                    isFooterVisible: true,
                },
            ];

            if (this.isCollectionLayout) {
                layouts.push(
                    {
                        key: GRID_LAYOUT.COLLECTION,
                        layout: {
                            component: GridCollectionLayout,
                        },
                        activator: {
                            component: GridCollectionLayoutActivator,
                            dataCy: 'grid-collection-view',
                        },
                        isFooterVisible: true,
                    },
                );
            }

            return [
                ...layouts,
                ...this.customLayouts,
            ];
        },
        layoutActivators() {
            return this.layouts.map(layout => ({
                key: layout.key,
                ...layout.activator,
            }));
        },
        activeLayout() {
            return this.layouts.find(layout => layout.key === this.layout);
        },
        gridLayout() {
            return GRID_LAYOUT;
        },
        maxPage() {
            return Math.ceil(this.dataCount / this.pagination.itemsPerPage) || 1;
        },
        rowIds() {
            return this.rows.map(({
                id,
            }) => {
                if (id && id.value) {
                    return id.value;
                }

                return getUUID();
            });
        },
        selectedRowsCount() {
            if (this.isSelectedAll) {
                const {
                    length: excludedRows,
                } = Object.keys(this.excludedFromSelectionRows)
                    .filter(key => this.excludedFromSelectionRows[key]);

                return this.dataCount - excludedRows;
            }

            return Object.keys(this.selectedRows).filter(key => this.selectedRows[key]).length;
        },
        isDropZoneVisible() {
            return this.isElementDraggingToAdd && !this.isColumnExist && this.isTableLayout;
        },
        isAnyFilter() {
            return Object.keys(this.filters).length > 0;
        },
        isElementDraggingToAdd() {
            return this.isElementDragging === this.draggingElementType;
        },
        isColumnExist() {
            return this.columns.some(
                column => column.id === this.draggedElement && column.visible,
            );
        },
        isTableLayout() {
            return this.layout === GRID_LAYOUT.TABLE;
        },
        isAnyData() {
            return this.dataCount > 0;
        },
        isPlaceholderVisible() {
            return !this.isAnyData
                && !this.isPrefetchingData
                && !this.isAnyFilter
                && this.isLayoutResolved[this.layout];
        },
        isFilterPlaceholderVisible() {
            return !this.isAnyData
                && !this.isPrefetchingData
                && this.isAnyFilter
                && this.isLayoutResolved[this.layout];
        },
    },
    watch: {
        selectionState() {
            const {
                isSelectedAll,
                selectedRows,
                excludedFromSelectionRows,
            } = this.selectionState;

            this.isSelectedAll = isSelectedAll;
            this.selectedRows = selectedRows;
            this.excludedFromSelectionRows = excludedFromSelectionRows;
        },
    },
    methods: {
        onResolvedLayout({
            layout,
            isResolved,
        }) {
            this.isLayoutResolved[layout] = isResolved;
        },
        onRemoveAllFilters() {
            this.$emit('remove-all-filters');
        },
        onRowsSelect({
            isSelected,
            rowIds,
        }) {
            let selectedRows = {};

            if (this.multiselect) {
                selectedRows = {
                    ...this.selectedRows,
                };

                rowIds.forEach((rowId) => {
                    selectedRows[rowId] = isSelected;
                });
            } else {
                selectedRows[rowIds[0]] = isSelected;
            }

            this.selectedRows = selectedRows;

            this.$emit('selection-state', {
                isSelectedAll: this.isSelectedAll,
                selectedRows,
                excludedFromSelectionRows: this.excludedFromSelectionRows,
            });
        },
        onExcludedRowsSelect({
            isExcluded,
            rowIds,
        }) {
            rowIds.forEach((rowId) => {
                this.excludedFromSelectionRows[rowId] = isExcluded;
            });

            this.excludedFromSelectionRows = {
                ...this.excludedFromSelectionRows,
            };

            this.$emit('selection-state', {
                isSelectedAll: this.isSelectedAll,
                selectedRows: this.selectedRows,
                excludedFromSelectionRows: this.excludedFromSelectionRows,
            });
        },
        onSelectAllRows(isSelectedAll) {
            this.isSelectedAll = isSelectedAll;

            this.selectedRows = {};
            this.excludedFromSelectionRows = {};

            this.$emit('selection-state', {
                isSelectedAll,
                selectedRows: {},
                excludedFromSelectionRows: {},
            });
        },
        onApplySettings(layoutConfigs) {
            this.layoutConfigs = deepmerge(this.layoutConfigs, layoutConfigs);
        },
        onLayoutChange(layout) {
            if (this.isHeaderVisible && this.$route.query.layout !== layout) {
                this.$router.replace({
                    query: {
                        ...this.$route.query,
                        layout,
                    },
                });
            }

            this.$emit('layout', layout);
        },
        onCellValueChange(payload) {
            this.$emit('cell-value', payload);
        },
        onFocusCell(payload) {
            this.$emit('focus-cell', payload);
        },
        onRowAction({
            key,
            value,
        }) {
            delete this.selectedRows[value];
            delete this.excludedFromSelectionRows[value];

            this.selectedRows = {
                ...this.selectedRows,
            };
            this.excludedFromSelectionRows = {
                ...this.excludedFromSelectionRows,
            };

            this.$emit('selection-state', {
                isSelectedAll: this.isSelectedAll,
                selectedRows: this.selectedRows,
                excludedFromSelectionRows: this.excludedFromSelectionRows,
            });

            this.$emit(`${key}-row`, value);
        },
        onRemoveColumn(payload) {
            this.$emit('remove-column', payload);
        },
        onSwapColumns(payload) {
            this.$emit('swap-columns', payload);
        },
        onDropColumn(payload) {
            this.$emit('drop-column', payload);
        },
        onSortColumn(sortOrder) {
            this.$emit('sort-column', sortOrder);
        },
        onFilterChange(filters) {
            this.$emit('filter', filters);
        },
        onPageChange(page) {
            this.$emit('pagination', {
                ...this.pagination,
                page,
            });
        },
        onItemsPerPageChange(itemsPerPage) {
            const number = Math.trunc(itemsPerPage);

            if (number !== this.pagination.itemsPerPage) {
                this.$emit('pagination', {
                    ...this.pagination,
                    page: DEFAULT_PAGE,
                    itemsPerPage: number,
                });
            }
        },
        onClearSelectedRows() {
            this.isSelectedAll = false;
            this.selectedRows = {};
            this.excludedFromSelectionRows = {};

            this.$emit('selection-state', {
                isSelectedAll: false,
                selectedRows: {},
                excludedFromSelectionRows: {},
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid {
        position: relative;
        display: flex;
        flex: 1 1 auto;
        flex-direction: column;
        overflow: hidden;

        &--border {
            border: $BORDER_1_GREY;
        }
    }
</style>
