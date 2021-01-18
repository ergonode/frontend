/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

<template>
    <div
        data-cy="grid"
        :class="classes">
        <GridHeader
            v-if="isHeaderVisible"
            :layout="layout"
            :table-layout-config="tableLayoutConfig"
            :collection-layout-config="collectionLayoutConfig"
            :is-collection-layout="isCollectionLayout"
            @layout-change="onLayoutChange"
            @apply-settings="onApplySettings">
            <template #prepend>
                <slot name="prependHeader" />
            </template>
            <template #actions>
                <BatchActionButton
                    v-if="isBatchActionVisible"
                    :highlighted="isAnyRowSelected"
                    :options="batchActions"
                    @action="onBatchActionSelect" />
                <slot name="actionsHeader" />
            </template>
            <template #configuration>
                <slot name="headerConfiguration" />
            </template>
            <template #append>
                <slot name="appendHeader" />
            </template>
        </GridHeader>
        <GridBody
            :disabled="isListElementDragging && isColumnExist"
            :is-border="isHeaderVisible">
            <slot name="body">
                <AddGridColumnDropZone
                    :column-exist="isColumnExist"
                    @drop="onDropColumn" />
                <KeepAlive>
                    <GridTableLayout
                        v-if="isTableLayout"
                        :columns="columns"
                        :rows="rows"
                        :row-ids="rowIds"
                        :drafts="drafts"
                        :errors="errors"
                        :disabled-rows="disabledRows"
                        :filters="filters"
                        :sort-order="sortOrder"
                        :pagination="pagination"
                        :row-height="tableLayoutConfig.rowHeight"
                        :extended-components="extendedComponents[gridLayout.TABLE]"
                        :selected-rows="selectedRows[pagination.page]"
                        :is-prefetching-data="isPrefetchingData"
                        :is-editable="isEditable"
                        :is-select-column="isSelectColumn"
                        :is-basic-filter="isBasicFilter"
                        @sort-column="onSortColumn"
                        @filter="onFilterChange"
                        @cell-value="onCellValueChange"
                        @focus-cell="onFocusCell"
                        @row-action="onRowAction"
                        @remove-column="onRemoveColumn"
                        @swap-columns="onSwapColumns"
                        @row-select="onRowSelect" />
                    <GridCollectionLayout
                        v-else-if="isAnyData"
                        :rows="rows"
                        :row-ids="rowIds"
                        :collection-cell-binding="collectionCellBinding"
                        :drafts="drafts"
                        :disabled-rows="disabledRows"
                        :columns-number="collectionLayoutConfig.columnsNumber"
                        :object-fit="collectionLayoutConfig.scaling"
                        :extended-components="extendedComponents[gridLayout.COLLECTION]"
                        :is-prefetching-data="isPrefetchingData"
                        @row-action="onRowAction"
                        @cell-value="onCellValueChange" />
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
        <GridFooter v-if="isFooterVisible">
            <slot name="footer">
                <GridPageSelector
                    :value="pagination.itemsPerPage"
                    :data-count="dataCount"
                    @input="onItemsPerPageChange" />
                <GridPagination
                    :value="pagination.page"
                    :max-page="maxPage"
                    @input="onPageChange" />
                <slot name="appendFooter" />
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
    IMAGE_SCALING,
    ROW_HEIGHT,
} from '@Core/defaults/grid';
import {
    getUUID,
} from '@Core/models/stringWrapper';
import BatchActionButton from '@UI/components/Grid/Buttons/BatchActionButton';
import AddGridColumnDropZone from '@UI/components/Grid/DropZone/AddGridColumnDropZone';
import GridPageSelector from '@UI/components/Grid/Footer/GridPageSelector';
import GridPagination from '@UI/components/Grid/Footer/GridPagination';
import GridBody from '@UI/components/Grid/GridBody';
import GridFooter from '@UI/components/Grid/GridFooter';
import GridNoDataPlaceholder from '@UI/components/Grid/GridNoDataPlaceholder';
import GridNoResultsPlaceholder from '@UI/components/Grid/GridNoResultsPlaceholder';
import GridHeader from '@UI/components/Grid/Header/GridHeader';
import GridCollectionLayout from '@UI/components/Grid/Layout/Collection/GridCollectionLayout';
import GridTableLayout from '@UI/components/Grid/Layout/Table/GridTableLayout';
import {
    mapState,
} from 'vuex';

