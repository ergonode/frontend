/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    data() {
        return {
            selectedRows: {},
            isSelectedAllRows: false,
        };
    },
    methods: {
        selectAllRows(isSelected) {
            const anyRowsSelected = Object.entries(this.selectedRows).length;

            if (anyRowsSelected) this.selectedRows = {};
            else this.isSelectedAllRows = isSelected;
        },
        selectRow({ row, value }) {
            if (value) {
                this.selectedRows[row] = value;
            } else {
                delete this.selectedRows[row];

                if (this.isSelectedAllRows) {
                    // If we had chosen option with selected all of the options, we need to remove it
                    // and mark visible rows as selected
                    const fixedIndex = this.basicFilters ? 2 : 1;

                    for (let i = fixedIndex; i < this.gridState().filtered + fixedIndex; i += 1) {
                        if (i !== row) {
                            this.selectedRows[i] = true;
                        }
                    }

                    this.isSelectedAllRows = false;
                }
            }
        },
    },
};
