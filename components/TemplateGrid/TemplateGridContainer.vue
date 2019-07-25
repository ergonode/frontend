/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="grid-container"
        :draggable="isDraggingEnabled"
        @dragstart="onDragStart"
        @dragend="onDragEnd"
        @dragover="onDragOver"
        @dragleave="onDragLeave"
        @drop="onDrop">
        <slot />
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { debounce } from 'debounce';
import {
    addTreeElementCopyToDocumentBody,
    removeTreeElementCopyFromDocumentBody,
} from '~/model/tree/TreeElementCopy';
import {
    initializeRowBounds,
    getRowBellowMouse,
} from '~/model/tree/TreeCalculations';
import { getObjectWithMaxValueInArrayByObjectKey } from '~/model/arrayWrapper';

export default {
    name: 'TemplateGridContainer',
    props: {
        treeData: {
            type: Array,
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
    },
    data: () => ({
        isDraggingEnabled: true,
        positionBetweenRows: 0.5,
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
        ...mapState('tree', {
            fullTreeData: state => state.fullTreeData,
            hiddenItems: state => state.hiddenItems,
        }),
        ...mapState('authentication', {
            language: state => state.user.language,
        }),
        ...mapState('draggable', {
            draggedElement: state => state.draggedElement,
        }),
        ...mapState('list', {
            listElements: state => state.elements,
        }),
        dataWithoutGhostElement() {
            return this.treeData.filter(element => element.id !== this.ghostElement.id);
        },
        maxRow() {
            return getObjectWithMaxValueInArrayByObjectKey(this.dataWithoutGhostElement, 'row').row;
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
        ...mapActions('draggable', [
            'setDraggedElement',
            'setDraggableState',
        ]),
        ...mapActions('tree', [
            'setChildrenLength',
        ]),
        calculateRowsCount() {
            const { clientHeight } = document.querySelector('.grid-container');
            const visibleRows = Math.ceil(clientHeight / this.rowsHeight);
            const totalRows = Math.max(this.fullTreeData.length, visibleRows) + 1;
            this.setRowsCount(totalRows);
        },
        onDragStart(event) {
            const { clientY } = event;
            const itemsContainer = this.$el.querySelector('.grid-items-container');
            const { children: categories } = itemsContainer;
            const {
                top: containerTop,
                height: containerHeight,
            } = itemsContainer.getBoundingClientRect();
            if (clientY > containerHeight + containerTop) {
                event.preventDefault();
            }
            getRowBellowMouse({
                clientY,
                elements: categories,
                elementBounds: initializeRowBounds(categories),
            }, ({ index, category }) => {
                const hasChildren = category.querySelector('.grid-item__categories-length');
                if (category && !hasChildren) {
                    const categoryId = category.getAttribute('item-id');
                    const categoryItem = this.dataWithoutGhostElement[index];
                    const { row, column } = categoryItem;
                    const parentId = this.getParentId(row, column);
                    // if (hasChildren) {
                    //     this.$emit('toggleItem', categoryItem);
                    // }
                    this.setDraggedElement(categoryId);
                    this.setDraggableState({ propName: 'isListElementDragging', value: true });
                    addTreeElementCopyToDocumentBody(event, category);
                    if (parentId !== 'root') {
                        this.setChildrenLength({ id: parentId, value: -1 });
                    }
                    this.$emit('removeItem', index);
                } else {
                    this.$addAlert(this.$store, { type: 'warning', message: 'Can`t move the category which has subcategory.', duration: 1500 });
                    event.preventDefault();
                }
            });
        },
        onDragEnd(event) {
            event.preventDefault();
            removeTreeElementCopyFromDocumentBody(event);
            this.setDraggedElement();
            this.setDraggableState({ propName: 'isListElementDragging', value: false });
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
                    row: this.maxRow + this.positionBetweenRows,
                });
            }
            return true;
        },
        onDragLeave(event) {
            const { clientX, clientY } = event;
            const itemsContainer = document.querySelector('.grid-container');
            const {
                top, right, width, height,
            } = itemsContainer.getBoundingClientRect();
            const leftAtTheLeft = clientX <= right - width;
            const leftAtTheRight = clientX >= right;
            const leftAtTheTop = clientY <= top;
            const leftAtTheBottom = clientY >= (top + height);
            const isOutOfBounds = (leftAtTheTop
                || leftAtTheBottom
                || leftAtTheLeft
                || leftAtTheRight);
            if (isOutOfBounds) {
                this.removeGhostElement();
            }
        },
        onDrop(event) {
            event.preventDefault();
            const { row, column } = this.ghostElement;
            const { code: categoryCode, name: categoryName } = this.listElements[this.language]
                .find(e => e.id === this.draggedElement);
            this.removeGhostElement();
            const parentId = this.getParentId(row, column);
            const childrenLength = this.hiddenItems[this.draggedElement]
                ? this.hiddenItems[this.draggedElement].length
                : 0;
            const droppedItem = {
                id: this.draggedElement,
                code: categoryCode,
                name: categoryName,
                column,
                row,
                children: childrenLength,
                expand: childrenLength > 0,
                parent: parentId,
            };
            this.addItem(droppedItem);
            // if (childrenLength > 0) this.$emit('toggleItem', droppedItem);
            if (parentId !== 'root') {
                this.setChildrenLength({ id: parentId, value: 1 });
            }
            this.$emit('rebuildGrid', this.draggedElement);
            this.calculateRowsCount();
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
            const isNeighborInTopRange = overColumn <= maxColumn
                && overColumn > minColumn;
            const isNeighborInBottomRange = overColumn <= maxColumn + 1
                && overColumn >= minColumn;

            if ((isTopNeighborLowerThenBottom && isNeighborInTopRange)
                || (!isTopNeighborLowerThenBottom && isNeighborInBottomRange)) {
                return overColumn;
            }
            return null;
        },
        getCollidingPosition(collidingEl) {
            const { row: collidingElRow, column: collidingElColumn } = collidingEl;
            if (collidingEl.ghost) {
                const topNeighbor = this.dataWithoutGhostElement[
                    collidingElRow - this.positionBetweenRows
                ];
                const bottomNeighbor = this.dataWithoutGhostElement[
                    collidingElRow + this.positionBetweenRows
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
                return { column: 0, row: -this.positionBetweenRows };
            }
            const collidingData = {
                neighborElColumn: neighborEl ? neighborEl.column : null,
                collidingElColumn,
            };
            return {
                column: isTop
                    ? this.getTopCollidingColumn(collidingData)
                    : this.getBottomCollidingColumn(collidingData),
                row: (isTop ? collidingElRow - 1 : collidingElRow) + this.positionBetweenRows,
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
                const parent = Math.floor(getObjectWithMaxValueInArrayByObjectKey(findElements, 'row').row);
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
            const [item] = this.treeData.filter(element => element.row === row);
            return item || null;
        },
        getCollidingItemAtRow(row) {
            const { row: ghostRow } = this.ghostElement;
            if (ghostRow !== null && row === ghostRow + this.positionBetweenRows) {
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
        scrollbar-width: none;
    }
</style>
