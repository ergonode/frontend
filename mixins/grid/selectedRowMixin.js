/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    components: {
        GridSelectRowColumn: () => import('~/components/Grid/Columns/GridSelectRowColumn'),
    },
    props: {
        selectRowColumn: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            selectedRows: {},
            isSelectedAllRows: false,
        };
    },
    methods: {
        onAllRowsSelect(isSelected) {
            const anyRowsSelected = Object.entries(this.selectedRows).length;

            if (anyRowsSelected) {
                this.selectedRows = {};

                this.$emit('selectRows', this.selectedRows);
            } else {
                this.isSelectedAllRows = isSelected;

                this.$emit('selectAllRows', this.isSelectedAllRows);
            }
        },
        onRowSelect({ row, isSelected }) {
            if (isSelected) {
                this.selectedRows[row] = true;
            } else {
                delete this.selectedRows[row];

                if (this.isSelectedAllRows) {
                    // If we had chosen option with selected all of the options, we need to remove it
                    // and mark visible rows as selected
                    const fixedIndex = this.basicFilters ? 2 : 1;
                    const { length } = this.gridState.rowIds;

                    for (let i = fixedIndex; i < length + fixedIndex; i += 1) {
                        if (i !== row) {
                            this.selectedRows[i] = true;
                        }
                    }

                    this.isSelectedAllRows = false;
                }
            }

            this.selectedRows = { ...this.selectedRows };

            this.$emit('selectRows', this.selectedRows);
        },
    },
};
