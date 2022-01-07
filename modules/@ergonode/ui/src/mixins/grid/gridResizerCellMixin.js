/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export default {
    data() {
        return {
            isCellResizing: false,
            cellResizer: null,
        };
    },
    computed: {
        headerOffset() {
            return this.isBasicFilter ? 2 : 1;
        },
    },
    methods: {
        getMappedValues({
            startIndex,
            endIndex,
            columnId,
            value,
        }) {
            const values = [];

            for (let i = startIndex; i <= endIndex; i += 1) {
                const rowId = this.rowIds[i];

                if (!this.disabledRows[rowId]) {
                    values.push({
                        rowId: this.rowIds[i],
                        columnId,
                        value,
                    });
                }
            }

            return values;
        },
        onCellResize({
            isResizing,
            factor,
        }) {
            this.isCellResizing = isResizing;

            if (!isResizing) {
                const {
                    row, column,
                } = this.cellResizer.position;
                const fixedRow = row + this.headerOffset + this.rowsOffset + factor;
                const tableCellElement = this.$el.querySelector(`.coordinates-${column}-${fixedRow}`);

                tableCellElement.focus();
            }
        },
        onCopyCellValuesByResizing(factor) {
            const {
                row,
                column,
            } = this.cellResizer.position;

            const fixedColumn = column - this.columnsOffset;
            const rowId = this.rowIds[row];
            const {
                id: columnId,
            } = this.orderedColumns[fixedColumn];

            const value = typeof this.drafts[`${rowId}/${columnId}`] === 'undefined'
                ? this.rows[row][columnId].value
                : this.drafts[`${rowId}/${columnId}`];

            const values = this.getMappedValues(row < row + factor
                ? {
                    startIndex: row,
                    endIndex: row + factor,
                    columnId,
                    value,
                }
                : {
                    startIndex: row + factor,
                    endIndex: row,
                    columnId,
                    value,
                });

            this.$emit('cell-value', values);
        },
        onFocusInside(event) {
            const {
                x,
                width,
                height,
            } = event.target.getBoundingClientRect();

            if (event.target.getAttribute('copyable')) {
                this.cellResizer = {
                    size: {
                        height,
                        width,
                    },
                    position: {
                        row: +event.target.getAttribute('row') - this.rowsOffset - this.headerOffset,
                        column: +event.target.getAttribute('column'),
                        minRow: 0,
                        maxRow: this.dataCount - 1,
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
