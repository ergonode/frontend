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
                <BulkActionButton
                    v-if="isBulkActionVisible"
                    :options="bulkActions"
                    @action="onBulkActionSelect" />
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
            <AddGridColumnDropZone
                :column-exist="isColumnExist"
                @drop="onDropColumn" />
            <Preloader v-show="isPrefetchingData || isRenderingTableLayout" />
            <KeepAlive>
                <GridTableLayout
                    v-if="isTableLayout && !isPrefetchingData"
                    :columns="columns"
                    :rows="rows"
                    :row-ids="rowIds"
                    :drafts="drafts"
                    :errors="errors"
                    :disabled-rows="disabledRows"
                    :filters="filters"
                    :current-page="currentPage"
                    :max-rows="maxRows"
                    :row-height="tableLayoutConfig.rowHeight"
                    :extended-columns="extendedColumns[gridLayout.TABLE]"
                    :extended-data-cells="extendedDataCells[gridLayout.TABLE]"
                    :extended-data-filter-cells="extendedDataFilterCells[gridLayout.TABLE]"
                    :extended-data-edit-cells="extendedDataEditCells[gridLayout.TABLE]"
                    :extended-edit-filter-cells="extendedDataEditFilterCells[gridLayout.TABLE]"
                    :selected-rows="selectedRows"
                    :is-selected-all-rows="isSelectedAllRows"
                    :is-editable="isEditable"
                    :is-select-column="isSelectColumn"
                    :is-basic-filter="isBasicFilter"
                    @sort="onSortColumn"
                    @filter="onFilterChange"
                    @cell-value="onCellValueChange"
                    @focus-cell="onFocusCell"
                    @row-action="onRowAction"
                    @remove-column="onRemoveColumn"
                    @swap-columns="onSwapColumns"
                    @row-select="onRowSelect"
                    @rows-select="onRowsSelect"
                    @rendered="onRenderedTableLayout" />
                <GridCollectionLayout
                    v-else-if="isCollectionLayout && !isPrefetchingData && !isPlaceholderVisible"
                    :rows="rows"
                    :row-ids="rowIds"
                    :collection-cell-binding="collectionCellBinding"
                    :drafts="drafts"
                    :disabled-rows="disabledRows"
                    :columns-number="collectionLayoutConfig.columnsNumber"
                    :object-fit="collectionLayoutConfig.scaling"
                    :extended-data-cells="extendedDataCells[gridLayout.COLLECTION]"
                    @row-action="onRowAction"
                    @cell-value="onCellValueChange" />
            </KeepAlive>
            <GridPlaceholder
                v-show="isPlaceholderVisible"
                v-bind="{ ...dataPlaceholder }">
                <template #action>
                    <slot name="filterActionPlaceholder">
                        <RemoveFiltersButton
                            v-if="isAnyFilter"
                            @click.native="onRemoveAllFilters" />
                    </slot>
                    <slot name="actionPlaceholder" />
                </template>
            </GridPlaceholder>
        </GridBody>
        <GridFooter v-if="isFooterVisible">
            <slot name="footer">
                <GridPageSelector
                    :value="maxRows"
                    :max-rows="dataCount"
                    @input="onMaxRowsChange" />
                <GridPagination
                    :value="currentPage"
                    :max-page="maxPage"
                    @input="onCurrentPageChange" />
                <slot name="appendFooter" />
            </slot>
        </GridFooter>
    </div>
</template>

<script>
import {
    COLUMNS_NUMBER,
    DATA_LIMIT,
    DRAGGED_ELEMENT,
    GRID_LAYOUT,
    IMAGE_SCALING,
    ROW_HEIGHT,
} from '@Core/defaults/grid';
import {
    getUUID,
} from '@Core/models/stringWrapper';
import {
    WHITESMOKE,
} from '@UI/assets/scss/_js-variables/colors.scss';
import BulkActionButton from '@UI/components/Grid/Buttons/BulkActionButton';
import RemoveFiltersButton from '@UI/components/Grid/Buttons/RemoveFiltersButton';
import AddGridColumnDropZone from '@UI/components/Grid/DropZone/AddGridColumnDropZone';
import GridPageSelector from '@UI/components/Grid/Footer/GridPageSelector';
import GridPagination from '@UI/components/Grid/Footer/GridPagination';
import GridBody from '@UI/components/Grid/GridBody';
import GridFooter from '@UI/components/Grid/GridFooter';
import GridPlaceholder from '@UI/components/Grid/GridPlaceholder';
import GridHeader from '@UI/components/Grid/Header/GridHeader';
import GridCollectionLayout from '@UI/components/Grid/Layout/Collection/GridCollectionLayout';
import GridTableLayout from '@UI/components/Grid/Layout/Table/GridTableLayout';
import Preloader from '@UI/components/Preloader/Preloader';
import {
    mapState,
} from 'vuex';

