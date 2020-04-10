/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="pinnedColumnClass">
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
        <GridTableCell
            v-if="isBasicFilter"
            :locked="true"
            :row="rowsOffset + basicFiltersOffset"
            :column="0">
            <GridCheckPlaceholderCell />
        </GridTableCell>
        <GridEditSelectRowCell
            v-for="(id, rowIndex) in rowIds"
            :key="id"
            :column="0"
            :row="rowsOffset + rowIndex + basicFiltersOffset + 1"
            :is-selected="isSelectedAllRows
                || selectedRows[rowsOffset + rowIndex + basicFiltersOffset + 1]"
            @select="onSelectRow" />
    </div>
</template>

<script>
import GridTableCell from '@Core/components/Grid/Layout/Table/Cells/GridTableCell';

export default {
    name: 'GridSelectRowColumn',
    components: {
        GridTableCell,
        GridCheckEditCell: () => import('@Core/components/Grid/Layout/Table/Cells/Edit/GridCheckEditCell'),
        GridEditSelectRowCell: () => import('@Core/components/Grid/EditCells/GridEditSelectRowCell'),
        GridCheckPlaceholderCell: () => import('@Core/components/Grid/GridCheckPlaceholderCell'),
    },
    props: {
        rowIds: {
            type: Array,
            default: () => [],
        },
        rowsOffset: {
            type: Number,
            default: 0,
        },
        isPinned: {
            type: Boolean,
            default: false,
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
        pinnedColumnClass() {
            return [
                'pinned-column',
                {
                    'pinned-column--left': this.isPinned,
                },
            ];
        },
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
                    const { length } = this.rowIds;

                    for (let i = fixedIndex; i < length + fixedIndex; i += 1) {
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

<style lang="scss" scoped>
    .pinned-column {
        position: sticky;
        left: 0;
        z-index: $Z_INDEX_LVL_3;
        display: grid;
        box-sizing: border-box;
        background-color: $WHITE;

        &--left {
            box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.2);
        }

        & > .grid-table-cell:nth-child(1) {
            position: sticky;
            top: 0;
            z-index: $Z_INDEX_LVL_2;
            background-color: $WHITESMOKE;
        }
    }
</style>
