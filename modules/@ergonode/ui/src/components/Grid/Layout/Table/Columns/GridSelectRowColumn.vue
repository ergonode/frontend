/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridActionColumn>
        <GridTableCell
            editing-allowed
            :disabled="!isAnyData"
            :edit-key-code="32"
            :row="rowsOffset"
            :column="0"
            @mousedown.native="onSelectAll"
            @edit="onSelectAll">
            <GridCheckEditCell
                :disabled="!isAnyData"
                :value="rowsSelectionState" />
        </GridTableCell>
        <GridTableCell
            v-if="isBasicFilter"
            :locked="true"
            :row="rowsOffset + 1"
            :column="0">
            <GridSelectRowActionFabCell
                :disabled="!isAnyData"
                @select-all-global="onSelectAllGlobal"
                @select-all-on-this-page="onSelectAllOnThisPage"
                @deselect-all-global="onDeselectAllGlobal"
                @deselect-all-on-this-page="onDeselectAllOnThisPage" />
        </GridTableCell>
        <GridSelectRowEditCell
            v-for="(row, rowIndex) in dataCount"
            :key="row"
            :column="0"
            :disabled="disabledRows[rowIds[rowIndex]]"
            :row="rowsOffset + row + basicFiltersOffset"
            :row-id="rowIds[rowIndex]"
            :selected="getSelectedRowState(rowIndex)"
            @select="onSelectRow" />
    </GridActionColumn>
</template>

<script>
import {
    deepClone,
} from '@Core/models/objectWrapper';
import GridCheckEditCell from '@UI/components/Grid/Layout/Table/Cells/Edit/GridCheckEditCell';
import GridSelectRowEditCell from '@UI/components/Grid/Layout/Table/Cells/Edit/GridSelectRowEditCell';
import GridSelectRowActionFabCell from '@UI/components/Grid/Layout/Table/Cells/GridSelectRowActionFabCell';
import GridTableCell from '@UI/components/Grid/Layout/Table/Cells/GridTableCell';
import GridActionColumn from '@UI/components/Grid/Layout/Table/Columns/GridActionColumn';

export default {
    name: 'GridSelectRowColumn',
    components: {
        GridActionColumn,
        GridTableCell,
        GridCheckEditCell,
        GridSelectRowEditCell,
        GridSelectRowActionFabCell,
    },
    props: {
        /**
         * Column index of given component at the loop
         */
        columnIndex: {
            type: Number,
            required: true,
        },
        /**
         * Number of visible data
         */
        dataCount: {
            type: Number,
            default: 0,
        },
        /**
         * List of row ids
         */
        rowIds: {
            type: Array,
            default: () => [],
        },
        /**
         * The disabled rows are defining which rows are not being able to interact with
         */
        disabledRows: {
            type: Object,
            default: () => ({}),
        },
        /**
         * The map of selected rows
         */
        selectedRows: {
            type: Object,
            default: () => ({}),
        },
        /**
         * The map of rows excluded from selection
         */
        excludedFromSelectionRows: {
            type: Object,
            default: () => ({}),
        },
        /**
         * The number from which rows are enumerated
         */
        rowsOffset: {
            type: Number,
            default: 0,
        },
        /**
         * Determines if filters are visible
         */
        isBasicFilter: {
            type: Boolean,
            default: false,
        },
        /**
         * Determines if every row should be selected
         */
        isSelectedAll: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        isAnyData() {
            return this.dataCount > 0;
        },
        rowsSelectionState() {
            if (this.isSelectedAll) {
                if (this.rowIds.every(rowId => this.excludedFromSelectionRows[rowId])) {
                    return 0;
                }

                if (this.rowIds.every(rowId => !this.excludedFromSelectionRows[rowId])) {
                    return 1;
                }

                return 2;
            }

            if (this.rowIds.every(rowId => !this.selectedRows[rowId])) {
                return 0;
            }

            if (this.rowIds.every(rowId => this.selectedRows[rowId])) {
                return 1;
            }

            return 2;
        },
        basicFiltersOffset() {
            return this.isBasicFilter ? 1 : 0;
        },
    },
    methods: {
        onSelectAllGlobal() {
            this.$emit('select-all', true);
        },
        onSelectAllOnThisPage() {
            if (this.isSelectedAll) {
                this.$emit('excluded-rows-select', {
                    isExcluded: false,
                    rowIds: deepClone(this.rowIds),
                });
            } else {
                this.$emit('rows-select', {
                    isSelected: true,
                    rowIds: deepClone(this.rowIds),
                });
            }
        },
        onDeselectAllGlobal() {
            this.$emit('select-all', false);
        },
        onDeselectAllOnThisPage() {
            if (this.isSelectedAll) {
                this.$emit('excluded-rows-select', {
                    isExcluded: true,
                    rowIds: deepClone(this.rowIds),
                });
            } else {
                this.$emit('rows-select', {
                    isSelected: false,
                    rowIds: deepClone(this.rowIds),
                });
            }
        },
        onSelectAll() {
            if (this.isSelectedAll) {
                this.$emit('excluded-rows-select', {
                    isExcluded: this.rowsSelectionState > 0,
                    rowIds: deepClone(this.rowIds),
                });
            } else {
                this.$emit('rows-select', {
                    isSelected: this.rowsSelectionState === 0,
                    rowIds: deepClone(this.rowIds),
                });
            }
        },
        onSelectRow({
            row,
            selected,
        }) {
            if (this.isSelectedAll) {
                this.$emit('excluded-rows-select', {
                    isExcluded: !selected,
                    rowIds: [
                        row,
                    ],
                });
            } else {
                this.$emit('rows-select', {
                    isSelected: selected,
                    rowIds: [
                        row,
                    ],
                });
            }
        },
        getSelectedRowState(index) {
            return this.selectedRows[this.rowIds[index]]
                || (this.isSelectedAll && !this.excludedFromSelectionRows[this.rowIds[index]]);
        },
    },
};
</script>
