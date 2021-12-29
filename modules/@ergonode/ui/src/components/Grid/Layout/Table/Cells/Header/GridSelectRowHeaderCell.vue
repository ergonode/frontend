/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridTableCell
        editing-allowed
        :disabled="disabled"
        :edit-key-code="32"
        :row="rowsOffset"
        :column="0"
        @mousedown.native="onSelectAll"
        @edit="onSelectAll">
        <GridCheckEditCell
            :disabled="disabled"
            :value="rowsSelectionState" />
    </GridTableCell>
</template>

<script>
import {
    deepClone,
} from '@Core/models/objectWrapper';
import GridCheckEditCell from '@UI/components/Grid/Layout/Table/Cells/Edit/GridCheckEditCell';

export default {
    name: 'GridSelectRowHeaderCell',
    components: {
        GridCheckEditCell,
    },
    props: {
        /**
         * The number from which rows are enumerated
         */
        rowsOffset: {
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
         * Determinate if the component is disabled
         */
        disabled: {
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
    },
    methods: {
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
    },
};
</script>
