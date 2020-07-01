/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

<template>
    <div
        data-cy="grid"
        class="grid">
        <GridHeader
            v-if="isHeaderVisible"
            :row-height="tableLayoutConfig.rowHeight"
            :layout="layout"
            :table-layout-config="tableLayoutConfig"
            :collection-layout-config="collectionLayoutConfig"
            :is-advanced-filters="isAdvancedFilters"
            :is-collection-layout="isCollectionLayout"
            :is-centered-view="isCenteredView"
            :filters="advancedFilters"
            @filter="onAdvancedFilterChange"
            @layoutChange="onLayoutChange"
            @applySettings="onApplySettings"
            @dropFilter="onDropFilter">
            <template #actions>
                <slot name="actions" />
            </template>
            <template #configuration>
                <slot name="configuration" />
            </template>
        </GridHeader>
        <GridBody :disabled="isListElementDragging && isColumnExists">
            <GridPreloader v-if="isPrefetchingData" />
            <template v-else>
                <DropZone
                    v-show="isListElementDragging && !isColumnExists"
                    title="ADD COLUMN"
                    @drop="onDropColumn">
                    <template #icon="{ color }">
                        <IconAddColumn :fill-color="color" />
                    </template>
                </DropZone>
                <GridTableLayout
                    v-if="isTableLayout"
                    :columns="columns"
                    :data="data"
                    :current-page="currentPage"
                    :max-rows="maxRows"
                    :row-height="tableLayoutConfig.rowHeight"
                    :is-editable="isEditable"
                    :is-select-column="isSelectColumn"
                    :is-basic-filter="isBasicFilter"
                    @sort="onSortColumn"
                    @filter="onFilterChange"
                    @editCell="onEditCell"
                    @editCells="onEditCells"
                    @focusCell="onFocusCell"
                    @editRow="onEditRow"
                    @removeRow="onRemoveRow" />
                <GridCollectionLayout
                    v-else-if="isCollectionLayout && collectionData.length"
                    :data="collectionData"
                    :columns-number="collectionLayoutConfig.columnsNumber"
                    :object-fit="collectionLayoutConfig.scaling"
                    @editRow="onEditRow" />
                <GridPlaceholder v-if="!dataCount" />
            </template>
        </GridBody>
        <GridFooter v-if="isFooterVisible">
            <GridPageSelector
                :value="maxRows"
                :max-rows="dataCount"
                @input="onMaxRowsChange" />
            <GridPagination
                :value="currentPage"
                :max-page="maxPage"
                @input="onCurrentPageChange" />
            <slot name="appendFooter" />
        </GridFooter>
    </div>
</template>

<script>
import GridBody from '@Core/components/Grid/GridBody';
import GridFooter from '@Core/components/Grid/GridFooter';
import GridPreloader from '@Core/components/Grid/GridPreloader';
import {
    COLUMN_ACTIONS_ID,
    COLUMNS_NUMBER,
    DATA_LIMIT,
    DRAGGED_ELEMENT,
    GRID_LAYOUT,
    IMAGE_SCALING,
    ROW_HEIGHT,
} from '@Core/defaults/grid';
import {
    insertCookieAtIndex,
} from '@Core/models/cookies';
import {
    getMergedFilters,
} from '@Core/models/mappers/gridDataMapper';
import {
    mapState,
} from 'vuex';

