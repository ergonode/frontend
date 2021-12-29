/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="grid-select-collection-header-cell">
        <CheckBox
            :value="rowsSelectionState"
            @input="onSelectAll" />
        <GridSelectRowActionFabCell
            :disabled="!isAnyData"
            @select-all-global="onSelectAllGlobal"
            @select-all-on-this-page="onSelectAllOnThisPage"
            @deselect-all-global="onDeselectAllGlobal"
            @deselect-all-on-this-page="onDeselectAllOnThisPage" />
    </div>
</template>

<script>
import {
    deepClone,
} from '@Core/models/objectWrapper';

export default {
    name: 'GridSelectCollectionHeaderCell',
    props: {
        /**
         * List of row ids
         */
        rowIds: {
            type: Array,
            default: () => [],
        },
        /**
         * The map of rows excluded from selection
         */
        excludedFromSelectionRows: {
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
        isAnyData() {
            return this.rowIds.length > 0;
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
    },
};
</script>

<style lang="scss" scoped>
    .grid-select-collection-header-cell {
        display: flex;
        align-items: center;
    }
</style>
