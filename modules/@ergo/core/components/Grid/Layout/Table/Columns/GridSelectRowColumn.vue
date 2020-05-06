/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridActionColumn
        :column-index="columnIndex"
        :rows-offset="rowsOffset"
        :data-count="dataCount"
        :is-basic-filter="isBasicFilter">
        <template #headerCell>
            <GridTableCell
                editing-allowed
                :edit-key-code="32"
                :row="rowsOffset"
                :column="0"
                @edit="onSelectAllRows">
                <GridCheckEditCell
                    :value="rowsSelectionState"
                    @input="onSelectAllRows" />
            </GridTableCell>
        </template>
        <template #filterCell="{ rowIndex }">
            <GridTableCell
                v-if="isBasicFilter"
                :locked="true"
                :row="rowIndex"
                :column="0">
                <GridCheckPlaceholderCell />
            </GridTableCell>
        </template>
        <template #cell="{ index, rowIndex }">
            <GridSelectRowEditCell
                :key="index"
                :column="0"
                :row="rowIndex"
                :is-selected="isSelectedAllRows
                    || selectedRows[rowIndex]"
                @select="onSelectRow" />
        </template>
    </GridActionColumn>
</template>

<script>
import GridTableCell from '@Core/components/Grid/Layout/Table/Cells/GridTableCell';
import GridActionColumn from '@Core/components/Grid/Layout/Table/Columns/Action/GridActionColumn';

export default {
    name: 'GridSelectRowColumn',
    components: {
        GridActionColumn,
        GridTableCell,
        GridCheckEditCell: () => import('@Core/components/Grid/Layout/Table/Cells/Edit/GridCheckEditCell'),
        GridSelectRowEditCell: () => import('@Core/components/Grid/Layout/Table/Cells/Edit/GridSelectRowEditCell'),
        GridCheckPlaceholderCell: () => import('@Core/components/Grid/GridCheckPlaceholderCell'),
    },
    props: {
        columnIndex: {
            type: Number,
            required: true,
        },
        dataCount: {
            type: Number,
            default: 0,
        },
        rowsOffset: {
            type: Number,
            default: 0,
        },
        isBasicFilter: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            selectedRows: {},
            isSelectedAllRows: false,
        };
    },
    computed: {
        rowsSelectionState() {
            const rowsAreSelected = Boolean(Object.keys(this.selectedRows).length);

            if (!rowsAreSelected) {
                return +this.isSelectedAllRows;
            }

            return 2;
        },
        basicFiltersOffset() {
            return this.isBasicFilter ? 1 : 0;
        },
    },
    methods: {
        onSelectAllRows() {
            const anyRowsSelected = Object.entries(this.selectedRows).length;

            if (anyRowsSelected) {
                this.selectedRows = {};
            } else {
                this.isSelectedAllRows = !this.isSelectedAllRows;

                this.$emit('rowsSelect', this.isSelectedAllRows);
            }
        },
        onSelectRow({ row, isSelected }) {
            if (isSelected) {
                this.selectedRows[row] = true;
            } else {
                delete this.selectedRows[row];

                if (this.isSelectedAllRows) {
                    // If we had chosen option with selected all of the options, we need to remove it
                    // and mark visible rows as selected
                    const fixedIndex = this.isBasicFilter ? 2 : 1;

                    for (let i = fixedIndex; i < this.dataCount + fixedIndex; i += 1) {
                        if (i !== row) {
                            this.selectedRows[i] = true;
                        }
                    }

                    this.isSelectedAllRows = false;
                }
            }

            this.selectedRows = { ...this.selectedRows };

            this.$emit('rowSelect', this.selectedRows);
            this.$emit('rowsSelect', this.isSelectedAllRows);
        },
    },
};
</script>
