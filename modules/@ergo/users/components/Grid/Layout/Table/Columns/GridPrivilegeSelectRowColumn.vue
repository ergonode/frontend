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
            @edit="onSelectAllRows(!rowsSelectionState)">
            <GridCheckEditCell
                :value="rowsSelectionState"
                @input="onSelectAllRows" />
        </GridTableCell>
        <GridTableCell
            v-for="(id, rowIndex) in rowIds"
            :key="id"
            :column="0"
            :edit-key-code="32"
            :row="rowsOffset + rowIndex + 1"
            @edit="onSelectRow({ rowId: id, value: !selectedRows[id] })">
            <GridCheckEditCell
                :value="selectedRows[id]"
                :row-id="id"
                @input="onSelectRow({ rowId: id, value: !selectedRows[id] })"
            />
        </GridTableCell>
    </div>
</template>

<script>
import selectRowMixin from '@Users/mixins/grid/columns/selectRowMixin';

export default {
    name: 'GridPrivilegeSelectRowColumn',
    mixins: [selectRowMixin],
    methods: {
        onSelectAllRows(value) {
            const draftValues = {};

            this.rowIds.forEach((rowId) => {
                if (!draftValues[rowId]) draftValues[rowId] = {};
                if (!draftValues[rowId].read) draftValues[rowId].read = {};
                if (!draftValues[rowId].create) draftValues[rowId].create = {};
                if (!draftValues[rowId].update) draftValues[rowId].update = {};
                if (!draftValues[rowId].delete) draftValues[rowId].delete = {};

                draftValues[rowId] = {
                    read: value,
                    create: value,
                    update: value,
                    delete: value,
                };

                this.selectedRows[rowId] = +value;
            });

            this.setDraftsValues(draftValues);
            this.selectedRows = { ...this.selectedRows };
        },
        onSelectRow({ rowId, value }) {
            this.selectedRows[rowId] = +value;
            this.selectedRows = { ...this.selectedRows };

            this.setDraftRowValues({
                rowId,
                value: {
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
