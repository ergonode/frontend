/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="column">
        <GridTableCell
            editing-allowed
            :edit-key-code="32"
            :row="rowsOffset"
            :column="0"
            @mousedown="onSelectAllRows"
            @edit="onSelectAllRows">
            <GridCheckEditCell :value="rowsSelectionState" />
        </GridTableCell>
        <GridTableCell
            v-for="(rowId, rowIndex) in rowIds"
            :key="rowIndex"
            :column="0"
            :edit-key-code="32"
            :row="rowsOffset + rowIndex + 1"
            @mousedown="onSelectRow({ rowId, value: !selectedRows[rowId] })"
            @edit="onSelectRow({ rowId, value: !selectedRows[rowId] })">
            <GridCheckEditCell :value="selectedRows[rowId]" />
        </GridTableCell>
    </div>
</template>

<script>
import selectRowMixin from '@Users/mixins/grid/columns/selectRowMixin';

export default {
    name: 'GridPrivilegeRowCheckColumn',
    mixins: [
        selectRowMixin,
    ],
    props: {
        index: {
            type: Number,
            required: true,
        },
    },
    methods: {
        onSelectAllRows() {
            const value = !this.rowsSelectionState;

            const cellValues = [];

            this.rowIds.forEach((rowId) => {
                cellValues.push(...[
                    'read',
                    'create',
                    'update',
                    'delete',
                ].map(columnId => ({
                    rowId,
                    columnId,
                    value: +value,
                })));
            });

            this.$emit('cellValue', cellValues);
        },
        onSelectRow({
            rowId, value,
        }) {
            this.$emit('cellValue', [
                'read',
                'create',
                'update',
                'delete',
            ].map(columnId => ({
                rowId,
                columnId,
                value: +value,
            })));
        },
    },
};
</script>

<style lang="scss" scoped>
    .column {
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