export default {
    name: 'Grid',
    components: {
        AddGridColumnDropZone,
        GridNoDataPlaceholder,
        GridNoResultsPlaceholder,
        GridPagination,
        GridHeader,
        GridBody,
        GridFooter,
        GridTableLayout,
        GridCollectionLayout,
        GridPageSelector,
        BatchActionButton,
    },
    props: {
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
         * The list of batch actions
         */
        batchActions: {
            type: Array,
            default: () => [],
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
         * Number of all data
         */
        dataCount: {
            type: Number,
            required: true,
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
    },
    data() {
        return {
            layout: this.defaultLayout,
            collectionLayoutConfig: {
                columnsNumber: COLUMNS_NUMBER.FOURTH_COLUMNS.value,
                scaling: IMAGE_SCALING.FIT_TO_SIZE.value,
            },
            tableLayoutConfig: {
                rowHeight: ROW_HEIGHT.SMALL,
            },
            selectedRows: {},
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
        isAnyRowSelected() {
            if (!this.selectedRows[this.pagination.page]) {
                return false;
            }

            return Object.values(this.selectedRows[this.pagination.page])
                .some(isSelected => isSelected);
        },
        isAnyFilter() {
            return Object.keys(this.filters).length > 0;
        },
        isBatchActionVisible() {
            return this.batchActions.length > 0;
        },
        isListElementDragging() {
            return this.isElementDragging === DRAGGED_ELEMENT.LIST;
        },
        isColumnExist() {
            return this.columns.some(
                column => column.id === this.draggedElement,
            );
        },
        isTableLayout() {
            return this.layout === GRID_LAYOUT.TABLE;
        },
        isAnyData() {
            return this.dataCount > 0;
        },
        isPlaceholderVisible() {
            return !this.isAnyData && !this.isPrefetchingData && !this.isAnyFilter;
        },
        isFilterPlaceholderVisible() {
            return !this.isAnyData && this.isAnyFilter && !this.isPrefetchingData;
        },
    },
    methods: {
        onRemoveAllFilters() {
            this.$emit('remove-all-filters');
        },
        onBatchActionSelect(option) {
            if (Object.keys(this.selectedRows[this.pagination.page]).length > 0) {
                let {
                    rowIds,
                } = this;

                const rowsOffset = (this.pagination.page - 1) * this.pagination.itemsPerPage;
                const fixedIndex = rowsOffset + (this.isBasicFilter ? 2 : 1);

                rowIds = [];

                Object.keys(this.selectedRows[this.pagination.page]).forEach((key) => {
                    rowIds.push(this.rowIds[+key - fixedIndex]);
                });

                option.action({
                    payload: {
                        rowIds,
                    },
                    onSuccess: () => {
                        this.selectedRows = {
                            ...this.selectedRows,
                            [this.pagination.page]: {},
                        };
                    },
                    onError: () => {
                        throw new Error('Mass action is either without defined an action nor is not valid');
                    },
                });
            }
        },
        onRowSelect(selectedRows) {
            this.selectedRows = {
                ...this.selectedRows,
                [this.pagination.page]: selectedRows,
            };
        },
        onApplySettings({
            tableConfig,
            collectionConfig,
        }) {
            this.tableLayoutConfig = tableConfig;
            this.collectionLayoutConfig = collectionConfig;
        },
        onLayoutChange(layout) {
            this.layout = layout;
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
    },
};
</script>

<style lang="scss" scoped>
    .grid {
        position: relative;
        display: flex;
        flex: 1 1 auto;
        flex-direction: column;
        min-width: 0;
        overflow: hidden;

        &--border {
            border: $BORDER_1_GREY;
        }
    }
</style>
