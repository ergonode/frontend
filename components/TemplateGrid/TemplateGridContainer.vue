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
import { getMaxObjectValueInArrayByObjectKey } from '~/model/arrayWrapper';

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
            directionOfCollision: null,
            shadowItem: null,
        },
        debounceFunc: null,
    }),
    computed: {
        dataWithoutGhostElement() {
            return this.gridData.filter(element => element.id !== this.ghostElement.id);
        },
        maxRow() {
            return getMaxObjectValueInArrayByObjectKey(this.dataWithoutGhostElement, 'row');
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
            this.setRowsCount(totalRows);
        },
        onDragOver(event) {
            event.preventDefault();
            if (this.onDragFirstItem(event)) return false;
            const { clientX, clientY } = event;
            const { overRow, directionOfCollision } = this.mousePosition;
            const localDirectionOfCollision = this.getMouseOverProps(clientX, clientY);
            const collidingItem = this.getCollidingItemAtRow(overRow);
            const isElementHasCollision = collidingItem !== null
                && directionOfCollision !== localDirectionOfCollision;
            const isElementBeyondCollision = collidingItem === null && overRow > this.maxRow;

            if (isElementHasCollision) {
                this.setGhostItemPosition(this.getCollidingPosition(collidingItem));
            } else if (isElementBeyondCollision) {
                this.setGhostItemPosition({
                    column: this.getAllowedColumn(),
                    row: this.maxRow + this.positionBeetwenRows,
                });
            }
            return true;
        },
        onDragLeave(event) {
            event.preventDefault();
            const { fromElement } = event;
            if (fromElement && fromElement.classList.contains('blur')) {
                this.removeGhostElement();
            }
        },
        onDrop() {
            const { row, column } = this.ghostElement;
            const { length: withoutGhostLength } = this.dataWithoutGhostElement;
            this.removeGhostElement();
            this.addItem({
                id: this.draggedElement,
                column,
                row,
                parent: this.getParentId(row, column),
            });
            if (withoutGhostLength >= this.rows - 2) {
                this.setRowsCount(this.rows + 1);
            }
            this.$emit('rebuildGrid', this.draggedElement);
        },
        removeGhostElement() {
            this.ghostElement.row = null;
            this.ghostElement.column = null;
            this.$emit('removeItem', this.ghostElement.id);
        },
        addItem(item) {
            this.$emit('addItem', item);
        },
        setRowsCount(number) {
            this.$emit('setRowsCount', number);
        },
        getBottomCollidingColumn({ neighborElColumn, collidingElColumn }) {
            const { overColumn } = this.mousePosition;
            if (neighborElColumn !== null && collidingElColumn < neighborElColumn) {
                return neighborElColumn;
            }
            return overColumn > collidingElColumn ? collidingElColumn + 1 : collidingElColumn;
        },
        getTopCollidingColumn({ neighborElColumn, collidingElColumn }) {
            const { overColumn } = this.mousePosition;
            if (overColumn >= collidingElColumn && overColumn <= neighborElColumn + 1) {
                return overColumn;
            }
            return collidingElColumn;
        },
        getGhostCollidingColumn(topNeighborColumn, bottomNeighborColumn) {
            const { overColumn } = this.mousePosition;
            const isTopNeighborLowerThenBottom = topNeighborColumn < bottomNeighborColumn;
            const maxColumn = Math.max(topNeighborColumn, bottomNeighborColumn);
            const minColumn = Math.min(topNeighborColumn, bottomNeighborColumn);
            const isRangeIsCorrectWithTopNeighbor = overColumn <= maxColumn
                && overColumn > minColumn;
            const isRangeIsCorrectWithBottomNeighbor = overColumn <= maxColumn + 1
                && overColumn >= minColumn;

            if ((isTopNeighborLowerThenBottom && isRangeIsCorrectWithTopNeighbor)
                || (!isTopNeighborLowerThenBottom && isRangeIsCorrectWithBottomNeighbor)) {
                return overColumn;
            }
            return null;
        },
        getCollidingPosition(collidingEl) {
            const { row: collidingElRow, column: collidingElColumn } = collidingEl;
            if (collidingEl.ghost) {
                const topNeighbor = this.dataWithoutGhostElement[
                    collidingElRow - this.positionBeetwenRows
                ];
                const bottomNeighbor = this.dataWithoutGhostElement[
                    collidingElRow + this.positionBeetwenRows
                ];
                const columnForLastRow = !bottomNeighbor ? this.getAllowedColumn() : 0;
                return {
                    column: bottomNeighbor && topNeighbor
                        ? this.getGhostCollidingColumn(topNeighbor.column, bottomNeighbor.column)
                        : columnForLastRow,
                    row: collidingElRow,
                };
            }
            const { directionOfCollision } = this.mousePosition;
            const isTop = directionOfCollision === 'top';
            const [neighborEl] = this.dataWithoutGhostElement.filter(
                el => el.row === (isTop ? collidingElRow - 1 : collidingElRow + 1),
            );
            const isFirstElement = (!neighborEl || collidingElRow === 0) && isTop;
            if (isFirstElement) {
                return { column: 0, row: -this.positionBeetwenRows };
            }
            const collidingData = {
                neighborElColumn: neighborEl ? neighborEl.column : null,
                collidingElColumn,
            };
            return {
                column: isTop
                    ? this.getTopCollidingColumn(collidingData)
                    : this.getBottomCollidingColumn(collidingData),
                row: (isTop ? collidingElRow - 1 : collidingElRow) + this.positionBeetwenRows,
            };
        },
        onDragFirstItem() {
            if (this.dataWithoutGhostElement.length) return false;
            this.setGhostItemPosition({
                column: 0,
                row: 0,
            });
            return true;
        },
        getParentId(row, column) {
            let parentId = 'root';
            if (column > 0) {
                const findElements = this.dataWithoutGhostElement.filter(
                    e => (e.column === column - 1 && e.row < row),
                );
                const parent = Math.floor(getMaxObjectValueInArrayByObjectKey(findElements, 'row'));
                parentId = this.dataWithoutGhostElement[parent].id;
            }
            return parentId;
        },
        setGhostItemPosition({ column, row }) {
            const isPositionNotDuplicated = (this.ghostElement.column !== column
                || this.ghostElement.row !== row) && (row !== null && column !== null);
            if (isPositionNotDuplicated) {
                this.ghostElement.row = row;
                this.ghostElement.column = column;
                this.addItem({ ...this.ghostElement });
            }
        },
        getMouseOverProps(clientX, clientY) {
            const elements = document.elementsFromPoint(clientX, clientY);
            const shadowItem = elements.find(e => e.classList.contains('shadow-grid-item'));
            const positionOverRow = clientY - shadowItem.getBoundingClientRect().top;
            const directionOfCollision = this.checkCollidingRelation(positionOverRow);

            if (directionOfCollision !== this.mousePosition.directionOfCollision) {
                this.mousePosition.directionOfCollision = directionOfCollision;
            }
            if (shadowItem !== this.mousePosition.shadowItem) {
                const shadowItemId = shadowItem ? shadowItem.getAttribute('shadow-id') : null;
                this.mousePosition = {
                    overColumn: shadowItemId % this.columns,
                    overRow: Math.floor(shadowItemId / this.columns),
                    shadowItem,
                };
            }
            return directionOfCollision;
        },
        checkCollidingRelation(layerPositionY) {
            const centerPosition = Math.floor(this.rowsHeight / 2);
            return layerPositionY > centerPosition ? 'bottom' : 'top';
        },
        isRowGet(row) {
            const [item] = this.gridData.filter(element => element.row === row);
            return item || null;
        },
        getCollidingItemAtRow(row) {
            const { row: ghostRow } = this.ghostElement;
            if (ghostRow !== null && row === ghostRow + this.positionBeetwenRows) {
                return this.isRowGet(ghostRow);
            }
            const newRow = ghostRow !== null && row > ghostRow
                ? row - 1
                : row;
            return this.isRowGet(newRow);
        },
        getAllowedColumn() {
            const { overColumn } = this.mousePosition;
            const { column: interactionColumn } = this.isRowGet(this.maxRow);
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
