/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="pinnedColumnClass">
        <GridTableCell
            :column="columnIndex"
            :row="rowsOffset"
            :locked="true" />
        <GridTableCell
            v-if="isBasicFilter"
            class="grid-cell-filter"
            :column="columnIndex"
            :row="rowsOffset + basicFiltersOffset"
            :locked="true" />
        <template v-for="(links, index) in data">
            <GridEditRowCell
                :key="`${index}|edit`"
                :link="links.get"
                :column="columnIndex"
                :row="rowsOffset + index + basicFiltersOffset + 1"
                :is-selected="isSelectedAllRows
                    || selectedRows[rowsOffset + index + basicFiltersOffset + 1]"
                @edit="onEdit" />
            <GridRemoveRowCell
                :key="`${index}|remove`"
                :link="links.delete"
                :index="index"
                :column="columnIndex + 1"
                :row="rowsOffset + index + basicFiltersOffset + 1"
                :is-selected="isSelectedAllRows
                    || selectedRows[rowsOffset + index + basicFiltersOffset + 1]"
                @remove="onRemoveRow" />
        </template>
    </div>
</template>

<script>
import GridEditRowCell from '@Core/components/Grid/EditCells/GridEditRowCell';
import GridRemoveRowCell from '@Core/components/Grid/EditCells/GridRemoveRowCell';
import GridTableCell from '@Core/components/Grid/Layout/Table/Cells/GridTableCell';

export default {
    name: 'GridActionColumn',
    components: {
        GridTableCell,
        GridEditRowCell,
        GridRemoveRowCell,
    },
    props: {
        columnIndex: {
            type: Number,
            required: true,
        },
        data: {
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
        isSelectedAllRows: {
            type: Boolean,
            default: false,
        },
        selectedRows: {
            type: Object,
            default: () => ({}),
        },
    },
    computed: {
        pinnedColumnClass() {
            return [
                'pinned-column',
                {
                    'pinned-column--right': this.isPinned,
                },
            ];
        },
        basicFiltersOffset() {
            return this.isBasicFilter ? 1 : 0;
        },
    },
    methods: {
        onEdit(args) {
            this.$emit('editRow', args);
        },
        onRemoveRow(index) {
            this.$emit('removeRow', index);
        },
    },
};
</script>

<style lang="scss" scoped>
    .pinned-column {
        position: sticky;
        right: 0;
        z-index: $Z_INDEX_LVL_3;
        display: grid;
        box-sizing: border-box;
        background-color: $WHITE;

        &--right {
            box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.2);
        }

        & > .grid-table-cell:nth-child(1) {
            position: sticky;
            top: 0;
            z-index: $Z_INDEX_LVL_2;
            grid-column: 1 / 3;
            grid-row: 1;
            background-color: $WHITESMOKE;
        }

        .grid-cell-filter {
            grid-column: 1 / 3;
            grid-row: 2;
        }
    }

    .grid-action-cell {
        display: flex;
    }
</style>
