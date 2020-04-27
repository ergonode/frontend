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
import { mapState, mapActions } from 'vuex';
import { STATE } from '@Core/defaults/inputs/checkbox';
import GridTableCell from '@Core/components/Grid/Layout/Table/Cells/GridTableCell';
import GridCheckEditCell from '@Core/components/Grid/Layout/Table/Cells/Edit/GridCheckEditCell';

export default {
    name: 'GridLanguageSelectRowColumn',
    components: {
        GridTableCell,
        GridCheckEditCell,
    },
    props: {
        rowIds: {
            type: Array,
            default: () => [],
        },
        data: {
            type: Array,
            default: () => [],
        },
        rowsOffset: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            selectedRows: {},
            isSelectedAllRows: false,
        };
    },
    computed: {
        ...mapState('grid', {
            drafts: state => state.drafts,
        }),
        rowsSelectionState() {
            if (this.rowsAreDeselected) {
                return STATE.UNCHECK;
            }

            if (this.rowsAreSelected) {
                return STATE.CHECK;
            }

            return STATE.CHECK_ANY;
        },
        selectedRowsValues() {
            return Object.values(this.selectedRows);
        },
        rowsAreDeselected() {
            return this.selectedRowsValues.every(rowState => rowState === STATE.UNCHECK);
        },
        rowsAreSelected() {
            return this.selectedRowsValues.every(rowState => rowState === STATE.CHECK);
        },
    },
    mounted() {
        this.rowIds.forEach((rowId, index) => {
            this.selectedRows[rowId] = this.data[index].value;
        });

        this.selectedRows = { ...this.selectedRows };
    },
    methods: {
        ...mapActions('grid', [
            'setDraftsValues',
            'setDraftRowValues',
        ]),
        onSelectAllRows(value) {
            const draftValues = {};

            this.rowIds.forEach((rowId) => {
                if (!draftValues[rowId]) draftValues[rowId] = {};
                if (!draftValues[rowId].edit) draftValues[rowId].edit = {};
                if (!draftValues[rowId].read) draftValues[rowId].read = {};

                draftValues[rowId] = {
                    edit: value,
                    read: value,
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
                    edit: +value,
                    read: +value,
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
