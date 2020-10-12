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
            :filter-values="advancedFilterValues"
            @filter="onAdvancedFilterChange"
            @layout-change="onLayoutChange"
            @apply-settings="onApplySettings"
            @drop-filter="onDropFilter">
            <template #actions>
                <slot name="headerActions" />
            </template>
            <template #configuration>
                <slot name="headerConfiguration" />
            </template>
            <template #panel>
                <slot name="headerPanel" />
            </template>
        </GridHeader>
        <GridBody
            :disabled="isListElementDragging && isColumnExists"
            :is-border="isHeaderVisible">
            <DropZone
                v-show="isListElementDragging && !isColumnExists"
                title="ADD COLUMN"
                @drop="onDropColumn">
                <template #icon="{ color }">
                    <IconAddColumn :fill-color="color" />
                </template>
            </DropZone>
            <Preloader v-show="isPrefetchingData" />
            <KeepAlive>
                <GridTableLayout
                    v-if="isTableLayout && !isPrefetchingData"
                    :columns="columns"
                    :action-columns="actionColumns"
                    :rows="rows"
                    :row-ids="rowIds"
                    :drafts="drafts"
                    :errors="errors"
                    :filters="filterValues"
                    :current-page="currentPage"
                    :max-rows="maxRows"
                    :row-height="tableLayoutConfig.rowHeight"
                    :is-editable="isEditable"
                    :is-select-column="isSelectColumn"
                    :is-basic-filter="isBasicFilter"
                    @sort="onSortColumn"
                    @filter="onFilterChange"
                    @cell-value="onCellValueChange"
                    @focus-cell="onFocusCell"
                    @row-action="onRowAction" />
                <GridCollectionLayout
                    v-else-if="isCollectionLayout && !isPrefetchingData && !isPlaceholderVisible"
                    :rows="rows"
                    :row-ids="rowIds"
                    :collection-cell-binding="collectionCellBinding"
                    :drafts="drafts"
                    :columns-number="collectionLayoutConfig.columnsNumber"
                    :object-fit="collectionLayoutConfig.scaling"
                    @row-action="onRowAction"
                    @cell-value="onCellValueChange" />
            </KeepAlive>
            <GridPlaceholder
                v-show="isPlaceholderVisible && noRecordsFilterPlaceholder"
                v-bind="{ ...noRecordsFilterPlaceholder }">
                <template #action>
                    <Button
                        title="REMOVE FILTERS"
                        :size="smallSize"
                        :theme="secondaryTheme"
                        @click.native="onRemoveAllFilters">
                        <template #prepend="{ color }">
                            <IconFilledClose :fill-color="color" />
                        </template>
                    </Button>
                </template>
            </GridPlaceholder>
            <GridPlaceholder
                v-show="isPlaceholderVisible && !noRecordsFilterPlaceholder"
                v-bind="{ ...placeholder }">
                <template #action>
                    <slot name="placeholderNoRecordsAction" />
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
    WHITESMOKE,
} from '@Core/assets/scss/_js-variables/colors.scss';
import Button from '@Core/components/Button/Button';
import GridPagination from '@Core/components/Grid/Footer/GridPagination';
import GridBody from '@Core/components/Grid/GridBody';
import GridFooter from '@Core/components/Grid/GridFooter';
import GridHeader from '@Core/components/Grid/Header/GridHeader';
import GridCollectionLayout from '@Core/components/Grid/Layout/Collection/GridCollectionLayout';
import GridTableLayout from '@Core/components/Grid/Layout/Table/GridTableLayout';
import IconFilledClose from '@Core/components/Icons/Window/IconFilledClose';
import Preloader from '@Core/components/Preloader/Preloader';
import {
    COLUMNS_NUMBER,
    DATA_LIMIT,
    DRAGGED_ELEMENT,
    GRID_ACTION,
    GRID_LAYOUT,
    IMAGE_SCALING,
    ROW_HEIGHT,
} from '@Core/defaults/grid';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import {
    getMergedFilters,
} from '@Core/models/mappers/gridDataMapper';
import {
    getUUID,
} from '@Core/models/stringWrapper';
import {
    mapState,
} from 'vuex';

export default {
    name: 'Grid',
    components: {
        Button,
        IconFilledClose,
        GridPagination,
        GridHeader,
        Preloader,
        GridBody,
        GridFooter,
        GridTableLayout,
        GridCollectionLayout,
        GridPlaceholder: () => import('@Core/components/Grid/GridPlaceholder'),
        GridPageSelector: () => import('@Core/components/Grid/Footer/GridPageSelector'),
        DropZone: () => import('@Core/components/DropZone/DropZone'),
        IconAddColumn: () => import('@Core/components/Icons/Actions/IconAddColumn'),
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
        errors: {
            type: Object,
            default: () => ({}),
        },
        advancedFilters: {
            type: Array,
            default: () => [],
        },
        collectionCellBinding: {
            type: Object,
            default: null,
        },
        placeholder: {
            type: Object,
            default: () => ({
                title: 'Nothing to see here',
                subtitle: 'There are no records in the system.',
                bgUrl: require('@Core/assets/images/placeholders/comments.svg'),
                color: WHITESMOKE,
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
        ...mapState('draggable', [
            'isElementDragging',
            'draggedElement',
        ]),
        noRecordsFilterPlaceholder() {
            if (!this.dataCount
                && (!Object.keys(this.filterValues).length
                    && !Object.keys(this.advancedFilterValues).length)) {
                return null;
            }

            return {
                title: 'No results',
                subtitle: 'There are no results that meet the conditions for the selected filters.',
                bgUrl: require('@Core/assets/images/placeholders/comments.svg'),
                color: WHITESMOKE,
            };
        },
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
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
            const gridActions = Object.values(GRID_ACTION);
            const {
                length: actionsLength,
            } = gridActions;
            const actionColumns = [];
            const tmp = {};

            for (let i = 0; i < dataLength; i += 1) {
                const row = this.rows[i];

                for (let j = 0; j < actionsLength; j += 1) {
                    const action = gridActions[j];

                    if (!tmp[action]
                        && row._links
                        && row._links.value[action]) {
                        tmp[action] = true;

                        if ((action === GRID_ACTION.GET && !tmp[GRID_ACTION.EDIT])
                            || action !== GRID_ACTION.GET) {
                            actionColumns.push({
                                id: action,
                            });
                        }
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
            this.advancedFilterValues = {};
            this.filterValues = {};

            this.emitFetchData();
        },
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
            this.$emit('cell-value', payload);
        },
        onFocusCell(payload) {
            this.$emit('focus-cell', payload);
        },
        onRowAction({
            key, value,
        }) {
            this.$emit(`${key}-row`, value);
        },
        onDropColumn(payload) {
            this.$emit('drop-column', payload);
        },
        onSortColumn(sortedColumn) {
            this.sortedColumn = sortedColumn;
            this.emitFetchData();
        },
        onFilterChange(filters) {
            this.filterValues = filters;

            this.emitFetchData();
        },
        onAdvancedFilterChange(filters) {
            this.advancedFilterValues = filters;

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
            this.$emit('drop-filter', payload);
        },
        emitFetchData() {
            this.$emit('fetch-data', {
                sortedColumn: this.sortedColumn,
                filter: getMergedFilters({
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
