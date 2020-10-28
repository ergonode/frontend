/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export default {
    components: {
        GridCellResizer: () => import('@UI/components/Grid/Layout/Table/Cells/Resizer/GridCellResizer'),
    },
    data() {
        return {
            isCellResizing: false,
            cellResizer: null,
        };
    },
    methods: {
        onCellResize(isResizing) {
            this.isCellResizing = isResizing;

            if (!isResizing) {
                const {
                    row, column,
                } = this.cellResizer.position;
                const fixedRow = row + this.basicFiltersOffset + this.rowsOffset - 1;

                const tableCellElement = this.$el.querySelector(`.coordinates-${column}-${fixedRow}`);

                tableCellElement.focus();
            }
        },
        onCopyCellValuesByResizing(factor) {
            const {
                row,
                column,
            } = this.cellResizer.position;

            const fixedRow = row - this.basicFiltersOffset - 1;
            const fixedColumn = column - this.columnsOffset;
            const rowId = this.rowIds[fixedRow];
            const {
                id: columnId,
            } = this.orderedColumns[fixedColumn];

            const value = typeof this.drafts[`${rowId}/${columnId}`] === 'undefined'
                ? this.rows[fixedRow][columnId].value
                : this.drafts[`${rowId}/${columnId}`];

            const getMappedValues = ({
                startIndex,
                endIndex,
            }) => {
                const values = [];

                for (let i = startIndex; i <= endIndex; i += 1) {
                    if (this.rows[i]
                        && this.rows[i][columnId]
                        && this.rows[i][columnId].value !== value) {
                        values.push({
                            rowId: this.rowIds[i],
                            columnId,
                            value,
                        });
                    }
                }

                return values;
            };

            const values = getMappedValues(fixedRow < fixedRow + factor
                ? {
                    startIndex: fixedRow,
                    endIndex: fixedRow + factor,
                }
                : {
                    startIndex: fixedRow + factor,
                    endIndex: fixedRow,
                });

            this.$emit('cell-value', values);
        },
        onFocusInside(event) {
            const {
                x, width, height,
            } = event.target.getBoundingClientRect();

            if (event.target.getAttribute('copyable')) {
                this.cellResizer = {
                    size: {
                        height,
                        width,
                    },
                    position: {
                        row: +event.target.getAttribute('row') - this.rowsOffset - this.basicFiltersOffset + 1,
                        column: +event.target.getAttribute('column'),
                        minRow: 1 + this.basicFiltersOffset,
                        maxRow: this.basicFiltersOffset + this.dataCount,
                        top: `${event.target.offsetTop + height}px`,
                        left: `${x - this.$el.getBoundingClientRect().x + this.$el.scrollLeft}px`,
                    },
                };
            } else {
                this.cellResizer = null;
            }
        },
        onFocusOut() {
            if (!this.isCellResizing) {
                this.cellResizer = null;
            }
        },
    },
};
