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
            :row-height="tableLayoutConfig.rowHeight"
            :layout="layout"
            :table-layout-config="tableLayoutConfig"
            :collection-layout-config="collectionLayoutConfig"
            :is-advanced-filters="isAdvancedFilters"
            :is-collection-layout="isCollectionLayout"
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
        <GridBody
            :disabled="isListElementDragging && isColumnExists"
            :is-border="isHeaderVisible">
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
                <KeepAlive>
                    <GridTableLayout
                        v-if="isTableLayout"
                        :columns="columns"
                        :action-columns="actionColumns"
                        :rows="rows"
                        :drafts="drafts"
                        :current-page="currentPage"
                        :max-rows="maxRows"
                        :row-height="tableLayoutConfig.rowHeight"
                        :is-editable="isEditable"
                        :is-select-column="isSelectColumn"
                        :is-basic-filter="isBasicFilter"
                        @sort="onSortColumn"
                        @filter="onFilterChange"
                        @cellValue="onCellValueChange"
                        @cellValues="onCellValuesChanges"
                        @focusCell="onFocusCell"
                        @rowAction="onRowAction" />
                    <GridCollectionLayout
                        v-else-if="isCollectionLayout && collectionData.length"
                        :data="collectionData"
                        :columns-number="collectionLayoutConfig.columnsNumber"
                        :object-fit="collectionLayoutConfig.scaling"
                        @rowAction="onRowAction" />
                </KeepAlive>
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
    COLUMNS_NUMBER,
    DATA_LIMIT,
    DRAGGED_ELEMENT,
    GRID_ACTIONS,
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
        rows: {
            type: Array,
            default: () => [],
        },
        drafts: {
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
        isBorder: {
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
                rowHeight: ROW_HEIGHT.SMALL,
            },
        };
    },
    computed: {
        ...mapState('draggable', {
            isElementDragging: state => state.isElementDragging,
            draggedElement: state => state.draggedElement,
        }),
        classes() {
            return [
                'grid',
                {
                    'grid--border': this.isBorder,
                },
            ];
        },
        actionColumns() {
            const {
                length: dataLength,
            } = this.rows;
            const {
                length: actionsLength,
            } = GRID_ACTIONS;
            const actionColumns = [];
            const tmp = {};

            for (let i = 0; i < dataLength; i += 1) {
                const row = this.rows[i];

                for (let j = 0; j < actionsLength; j += 1) {
                    const action = GRID_ACTIONS[j];

                    if (!tmp[action] && row._links.value[action]) {
                        tmp[action] = true;
                        actionColumns.push({
                            id: action,
                        });
                    }
                }
            }

            return actionColumns;
        },
        isListElementDragging() {
            return this.isElementDragging === DRAGGED_ELEMENT.LIST;
        },
        isColumnExists() {
            return this.columns.some(
                column => column.id === this.draggedElement,
            );
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

            return this.rows
                .filter(row => row[imageColumn] || row[descriptionColumn])
                .map(row => ({
                    image: row[imageColumn] ? row[imageColumn].value : '',
                    description: row[descriptionColumn] ? row[descriptionColumn].value : '',
                }));
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
        onCellValueChange(payload) {
            this.$emit('cellValue', payload);
        },
        onCellValuesChanges(payload) {
            this.$emit('cellValues', payload);
        },
        onFocusCell(payload) {
            this.$emit('focusCell', payload);
        },
        onRowAction({
            key, value,
        }) {
            this.$emit(`${key}Row`, value);
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

        &--border {
            border: $BORDER_1_GREY;
        }
    }
</style>
