/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    STATE,
} from '@Core/defaults/inputs/checkbox';
import GridCheckEditCell from '@UI/components/Grid/Layout/Table/Cells/Edit/GridCheckEditCell';
import deepmerge from 'deepmerge';

export default {
    components: {
        GridCheckEditCell,
    },
    props: {
        column: {
            type: Object,
            required: true,
        },
        drafts: {
            type: Object,
            required: true,
        },
        /**
         * List of rows presented at Grid
         */
        rows: {
            type: Array,
            default: () => [],
        },
        rowIds: {
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
        };
    },
    computed: {
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
    watch: {
        drafts: {
            deep: true,
            handler(value) {
                const draftValues = {};

                Object.keys(value).forEach((key) => {
                    const [
                        id,
                    ] = key.split('/');

                    if (typeof draftValues[id] === 'undefined') {
                        draftValues[id] = [];
                    }

                    draftValues[id].push(value[key]);
                });

                Object.keys(draftValues).forEach((id) => {
                    const checkValues = state => draftValues[id]
                        .every(rowState => +rowState === state);

                    if (checkValues(STATE.UNCHECK)) {
                        draftValues[id] = STATE.UNCHECK;
                    } else if (checkValues(STATE.CHECK)) {
                        draftValues[id] = STATE.CHECK;
                    } else {
                        draftValues[id] = STATE.CHECK_ANY;
                    }
                });

                this.selectedRows = deepmerge(this.selectedRows, draftValues);
            },
        },
    },
    mounted() {
        this.rowIds.forEach((rowId, index) => {
            this.selectedRows[rowId] = this.rows[index].selectRow.value;
        });

        this.selectedRows = {
            ...this.selectedRows,
        };
    },
};