export default {
    name: 'Grid',
    components: {
        RemoveFiltersButton,
        AddGridColumnDropZone,
        GridPagination,
        GridHeader,
        Preloader,
        GridBody,
        GridFooter,
        GridTableLayout,
        GridCollectionLayout,
        GridPageSelector,
        BulkActionButton,
        GridPlaceholder,
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
        bulkActions: {
            type: Array,
            default: () => [],
        },
        /**
         * The placeholder is a helper text for the component
         */
        placeholder: {
            type: Object,
            default: () => ({
                title: 'Nothing to see here',
                subtitle: 'There are no records in the system.',
                bgUrl: require('@UI/assets/images/placeholders/comments.svg'),
                color: WHITESMOKE,
            }),
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
         * Number of visible data
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
         * The model of extended data column type filter cells components
         */
        extendedDataFilterCells: {
            type: Object,
            default: () => ({}),
        },
        /**
         * The model of extended edit column type filter cells components
         */
        extendedDataEditFilterCells: {
            type: Object,
            default: () => ({}),
        },
        /**
         * The model of extended data column type cells components
         */
        extendedDataCells: {
            type: Object,
            default: () => ({}),
        },
        /**
         * The model of extended edit column type cells components
         */
        extendedDataEditCells: {
            type: Object,
            default: () => ({}),
        },
        /**
         * The model of extended type columns components
         */
        extendedColumns: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            layout: this.defaultLayout,
            isRenderingTableLayout: this.defaultLayout === GRID_LAYOUT.TABLE,
            maxRows: DATA_LIMIT,
            currentPage: 1,
            sortedColumn: {},
            collectionLayoutConfig: {
                columnsNumber: COLUMNS_NUMBER.FOURTH_COLUMNS.value,
                scaling: IMAGE_SCALING.FIT_TO_SIZE.value,
            },
            tableLayoutConfig: {
                rowHeight: ROW_HEIGHT.SMALL,
            },
            isSelectedAllRows: false,
            selectedRows: {},
        };
    },
    computed: {
        ...mapState('draggable', [
            'isElementDragging',
            'draggedElement',
        ]),
        isAnyFilter() {
            return Object.keys(this.filters).length > 0;
        },
        dataPlaceholder() {
            if (this.dataCount === 0 && this.isAnyFilter) {
                return {
                    title: 'No results',
                    subtitle: 'There are no results that meet the conditions for the selected filters.',
                    bgUrl: require('@UI/assets/images/placeholders/comments.svg'),
                    color: WHITESMOKE,
                };
            }

            return this.placeholder;
        },
        classes() {
            return [
                'grid',
                {
                    'grid--border': this.isBorder,
                },
            ];
        },
        isBulkActionVisible() {
            return this.bulkActions.length > 0;
        },
        isListElementDragging() {
            return this.isElementDragging === DRAGGED_ELEMENT.LIST;
        },
        isColumnExist() {
            return this.columns.some(
                column => column.id === this.draggedElement,
            );
        },
        gridLayout() {
            return GRID_LAYOUT;
        },
        isTableLayout() {
            return this.layout === GRID_LAYOUT.TABLE;
        },
        isPlaceholderVisible() {
            return this.dataCount === 0 && !this.isPrefetchingData;
        },
        maxPage() {
            return Math.ceil(this.dataCount / this.maxRows) || 1;
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
    },
    methods: {
        onRemoveAllFilters() {
            this.$emit('remove-all-filters');
        },
        onBulkActionSelect(option) {
            const rowIds = this.isSelectedAllRows
                ? this.rowIds
                : Object.keys(this.selectedRows);

            option.action({
                payload: {
                    rowIds,
                },
                onSuccess: () => {
                    this.selectedRows = {};
                    this.isSelectedAllRows = false;
                },
                onError: () => {
                    throw new Error('Mass action is either without defined an action nor is not valid');
                },
            });
        },
        onRowSelect(selectedRows) {
            this.selectedRows = selectedRows;
        },
        onRowsSelect(isSelectedAllRows) {
            this.isSelectedAllRows = isSelectedAllRows;
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
        onSortColumn(sortedColumn) {
            this.sortedColumn = sortedColumn;
            this.emitFetchData();
        },
        onRenderedTableLayout() {
            this.isRenderingTableLayout = false;
        },
        onFilterChange(filters) {
            this.$emit('filter', filters);
        },
        onCurrentPageChange(page) {
            this.currentPage = page;
            this.emitFetchData();
        },
        onMaxRowsChange(maxRows) {
            const number = Math.trunc(maxRows);

            if (number !== this.maxRows) {
                this.currentPage = 1;
                this.maxRows = number;

                this.emitFetchData();
            }
        },
        emitFetchData() {
            this.$emit('fetch-data', {
                sortedColumn: this.sortedColumn,
                filter: this.filters,
                offset: (this.currentPage - 1) * this.maxRows,
                limit: this.maxRows,
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
        min-width: 0;
        overflow: hidden;

        &--border {
            border: $BORDER_1_GREY;
        }
    }
</style>
