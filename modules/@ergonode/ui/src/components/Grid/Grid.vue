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
                    :sort-order="sortOrder"
                    :pagination="pagination"
                    :row-height="tableLayoutConfig.rowHeight"
                    :extended-components="extendedComponents[gridLayout.TABLE]"
                    :selected-rows="selectedRows[pagination.page]"
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
                    @row-select="onRowSelect"
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
                    :extended-components="extendedComponents[gridLayout.COLLECTION]"
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
import {
    WHITESMOKE,
} from '@UI/assets/scss/_js-variables/colors.scss';
import BatchActionButton from '@UI/components/Grid/Buttons/BatchActionButton';
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
        BatchActionButton,
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
            isRenderingTableLayout: this.defaultLayout === GRID_LAYOUT.TABLE,
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

            if (layout === GRID_LAYOUT.COLLECTION) {
                this.isRenderingTableLayout = false;
            }
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
        onRenderedTableLayout() {
            this.isRenderingTableLayout = false;
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
