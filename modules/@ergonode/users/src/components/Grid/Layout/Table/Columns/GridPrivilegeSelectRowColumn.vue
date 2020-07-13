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
            v-for="(id, rowIndex) in rowIds"
            :key="id"
            :column="0"
            :edit-key-code="32"
            :row="rowsOffset + rowIndex + 1"
            @mousedown="onSelectRow({ rowId: id, value: !selectedRows[id] })"
            @edit="onSelectRow({ rowId: id, value: !selectedRows[id] })">
            <GridCheckEditCell
                :value="selectedRows[id]"
                :row-id="id" />
        </GridTableCell>
    </div>
</template>

<script>
import selectRowMixin from '@Users/mixins/grid/columns/selectRowMixin';

export default {
    name: 'GridPrivilegeSelectRowColumn',
    mixins: [
        selectRowMixin,
    ],
    methods: {
        onSelectAllRows() {
            const value = !this.rowsSelectionState;
            const draftValues = {};

            this.rowIds.forEach((rowId) => {
                draftValues[rowId] = {
                    read: value,
                    create: value,
                    update: value,
                    delete: value,
                };

                this.selectedRows[rowId] = +value;
            });

            this.setDrafts(draftValues);
            this.selectedRows = {
                ...this.selectedRows,
            };
        },
        onSelectRow({
            rowId, value,
        }) {
            this.selectedRows[rowId] = +value;
            this.selectedRows = {
                ...this.selectedRows,
            };

            this.setDrafts({
                [rowId]: {
                    read: +value,
                    create: +value,
                    update: +value,
                    delete: +value,
                },
            });
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
