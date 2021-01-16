/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridActionColumn>
        <GridTableCell
            editing-allowed
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
            <GridCheckPlaceholderCell />
        </GridTableCell>
        <GridSelectRowEditCell
            v-for="(row, rowIndex) in dataCount"
            :key="row"
            :column="0"
            :disabled="disabledRows[rowIds[rowIndex]]"
            :row="rowsOffset + row + basicFiltersOffset"
            :selected="selectedRows[rowsOffset + row + basicFiltersOffset]"
            @select="onSelectRow" />
    </GridActionColumn>
</template>

<script>
import GridCheckPlaceholderCell from '@UI/components/Grid/GridCheckPlaceholderCell';
import GridCheckEditCell from '@UI/components/Grid/Layout/Table/Cells/Edit/GridCheckEditCell';
import GridSelectRowEditCell from '@UI/components/Grid/Layout/Table/Cells/Edit/GridSelectRowEditCell';
import GridTableCell from '@UI/components/Grid/Layout/Table/Cells/GridTableCell';
import GridActionColumn from '@UI/components/Grid/Layout/Table/Columns/GridActionColumn';

export default {
    name: 'GridSelectRowColumn',
    components: {
        GridActionColumn,
        GridTableCell,
        GridCheckEditCell,
        GridSelectRowEditCell,
        GridCheckPlaceholderCell,
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
    },
    computed: {
        isAnyData() {
            return this.dataCount > 0;
        },
        rowsSelectionState() {
            const {
                length,
            } = Object.keys(this.selectedRows);

            if (length === 0) {
                return 0;
            }

            if (this.dataCount === length) {
                return 1;
            }

            return 2;
        },
        basicFiltersOffset() {
            return this.isBasicFilter ? 1 : 0;
        },
    },
    methods: {
        onSelectAll() {
            if (this.rowsSelectionState > 0) {
                this.$emit('row-select', {});
            } else {
                const selectedRows = {};

                // If we had chosen option with selected all of the options, we need to remove it
                // and mark visible rows as selected
                const fixedIndex = this.isBasicFilter ? 2 : 1;

                for (let i = fixedIndex; i < this.dataCount + fixedIndex; i += 1) {
                    selectedRows[i + this.rowsOffset] = true;
                }

                this.$emit('row-select', selectedRows);
            }
        },
        onSelectRow({
            row,
            selected,
        }) {
            const selectedRows = {
                ...this.selectedRows,
            };

            if (selected) {
                selectedRows[row] = true;
            } else {
                delete selectedRows[row];
            }

            this.$emit('row-select', selectedRows);
        },
    },
};
</script>
