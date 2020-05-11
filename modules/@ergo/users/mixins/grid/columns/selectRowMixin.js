/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import deepmerge from 'deepmerge';
import { mapState, mapActions } from 'vuex';
import { STATE } from '@Core/defaults/inputs/checkbox';
import GridTableCell from '@Core/components/Grid/Layout/Table/Cells/GridTableCell';
import GridCheckEditCell from '@Core/components/Grid/Layout/Table/Cells/Edit/GridCheckEditCell';

export default {
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
    watch: {
        drafts: {
            deep: true,
            handler(value) {
                const draftValues = {};
                this.rowIds.forEach((rowId, index) => {
                    this.selectedRows[rowId] = this.data[index].value;
                });

                this.selectedRows = { ...this.selectedRows };

                Object.keys(value).forEach((rowId) => {
                    const checkValues = state => Object.values(value[rowId])
                        .every(rowState => +rowState === state);

                    if (checkValues(STATE.UNCHECK)) {
                        draftValues[rowId] = STATE.UNCHECK;
                    } else if (checkValues(STATE.CHECK)) {
                        draftValues[rowId] = STATE.CHECK;
                    } else {
                        draftValues[rowId] = STATE.CHECK_ANY;
                    }
                });
                this.selectedRows = deepmerge(this.selectedRows, draftValues);
            },
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
    },
};
