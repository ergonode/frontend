/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="action-column">
        <GridTableCell
            :column="columnIndex"
            :row="rowsOffset"
            :locked="true" />
        <GridTableCell
            v-if="isBasicFilter"
            :column="columnIndex"
            :row="rowsOffset + basicFiltersOffset"
            :locked="true" />
        <template v-for="(key, index) in dataCount">
            <slot
                name="cell"
                :index="index"
                :row-index="rowsOffset + index + basicFiltersOffset + 1" />
        </template>
    </div>
</template>

<script>
import GridTableCell from '@Core/components/Grid/Layout/Table/Cells/GridTableCell';

export default {
    name: 'GridActionColumn',
    components: {
        GridTableCell,
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
        dataCount: {
            type: Number,
            default: 0,
        },
        isBasicFilter: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        basicFiltersOffset() {
            return this.isBasicFilter ? 1 : 0;
        },
    },
};
</script>

<style lang="scss" scoped>
    .action-column {
        display: grid;
        background-color: $WHITE;

        & > .grid-table-cell:nth-child(1) {
            position: sticky;
            top: 0;
            z-index: $Z_INDEX_LVL_2;
            background-color: $WHITESMOKE;
        }
    }
</style>
