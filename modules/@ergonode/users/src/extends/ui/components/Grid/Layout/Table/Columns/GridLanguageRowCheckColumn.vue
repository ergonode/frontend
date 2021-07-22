/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridColumn>
        <template #header>
            <GridTableCell
                editing-allowed
                :edit-key-code="32"
                :row="rowsOffset"
                :column="0"
                @mousedown.native="onSelectAllRows"
                @edit="onSelectAllRows">
                <GridCheckEditCell :value="rowsSelectionState" />
            </GridTableCell>
        </template>
        <GridTableCell
            v-for="(rowId, rowIndex) in rowIds"
            :key="rowIndex"
            :column="0"
            :edit-key-code="32"
            :row="rowsOffset + rowIndex + 1"
            @mousedown.native="onSelectRow({ rowId, value: !selectedRows[rowId] })"
            @edit="onSelectRow({ rowId, value: !selectedRows[rowId] })">
            <GridCheckEditCell :value="selectedRows[rowId]" />
        </GridTableCell>
    </GridColumn>
</template>

<script>
import GridColumn from '@UI/components/Grid/Layout/Table/Columns/GridColumn';
import selectRowMixin from '@Users/mixins/grid/columns/selectRowMixin';

export default {
    name: 'GridLanguageRowCheckColumn',
    components: {
        GridColumn,
    },
    mixins: [
        selectRowMixin,
    ],
    methods: {
        onSelectAllRows() {
            const value = !this.rowsSelectionState;

            const cellValues = [];

            this.rowIds.forEach((rowId) => {
                cellValues.push(...[
                    'read',
                    'edit',
                ].map(columnId => ({
                    rowId,
                    columnId,
                    value: +value,
                })));
            });

            this.$emit('cell-value', cellValues);
        },
        onSelectRow({
            rowId, value,
        }) {
            this.$emit('cell-value', [
                'read',
                'edit',
            ].map(columnId => ({
                rowId,
                columnId,
                value: +value,
            })));
        },
    },
};
</script>
