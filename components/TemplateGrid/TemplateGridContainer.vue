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
            collisionRelation: null,
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
            const { overRow, collisionRelation } = this.mousePosition;
            if (this.onDragFirstItem(event)) return false;
            const tmpCollisionRelation = this.getMouseOverProps(clientX, clientY);
            const collidingItem = this.collisionsDetect(overRow);

            if (collidingItem !== null && collisionRelation !== tmpCollisionRelation) {
                this.setGhostItemPosition(this.getCollidingPosition(collidingItem));
            } else if (collidingItem === null && overRow > this.maxRow) {
                this.setGhostItemPosition({
                    column: this.setAllowedColumn(),
                    row: this.maxRow + this.positionBeetwenRows,
                });
            }
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
            const { row, column } = this.ghostElement;
            const { length: withoutGhostLength } = this.dataWithoutGhostElement;
            this.removeGhostElement();
            this.addItem({
                id: this.draggedElement,
                column,
                row,
                parent: this.setParentId(row, column),
            });
            if (withoutGhostLength >= this.rows - 2) {
                this.$emit('setRowsCount', this.rows + 1);
            }
            this.$emit('rebuildGrid', this.draggedElement);
            event.preventDefault();
            return true;
        },
        removeGhostElement() {
            this.$emit('removeItem', this.ghostElement.id);
            this.ghostElement.row = null;
            this.ghostElement.column = null;
        },
        addItem(item) {
            this.$emit('addItem', item);
        },
        getBottomCollidingColumn({ adjacentElColumn, collidingElColumn }) {
            const { overColumn } = this.mousePosition;
            if (adjacentElColumn !== null && collidingElColumn < adjacentElColumn) {
                return adjacentElColumn;
            }
            return overColumn > collidingElColumn ? collidingElColumn + 1 : collidingElColumn;
        },
        getTopCollidingColumn({ adjacentElColumn, collidingElColumn }) {
            const { overColumn } = this.mousePosition;
            if (overColumn >= collidingElColumn && overColumn <= adjacentElColumn + 1) {
                return overColumn;
            }
            return collidingElColumn;
        },
        getCollidingPosition(collidingEl) {
            const { collisionRelation } = this.mousePosition;
            const isTop = collisionRelation === 'top';
            const [adjacentEl] = this.dataWithoutGhostElement.filter(
                el => el.row === (isTop ? collidingEl.row - 1 : collidingEl.row + 1),
            );
            const collidingData = {
                adjacentElColumn: adjacentEl ? adjacentEl.column : null,
                collidingElColumn: collidingEl.column,
            };
            if ((!adjacentEl || collidingEl.row === 0) && isTop) {
                return { column: 0, row: -this.positionBeetwenRows };
            }
            return {
                column: isTop
                    ? this.getTopCollidingColumn(collidingData)
                    : this.getBottomCollidingColumn(collidingData),
                row: (isTop ? collidingEl.row - 1 : collidingEl.row) + this.positionBeetwenRows,
            };
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
        setParentId(row, column) {
            let parentId = 'root';
            if (column > 0) {
                const findElements = this.dataWithoutGhostElement.filter(
                    e => (e.column === column - 1 && e.row < row),
                );
                const parent = Math.floor(Math.max(...findElements.map(item => item.row)));
                parentId = this.dataWithoutGhostElement[parent].id;
            }
            return parentId;
        },
        setGhostItemPosition({ column, row }) {
            if (
                (this.ghostElement.column !== column || this.ghostElement.row !== row)
                && row !== null
                && column !== null
            ) {
                this.ghostElement.row = row;
                this.ghostElement.column = column;
                this.addItem({ ...this.ghostElement });
            }
        },
        getMouseOverProps(clientX, clientY) {
            const elements = document.elementsFromPoint(clientX, clientY);
            const shadowItem = elements.find(e => e.classList.contains('shadow-grid-item'));
            const positionOverRow = clientY - shadowItem.getBoundingClientRect().top;
            const collisionRelation = this.checkCollidingRelation(positionOverRow);

            if (collisionRelation !== this.mousePosition.collisionRelation) {
                this.mousePosition.collisionRelation = collisionRelation;
            }
            if (shadowItem !== this.mousePosition.shadowItem) {
                const shadowItemId = shadowItem ? shadowItem.getAttribute('shadow-id') : null;
                this.mousePosition = {
                    overColumn: shadowItemId % this.columns,
                    overRow: Math.floor(shadowItemId / this.columns),
                    shadowItem,
                };
            }
            return collisionRelation;
        },
        checkCollidingRelation(layerPositionY) {
            const centerPosition = Math.floor(this.rowsHeight / 2);
            return layerPositionY > centerPosition ? 'bottom' : 'top';
        },
        isRowSet(row) {
            const [item] = this.dataWithoutGhostElement.filter(element => element.row === row);
            return item || null;
        },
        collisionsDetect(row) {
            const { row: ghostRow } = this.ghostElement;
            if (ghostRow !== null && row === ghostRow + this.positionBeetwenRows) return null;
            const newRow = ghostRow !== null && row > ghostRow
                ? row - 1
                : row;
            return this.isRowSet(newRow);
        },
        setAllowedColumn() {
            const { overColumn } = this.mousePosition;
            const { column: interactionColumn } = this.isRowSet(this.maxRow);
            return overColumn > interactionColumn ? interactionColumn + 1 : overColumn;
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
