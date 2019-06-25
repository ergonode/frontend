/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="grid-container"
        @dragover="onDragOver"
        @dragleave="onDragLeave"
        @drop="onDrop">
        <slot />
    </div>
</template>

<script>
import { debounce } from 'debounce';

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
        positionBeetwenRows: 0.5,
        ghostElement: {
            id: 'ghost_item',
            column: null,
            row: null,
            ghost: true,
        },
        mousePosition: {
            overColumn: null,
            overRow: null,
            positionOverRow: null,
            shadowItem: null,
        },
        debounceFunc: null,
    }),
    computed: {
        dataWithoutGhostElement() {
            return this.gridData.filter(element => element.id !== this.ghostElement.id);
        },
        maxRow() {
            return Math.max(...this.dataWithoutGhostElement.map(item => item.row));
        },
    },
    created() {
        this.debounceFunc = debounce(this.calculateRowsCount, 200);
    },
    mounted() {
        this.calculateRowsCount();
        window.addEventListener('resize', this.debounceFunc);
    },
    destroyed() {
        window.removeEventListener('resize', this.debounceFunc);
    },
    methods: {
        calculateRowsCount() {
            const { clientHeight } = document.querySelector('.grid-container');
            const visibleRows = Math.ceil(clientHeight / this.rowsHeight);
            const totalRows = Math.max(this.gridData.length, visibleRows) + 1;
            this.$emit('setRowsCount', totalRows);
        },
        onDragOver(event) {
            const { clientX, clientY } = event;
            let allowedRow = null;
            let allowedColumn = null;

            if (this.onDragFirstItem(event)) return false;
            this.getMouseOverProps(clientX, clientY);

            const {
                overColumn,
                overRow,
                positionOverRow,
            } = this.mousePosition;
            const collidingItem = this.collisionsDetect(overRow);
            if (collidingItem !== null) {
                // const relation = this.checkCollidingRelation(positionOverRow);
                // allowedColumn = this.setAllowedColumn(
                //     overColumn,
                //     collidingItem,
                //     relation,
                // );
                // allowedRow = this.setAllowedRow(collidingItem.row, relation);
            } else if (collidingItem === null && overRow > this.maxRow) {
                allowedColumn = this.setAllowedColumn(
                    overColumn,
                    this.isRowSet(this.maxRow),
                );
                allowedRow = this.maxRow;
                // console.log(allowedColumn, allowedRow);
            }
            this.setGhostItemPosition({
                column: allowedColumn,
                row: allowedRow + this.positionBeetwenRows,
            });
            event.preventDefault();
            return true;
        },
        onDragLeave(event) {
            const { fromElement } = event;
            if (fromElement && fromElement.classList.contains('blur')) {
                this.removeGhostElement();
            }
            event.preventDefault();
        },
        onDrop(event) {
            let parentId = 'root';
            const { row, column } = this.ghostElement;
            if (row === null) {
                event.preventDefault();
                return false;
            }
            this.removeGhostElement();
            if (column > 0) {
                const findElements = this.dataWithoutGhostElement.filter(
                    e => (e.column === column - 1 && e.row < row),
                );
                const parent = Math.floor(Math.max(...findElements.map(item => item.row)));
                parentId = this.dataWithoutGhostElement[parent].id;
            }
            if (this.dataWithoutGhostElement.length >= this.rows - 2) {
                this.$emit('setRowsCount', this.rows + 1);
            }
            this.addItem({
                id: this.draggedElement,
                column,
                row,
                parent: parentId,
            });
            this.changeItemRelation({ row, column, parentId: this.draggedElement });
            this.$emit('rebuildGrid', { id: this.draggedElement });
            return true;
        },
        removeGhostElement() {
            const { row } = this.ghostElement;
            this.$emit('removeItem', { index: row });
            this.ghostElement.row = null;
            this.ghostElement.column = null;
        },
        addItem(item) {
            this.$emit('addItem', item);
        },
        onDragFirstItem(e) {
            if (!this.dataWithoutGhostElement.length) {
                this.setGhostItemPosition({
                    column: 0,
                    row: 0,
                });
                e.preventDefault();
                return true;
            }
            return false;
        },
        setGhostItemPosition({ column, row }) {
            if (
                (this.ghostElement.column !== column || this.ghostElement.row !== row)
                && row !== null
                && column !== null
            ) {
                const newRow = this.setRowIfCollapse(row + this.positionBeetwenRows);
                this.ghostElement.row = newRow || row;
                this.ghostElement.column = column;
                this.addItem({ ...this.ghostElement });
            }
        },
        getMouseOverProps(clientX, clientY) {
            const elements = document.elementsFromPoint(clientX, clientY);
            const shadowItem = elements.find(e => e.classList.contains('shadow-grid-item'));
            if (shadowItem !== this.mousePosition.shadowItem) {
                const shadowItemId = shadowItem ? shadowItem.getAttribute('shadow-id') : null;
                this.mousePosition = {
                    overColumn: shadowItemId % this.columns,
                    overRow: Math.floor(shadowItemId / this.columns),
                    positionOverRow: Math.floor(clientY - shadowItem.getBoundingClientRect().top),
                    shadowItem,
                };
            }
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
            const { row: ghostRow } = this.ghostElement;
            if (ghostRow !== null && row === ghostRow + this.positionBeetwenRows) return false;
            const newRow = ghostRow !== null && row > ghostRow
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
            return lastItem.row + this.positionBeetwenRows || null;
        },
        changeItemRelation({ row, column, parentId }) {
            const findBrothers = this.dataWithoutGhostElement.filter(
                e => (e.column === column && e.row < row),
            );
            if (findBrothers.length) {
                const brother = Math.floor(Math.max(...findBrothers.map(item => item.row)));
                const brotherId = this.dataWithoutGhostElement[brother].id;
                const childrenToChange = this.dataWithoutGhostElement.filter(
                    e => (e.parent === brotherId && e.row > row),
                );
                childrenToChange.forEach((e) => {
                    this.addItem({
                        id: e.id,
                        column: e.column,
                        row: e.row,
                        parent: parentId,
                    });
                });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid-container {
        position: relative;
        height: 100%;
        overflow: auto;
    }
</style>
