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
    addElementCopyToDocumentBody,
    removeElementCopyFromDocumentBody,
} from '~/model/tree/TreeElementCopy';
import {
    getRowBounds,
    getRowBellowMouse,
} from '~/model/tree/TreeCalculations';
import { getObjectWithMaxValueInArrayByObjectKey } from '~/model/arrayWrapper';
import { isMouseOutOfBoundsElement } from '~/model/drag_and_drop/helpers';

export default {
    name: 'TemplateGridContainer',
    props: {
        gridData: {
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
        isDraggingEnabled: {
            type: Boolean,
            default: false,
        },
        isMultiDraggable: {
            type: Boolean,
            default: false,
        },
        removeDisabledElementsOnList: {
            type: Function,
            default: () => {},
        },
        draggedElementSize: {
            type: Object,
            default: () => ({
                width: 247,
                height: 40,
            }),
        },
    },
    data: () => ({
        positionBetweenRows: 0.5,
        ghostElement: {
            id: 'ghost_item',
            column: null,
            row: null,
            parent: null,
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
        ...mapState('gridDesigner', {
            fullGridData: (state) => state.fullGridData,
            hiddenItems: (state) => state.hiddenItems,
        }),
        ...mapState('authentication', {
            language: (state) => state.user.language,
        }),
        ...mapState('draggable', {
            draggedElement: (state) => state.draggedElement,
        }),
        ...mapState('list', {
            listElements: (state) => state.elements,
        }),
        dataWithoutGhostElement() {
            return this.gridData.filter((element) => element.id !== this.ghostElement.id);
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
        ...mapActions('list', [
            'setDisabledElement',
        ]),
        ...mapActions('gridDesigner', [
            'setRowsCount',
            'setChildrenLength',
            'addGridItem',
            'removeGridItem',
            'rebuildGridById',
            'removeHiddenItem',
        ]),
        calculateRowsCount() {
            const { clientHeight } = document.querySelector('.grid-container');
            const visibleRows = Math.ceil(clientHeight / this.rowsHeight);
            const totalRows = Math.max(this.fullGridData.length, visibleRows) + 1;

            this.setRowsCount(totalRows);
        },
        onDragStart(event) {
            const { clientY } = event;
            const itemsContainer = this.$el.querySelector('.grid-items-container');
            const { children: items } = itemsContainer;
            const {
                top: containerTop,
                height: containerHeight,
            } = itemsContainer.getBoundingClientRect();

            if (clientY > containerHeight + containerTop) {
                event.preventDefault();
                return false;
            }
            getRowBellowMouse({
                clientY,
                elements: items,
                elementBounds: getRowBounds(items),
            }, ({ index, category }) => {
                if (category) {
                    const hasChildren = category.querySelector('.grid-item__categories-length');
                    const categoryItem = this.dataWithoutGhostElement[index];
                    const {
                        row, column, expanded,
                    } = categoryItem;
                    const parentId = this.getParentId(row, column);

                    if (hasChildren && !expanded) {
                        this.$emit('toggleItem', categoryItem);
                    }
                    this.setDraggedElement(categoryItem);
                    this.setDraggableState({ propName: 'draggedElementOnGrid', value: 'template' });
                    addElementCopyToDocumentBody(event, {
                        element: category,
                        width: this.draggedElementSize.width,
                        height: this.draggedElementSize.height,
                    });
                    if (parentId !== 'root') {
                        this.setChildrenLength({ id: parentId, value: -1 });
                    }
                    this.removeGridItem(index);
                } else {
                    event.preventDefault();
                }
            });
            return true;
        },
        onDrop() {
            this.insertElementIntoGrid();
        },
        onDragEnd(event) {
            const { id } = this.draggedElement;
            const { isOutOfBounds, isTrashBelowMouse } = this.getElementBelowMouse(event);

            if (isTrashBelowMouse) {
                this.removeElementFromGrid(id);
            }
            if (isOutOfBounds && !isTrashBelowMouse) {
                this.insertElementIntoGrid();
            }
            removeElementCopyFromDocumentBody(event);
            this.setDraggedElement();
            this.setDraggableState({ propName: 'draggedElementOnGrid', value: null });
        },
        onDragLeave(event) {
            const { isOutOfBounds, isTrashBelowMouse } = this.getElementBelowMouse(event);

            if (isOutOfBounds || isTrashBelowMouse) {
                this.removeGhostElement();
            }
        },
        onDragOver(event) {
            event.preventDefault();
            if (this.onDragFirstItem()) return false;
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
        removeElementFromGrid(id) {
            if (!this.isMultiDraggable) this.removeDisabledElementsOnList(id);
            this.removeHiddenItem(id);
            this.$emit('afterRemove', id);
        },
        insertElementIntoGrid() {
            const { id: draggedId, row: draggedRow, column: draggedColumn } = this.draggedElement;
            const { row, column } = this.ghostElement;
            const rowToInsert = row === null ? draggedRow - this.positionBetweenRows : row;
            const columnToInsert = row === null ? draggedColumn : column;
            const { code: categoryCode, name: categoryName } = this.listElements[this.language]
                .find((e) => e.id === draggedId.split('--')[0]);
            this.removeGhostElement();
            const parentId = this.getParentId(rowToInsert, columnToInsert);
            const childrenLength = this.hiddenItems[draggedId]
                ? this.hiddenItems[draggedId].length
                : 0;
            const droppedItem = {
                id: draggedId,
                code: categoryCode,
                name: categoryName,
                column: columnToInsert,
                row: rowToInsert,
                children: childrenLength,
                expanded: childrenLength > 0,
                parent: parentId,
            };

            this.addGridItem(droppedItem);
            if (!this.isMultiDraggable) {
                this.setDisabledElement({
                    languageCode: this.language,
                    elementId: draggedId,
                });
            }
            if (parentId !== 'root') {
                this.setChildrenLength({ id: parentId, value: 1 });
            }
            this.rebuildGridById(draggedId);
            if (childrenLength > 0) {
                this.$emit('toggleItem', {
                    ...droppedItem,
                    row: rowToInsert + this.positionBetweenRows,
                });
            }
            this.calculateRowsCount();
            this.$emit('afterDrop', draggedId);
        },
        getElementBelowMouse(event) {
            const { pageX, pageY } = event;
            const elementBelowMouse = document.elementFromPoint(pageX, pageY);
            const itemsContainer = document.querySelector('.grid-container');

            return {
                itemsContainer,
                isOutOfBounds: isMouseOutOfBoundsElement(itemsContainer, pageX, pageY),
                isTrashBelowMouse: elementBelowMouse && elementBelowMouse.className === 'trash-can',
            };
        },
        removeGhostElement() {
            const { id } = this.ghostElement;

            this.ghostElement.row = null;
            this.ghostElement.column = null;
            this.removeGridItem(id);
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
            const { id, row: collidingElRow, column: collidingElColumn } = collidingEl;

            if (id === 'ghost_item') {
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
                (el) => el.row === (isTop ? collidingElRow - 1 : collidingElRow + 1),
            );
            const isFirstElement = (!neighborEl || collidingElRow === 0) && isTop;
            const collidingData = {
                neighborElColumn: neighborEl ? neighborEl.column : null,
                collidingElColumn,
            };

            if (isFirstElement) {
                return { column: 0, row: -this.positionBetweenRows };
            }

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
                    (e) => (e.column === column - 1 && e.row < row),
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
                this.ghostElement.parent = this.getParentId(row, column);
                this.addGridItem({ ...this.ghostElement });
            }
        },
        getMouseOverProps(clientX, clientY) {
            const elements = document.elementsFromPoint(clientX, clientY);
            const shadowItem = elements.find((e) => e.classList.contains('shadow-grid-item'));

            if (shadowItem) {
                const positionOverRow = clientY - shadowItem.getBoundingClientRect().top;
                const directionOfCollision = this.checkCollidingRelation(positionOverRow);

                if (directionOfCollision !== this.mousePosition.directionOfCollision) {
                    this.mousePosition.directionOfCollision = directionOfCollision;
                }
                if (shadowItem !== this.mousePosition.shadowItem) {
                    const shadowItemId = shadowItem.getAttribute('shadow-id');

                    this.mousePosition = {
                        overColumn: shadowItemId % this.columns,
                        overRow: Math.floor(shadowItemId / this.columns),
                        shadowItem,
                    };
                }

                return directionOfCollision;
            }

            return null;
        },
        checkCollidingRelation(layerPositionY) {
            const centerPosition = Math.floor(this.rowsHeight / 2);

            return layerPositionY > centerPosition ? 'bottom' : 'top';
        },
        isRowGet(row) {
            const [item] = this.gridData.filter((element) => element.row === row);

            return item || null;
        },
        getCollidingItemAtRow(row) {
            const { row: ghostRow } = this.ghostElement;
            const newRow = ghostRow !== null && row > ghostRow
                ? row - 1
                : row;

            if (ghostRow !== null && row === ghostRow + this.positionBetweenRows) {
                return this.isRowGet(ghostRow);
            }

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
        scrollbar-width: 4px;
    }
</style>
