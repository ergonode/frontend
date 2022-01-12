/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridActionColumn>
        <template #header>
            <GridTableCell
                :locked="true"
                :row="rowsOffset"
                :column="0" />
        </template>
        <GridTableCell
            v-if="isBasicFilter"
            :locked="true"
            :row="rowsOffset + 1"
            :column="0" />
        <GridSelectRowEditCell
            v-for="(row, rowIndex) in dataCount"
            :key="row"
            :column="0"
            :disabled="disabledRows[rowIds[rowIndex]]"
            :row="rowsOffset + row + basicFiltersOffset"
            :row-id="rowIds[rowIndex]"
            :selected="selectedRows[rowIds[rowIndex]]"
            @select="onSelectRow" />
    </GridActionColumn>
</template>

<script>
import GridSelectRowEditCell from '@UI/components/Grid/Layout/Table/Cells/Edit/GridSelectRowEditCell';
import GridActionColumn from '@UI/components/Grid/Layout/Table/Columns/GridActionColumn';

export default {
    name: 'GridSelectRowColumn',
    components: {
        GridActionColumn,
        GridSelectRowEditCell,
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
        basicFiltersOffset() {
            return this.isBasicFilter ? 1 : 0;
        },
    },
    methods: {
        onRowsSelect(payload) {
            this.$emit('rows-select', payload);
        },
        onSelectRow({
            row,
            selected,
        }) {
            this.$emit('rows-select', {
                isSelected: selected,
                rowIds: [
                    row,
                ],
            });
        },
    },
};
</script>
