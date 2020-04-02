/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="pinnedColumnClass">
        <GridCell
            :column="columnIndex"
            :row="rowsOffset"
            :locked="true" />
        <GridCell
            v-if="isBasicFilters"
            class="grid-cell-filter"
            :column="columnIndex"
            :row="rowsOffset + basicFiltersOffset"
            :locked="true" />
        <template v-for="(links, index) in rowLinks">
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
                @removeAtIndex="onRemoveAtIndex" />
        </template>
    </div>
</template>

<script>
import GridEditRowCell from '@Core/components/Grid/EditCells/GridEditRowCell';
import GridRemoveRowCell from '@Core/components/Grid/EditCells/GridRemoveRowCell';
import GridCell from '@Core/components/Grid/GridCell';

export default {
    name: 'GridActionColumn',
    components: {
        GridCell,
        GridEditRowCell,
        GridRemoveRowCell,
    },
    props: {
        columnIndex: {
            type: Number,
            required: true,
        },
        rowsOffset: {
            type: Number,
            default: 0,
        },
        rowLinks: {
            type: Array,
            required: true,
        },
        isPinned: {
            type: Boolean,
            required: true,
        },
        isBasicFilters: {
            type: Boolean,
            default: true,
        },
        isSelectedAllRows: {
            type: Boolean,
            required: true,
        },
        selectedRows: {
            type: Object,
            required: true,
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
            return this.isBasicFilters ? 1 : 0;
        },
    },
    methods: {
        onEdit(args) {
            this.$emit('editRow', args);
        },
        onRemoveAtIndex(index) {
            this.$emit('removeRowAtIndex', index);
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

        & > .grid-cell:nth-child(1) {
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