export default {
    name: 'Grid',
    components: {
        GridHeader: () => import('@Core/components/Grid/Header/GridHeader'),
        GridTableLayout: () => import('@Core/components/Grid/Layout/Table/GridTableLayout'),
        GridCollectionLayout: () => import('@Core/components/Grid/Layout/Collection/GridCollectionLayout'),
        GridPlaceholder: () => import('@Core/components/Grid/GridPlaceholder'),
        GridPagination: () => import('@Core/components/Grid/Footer/GridPagination'),
        GridPageSelector: () => import('@Core/components/Grid/Footer/GridPageSelector'),
        DropZone: () => import('@Core/components/DropZone/DropZone'),
        IconAddColumn: () => import('@Core/components/Icons/Actions/IconAddColumn'),
        GridPreloader,
        GridBody,
        GridFooter,
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
        collectionCellBinding: {
            type: Object,
            default: () => ({
                imageColumn: '',
                descriptionColumn: '',
            }),
        },
        defaultLayout: {
            type: String,
            default: GRID_LAYOUT.TABLE,
            validator: value => Object.values(GRID_LAYOUT).indexOf(value) !== -1,
        },
        dataCount: {
            type: Number,
            required: true,
        },
        isPrefetchingData: {
            type: Boolean,
            default: false,
        },
        isAdvancedFilters: {
            type: Boolean,
            default: false,
        },
        isCollectionLayout: {
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
        isBasicFilter: {
            type: Boolean,
            default: false,
        },
        isSelectColumn: {
            type: Boolean,
            default: false,
        },
        isFooterVisible: {
            type: Boolean,
            default: true,
        },
        isHeaderVisible: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            layout: this.defaultLayout,
            maxRows: DATA_LIMIT,
            currentPage: 1,
            filterValues: {},
            advancedFilterValues: {},
            sortedColumn: {},
            collectionLayoutConfig: {
                columnsNumber: COLUMNS_NUMBER.FOURTH_COLUMNS.value,
                scaling: IMAGE_SCALING.FIT_TO_SIZE.value,
            },
            tableLayoutConfig: {
                rowHeight: ROW_HEIGHT.MEDIUM,
            },
        };
    },
    computed: {
        ...mapState('draggable', {
            isElementDragging: state => state.isElementDragging,
            draggedElement: state => state.draggedElement,
        }),
        isListElementDragging() {
            return this.isElementDragging === DRAGGED_ELEMENT.LIST;
        },
        isColumnExists() {
            const draggedElIndex = this.columns.findIndex(
                column => column.id === this.draggedElement,
            );

            return draggedElIndex !== -1;
        },
        isTableLayout() {
            return this.layout === GRID_LAYOUT.TABLE;
        },
        maxPage() {
            return Math.ceil(this.dataCount / this.maxRows) || 1;
        },
        collectionData() {
            const {
                imageColumn, descriptionColumn,
            } = this.collectionCellBinding;

            if (!(imageColumn && descriptionColumn && this.data[descriptionColumn])) {
                return [];
            }

            const collectionData = [];
            const actionKeys = this.data[COLUMN_ACTIONS_ID]
                ? Object.keys(this.data[COLUMN_ACTIONS_ID])
                : [];

            for (let i = 0; i < this.data[descriptionColumn].length; i += 1) {
                const actions = {};

                if (this.data[COLUMN_ACTIONS_ID]) {
                    for (let j = 0; j < actionKeys.length; j += 1) {
                        const actionKey = actionKeys[j];

                        actions[actionKey] = this.data[COLUMN_ACTIONS_ID][actionKey][i];
                    }
                }

                collectionData.push({
                    actions,
                    image: this.data[imageColumn]
                        ? this.data[imageColumn][i].value
                        : '',
                    description: this.data[descriptionColumn]
                        ? this.data[descriptionColumn][i].value
                        : '',
                });
            }

            return collectionData;
        },
    },
    methods: {
        onApplySettings({
            tableConfig, collectionConfig,
        }) {
            this.tableLayoutConfig = tableConfig;
            this.collectionLayoutConfig = collectionConfig;
        },
        onLayoutChange(layout) {
            this.layout = layout;
        },
        onEditCell(payload) {
            this.$emit('editCell', payload);
        },
        onEditCells(payload) {
            this.$emit('editCells', payload);
        },
        onFocusCell(payload) {
            this.$emit('focusCell', payload);
        },
        onEditRow(args) {
            this.$emit('editRow', args);
        },
        onRemoveRow(index) {
            this.$emit('removeRow', index);
        },
        onDropColumn(columnId) {
            insertCookieAtIndex({
                cookies: this.$cookies,
                cookieName: `GRID_CONFIG:${this.$route.name}`,
                index: this.isSelectColumn ? 1 : 0,
                data: columnId,
            });
            this.$emit('dropColumn', columnId);
        },
        onSortColumn(sortedColumn) {
            this.sortedColumn = sortedColumn;
            this.emitFetchData();
        },
        onFilterChange(filters) {
            this.filterValues = {
                ...filters,
            };

            this.emitFetchData();
        },
        onAdvancedFilterChange(filters) {
            this.advancedFilterValues = {
                ...filters,
            };

            this.emitFetchData();
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
        onDropFilter(payload) {
            this.$emit('dropFilter', payload);
        },
        emitFetchData() {
            this.$emit('fetchData', {
                sortedColumn: this.sortedColumn,
                filters: getMergedFilters({
                    basic: this.filterValues,
                    advanced: this.advancedFilterValues,
                }),
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
    }
</style>
