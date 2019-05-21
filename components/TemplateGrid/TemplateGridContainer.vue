/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        @dragover="onDragOver"
        @dragleave="onDragLeave"
        @drop="onDrop">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'TemplateGridContainer',
    props: {
        gridData: {
            type: Array,
            required: true,
        },
        hiddenItems: {
            type: Object,
            required: true,
        },
        columns: {
            type: Number,
            required: true,
        },
        rows: {
            type: Number,
            required: true,
        },
        rowsHeight: {
            type: Number,
            required: true,
        },
        draggedElement: {
            type: String,
            required: false,
            default: null,
        },
    },
    data: () => ({
        ghostIndex: 'ghost_item',
        positionBeetwenRows: 0.5,
        lastColumn: null,
        lastRow: null,
    }),
    computed: {
        dataWithoutGhostElement() {
            return this.gridData.filter(element => element.id !== this.ghostIndex);
        },
        ghostElement() {
            // Last row might be 0 - that's why === null
            return this.lastRow === null ? null : this.gridData[this.lastRow];
        },
        maxRow() {
            return Math.max(...this.dataWithoutGhostElement.map(item => item.row));
        },
    },
    methods: {
        setGhostItemPosition({ column, row }) {
            if (
                (this.lastColumn !== column || this.lastRow !== row)
                && row !== null
                && column !== null
            ) {
                const newRow = this.setRowIfCollapse(row + 0.5);
                this.lastColumn = column;
                this.lastRow = newRow || row;
                // Seems like lastRow is a ghost element index in the array data
                // - no need to filter for the ghost element when we have it index
                this.$emit('addItem', {
                    item: {
                        id: this.ghostIndex,
                        column: this.lastColumn,
                        row: this.lastRow,
                        ghost: true,
                    },
                });
            }
        },
        getMouseOverProps(clientX, clientY) {
            const elements = document.elementsFromPoint(clientX, clientY);
            const shadowItem = elements.find(e => e.classList.contains('shadow-grid-item'));
            const shadowItemId = shadowItem ? shadowItem.getAttribute('shadow-id') : null;
            const overRow = shadowItemId ? Math.floor((shadowItemId - 1) / this.columns) : null;
            const overColumn = shadowItemId ? (shadowItemId - 1) % this.columns : null;
            const positionOverRow = shadowItemId
                ? Math.floor(clientY - shadowItem.getBoundingClientRect().top)
                : null;
            return {
                overColumn,
                overRow,
                positionOverRow,
            };
        },
        checkCollidingRelation(layerPositionY) {
            const centerPosition = Math.floor(this.rowsHeight / 2);
            return layerPositionY > centerPosition ? 'son' : 'brother';
        },
        isRowSet(row) {
            const [item] = this.dataWithoutGhostElement.filter(element => element.row === row);
            return item || null;
        },
        collisionsDetect(row) {
            const ghostElementRow = this.ghostElement ? this.ghostElement.row : null;
            if (
                this.ghostElementRow !== null
                && row === ghostElementRow + this.positionBeetwenRows
            ) return null;
            const newRow = ghostElementRow !== null && row > ghostElementRow
                ? row - 1
                : row;
            return this.isRowSet(newRow);
        },
        setAllowedColumn(column, interactionItem, relation = false) {
            const { column: interactionItemColumn, row: interactionItemRow } = interactionItem;
            const topBrother = this.isRowSet(interactionItemRow - 1);
            if (column === null) return null;
            if (relation) {
                if (topBrother && column > topBrother.column + 1 && relation === 'brother') return null;
                return column > interactionItemColumn ? interactionItemColumn + 1 : column;
            }
            return column > interactionItemColumn ? interactionItemColumn + 1 : column;
        },
        setAllowedRow(interactionRow, relation) {
            return relation === 'brother' ? interactionRow - 1 : interactionRow;
        },
        hasChildren(id) {
            return this.dataWithoutGhostElement.some(element => element.parent === id);
        },
        setCollapseParent(id) {
            return Object.keys(this.hiddenItems).reduce((acc, el) => {
                let x = acc;
                if (this.hiddenItems[el].some(e => e === id)) {
                    x = el;
                }
                return x;
            }, '');
        },
        setRowIfCollapse(row) {
            const item = this.isRowSet(row);
            if (!item) return null;
            const hiddenItemParent = this.setCollapseParent(item.id);
            if (!hiddenItemParent) return null;
            const collapseItem = this.hiddenItems[hiddenItemParent];
            const lastCollapseChildId = collapseItem[collapseItem.length - 1];
            const [lastItem] = this.dataWithoutGhostElement.filter(
                el => el.id === lastCollapseChildId,
            );
            return lastItem.row + 0.5 || null;
        },
        onDragOver(event) {
            if (!this.dataWithoutGhostElement.length) {
                this.setGhostItemPosition({
                    column: 0,
                    row: 0,
                });
                event.preventDefault();
                return false;
            }

            const { clientX, clientY } = event;
            const allowedItemPosition = {
                column: null,
                row: null,
            };

            const {
                overColumn,
                overRow,
                positionOverRow,
            } = this.getMouseOverProps(clientX, clientY);

            if (overColumn !== null && overRow !== null) {
                const collidingItem = this.collisionsDetect(overRow);
                let allowedRow = null;
                let allowedColumn = null;

                if (collidingItem !== null) {
                    const relation = this.checkCollidingRelation(positionOverRow);
                    allowedColumn = this.setAllowedColumn(
                        overColumn,
                        collidingItem,
                        relation,
                    );
                    allowedRow = this.setAllowedRow(collidingItem.row, relation);
                } else if (collidingItem === null && overRow > this.maxRow) {
                    allowedColumn = this.setAllowedColumn(
                        overColumn,
                        this.isRowSet(this.maxRow),
                    );
                    allowedRow = this.maxRow;
                }
                allowedItemPosition.column = allowedColumn;
                allowedItemPosition.row = allowedRow + this.positionBeetwenRows;
            }

            this.setGhostItemPosition(allowedItemPosition);
            event.preventDefault();

            return true;
        },
        onDragLeave(event) {
            // I assume that lastRow and lastColumn has to be cleared when we remove ghost element right ?
            const { fromElement } = event;
            if (fromElement && fromElement.classList.contains('blur')) {
                this.$emit('removeItem', { index: this.lastRow });
                this.lastRow = null;
                this.lastColumn = null;
            }
            event.preventDefault();
        },
        onDrop(event) {
            if (!this.ghostElement) {
                event.stopPropagation();
                return null;
            }
            const { row, column } = this.ghostElement;
            this.$emit('removeItem', { index: this.lastRow });
            this.lastRow = null;
            this.lastColumn = null;

            let parentId = 'root';
            if (column > 0) {
                const findElements = this.dataWithoutGhostElement.filter(
                    e => (e.column === column - 1 && e.row < row),
                );
                const parent = Math.max(...findElements.map(item => item.row));
                parentId = this.dataWithoutGhostElement[parent].id;
            }
            if (this.dataWithoutGhostElement.length >= this.rows - 2) {
                this.$emit('setRowsCount', { key: 'rowsCount', value: this.rows + 1 });
            }
            this.$emit('addItem', {
                item: {
                    id: this.draggedElement,
                    column,
                    row,
                    parent: parentId,
                },
            });
            this.changeItemRelation({ row, column, parentId: this.draggedElement });
            this.$emit('rebuildGrid', { id: this.draggedElement });
            return 1;
        },
        changeItemRelation({ row, column, parentId }) {
            const findBrothers = this.dataWithoutGhostElement.filter(
                e => (e.column === column && e.row < row),
            );
            if (findBrothers.length) {
                const brother = Math.max(...findBrothers.map(item => item.row));
                const brotherId = this.dataWithoutGhostElement[brother].id;
                const childrenToChange = this.dataWithoutGhostElement.filter(
                    e => (e.parent === brotherId && e.row > row),
                );
                childrenToChange.forEach((e) => {
                    this.$emit('addItem', {
                        item: {
                            id: e.id,
                            column: e.column,
                            row: e.row,
                            parent: parentId,
                        },
                    });
                });
            }
        },
    },
};
</script>
