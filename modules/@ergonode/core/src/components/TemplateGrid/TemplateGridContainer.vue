/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="template-grid-container"
        :draggable="isDraggingEnabled && gridData.length > 0"
        @dragstart="onDragStart"
        @dragend="onDragEnd"
        @dragover="onDragOver"
        @dragleave="onDragLeave"
        @drop="onDrop">
        <slot />
    </div>
</template>

<script>
import {
    DRAGGED_ELEMENT,
} from '@Core/defaults/grid';
import {
    getObjectWithMaxValueInArrayByObjectKey,
} from '@Core/models/arrayWrapper';
import {
    addElementCopyToDocumentBody,
    removeElementCopyFromDocumentBody,
} from '@Core/models/layout/ElementCopy';
import {
    getRowBellowMouse,
    getRowBounds,
} from '@Core/models/template_grid/TreeCalculations';
import {
    getDraggedColumnPositionState,
    getPositionForBrowser,
    isMouseInsideElement,
    isMouseOutOfBoundsElement,
} from '@UI/models/dragAndDrop/helpers';
import {
    debounce,
} from 'debounce';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'TemplateGridContainer',
    props: {
        /**
         * Grid data model
         */
        gridData: {
            type: Array,
            required: true,
        },
        /**
         * Number of visible columns
         */
        columns: {
            type: Number,
            required: true,
        },
        /**
         * Number of visible rows
         */
        rows: {
            type: Number,
            required: true,
        },
        /**
         * Determines the size of row height
         */
        rowHeight: {
            type: Number,
            required: true,
        },
        /**
         * Determines state of draggable attribute
         */
        isDraggingEnabled: {
            type: Boolean,
            default: false,
        },
        /**
         * Determines if the component might be dragged twice
         */
        isMultiDraggable: {
            type: Boolean,
            default: false,
        },
        constantRoot: {
            type: Boolean,
            default: false,
        },
    },
    data: () => ({
        positionBetweenRows: 0.5,
        additionalRows: 3,
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
        rowBounds: {},
        debounceFunc: null,
    }),
    computed: {
        ...mapState('gridDesigner', [
            'fullGridData',
            'hiddenItems',
        ]),
        ...mapState('authentication', {
            language: state => state.user.language,
        }),
        ...mapState('draggable', [
            'draggedElement',
            'draggedElIndex',
            'ghostIndex',
        ]),
        dataWithoutGhostElement() {
            return this.gridData.filter(element => element.id !== this.ghostElement.id);
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

        const itemsContainer = this.$el.querySelector('.grid-items-container');
        const {
            children: elements,
        } = itemsContainer;

        this.rowBounds = getRowBounds(elements);

        window.addEventListener('resize', this.debounceFunc);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.debounceFunc);
    },
    methods: {
        ...mapActions('draggable', [
            '__setState',
        ]),
        ...mapActions('list', [
            'setDisabledElement',
        ]),
        ...mapActions('gridDesigner', [
            'setRowsCount',
            'setChildrenLength',
            'addGridItem',
            'removeGridItem',
            'rebuildGrid',
            '',
            'setItemAtIndex',
            'insertItemAtIndex',
        ]),
        calculateRowsCount() {
            const {
                clientHeight,
            } = this.$el;
            const visibleRows = Math.ceil(clientHeight / this.rowHeight);
            const totalRows = Math.max(this.fullGridData.length, visibleRows) + this.additionalRows;

            this.setRowsCount(totalRows);
        },
        onDragStart(event) {
            const position = this.getPosition(event);

            console.log(position);

            if (position) {
                const {
                    row,
                    column,
                } = position;
                const item = this.gridData[row];
                const {
                    id,
                    children,
                    parent,
                    expanded,
                    code,
                } = item;

                // if (children && !expanded) {
                //     this.$emit('toggle-item', item);
                // }

                this.__setState({
                    key: 'draggedElement',
                    value: item,
                });
                this.__setState({
                    key: 'draggedElIndex',
                    value: row,
                });
                this.__setState({
                    key: 'ghostIndex',
                    value: {
                        row,
                        column,
                    },
                });
                this.__setState({
                    key: 'isElementDragging',
                    value: DRAGGED_ELEMENT.TEMPLATE,
                });

                addElementCopyToDocumentBody({
                    event,
                    id,
                    label: code,
                });

                this.setChildrenLength({
                    id: parent,
                    value: -1,
                });

                this.setItemAtIndex({
                    index: row,
                    item: {
                        id: 'ghost_item',
                        row,
                        column,
                        parent: this.getParentId(row, column),
                    },
                });
            }
        },
        onDrop(event) {
            console.log('drop');
            if (this.ghostIndex !== -1) {
                this.setItemAtIndex({
                    index: this.ghostIndex.row,
                    item: this.draggedElement,
                });
            }

            event.preventDefault();
        },
        onDragEnd(event) {
            console.log('end');
            removeElementCopyFromDocumentBody(event);

            const {
                xPos,
                yPos,
            } = getPositionForBrowser(event);
            const trashElement = document.documentElement.querySelector('.drop-zone');
            const isDroppedToTrash = isMouseInsideElement(trashElement, xPos, yPos);

            if (isDroppedToTrash) {
                this.$emit('remove', this.draggedElement);
            } else {
                const {
                    isOutOfBounds,
                } = this.getElementBelowMouse(event);

                if (isOutOfBounds) {
                    this.insertItemAtIndex({
                        index: this.draggedElIndex,
                        item: this.draggedElement,
                    });

                    if (!this.isMultiDraggable) {
                        this.setDisabledElement({
                            languageCode: this.language,
                            elementId: this.draggedElement.id,
                            disabled: true,
                        });
                    }
                }
            }

            this.__setState({
                key: 'draggedElement',
                value: null,
            });
            this.__setState({
                key: 'isElementDragging',
                value: null,
            });
            this.__setState({
                key: 'draggedElIndex',
                value: -1,
            });
            this.__setState({
                key: 'ghostIndex',
                value: -1,
            });
        },
        onDragLeave(event) {
            const {
                isOutOfBounds,
            } = this.getElementBelowMouse(event);

            if (isOutOfBounds) {
                this.removeGhostElement();
            }
        },
        onDragOver(event) {
            event.preventDefault();

            const position = this.getPosition(event);

            if (position && position.row <= this.gridData.length) {
                const {
                    row,
                    column,
                } = position;

                if (this.ghostIndex === -1
                    || (row === this.ghostIndex.row && column === this.ghostIndex.column)) {
                    event.preventDefault();
                    event.stopPropagation();

                    return;
                }

                this.setItemAtIndex({
                    index: this.draggedElIndex,
                    item: {
                        id: 'ghost_item',
                        row,
                        column,
                        parent: this.getParentId(row, column),
                    },
                });

                this.__setState({
                    key: 'ghostIndex',
                    value: {
                        row,
                        column,
                    },
                });

                // const {
                //     x: columnXPos, width: columnWidth,
                // } = this.$el.getBoundingClientRect();
                // const isBefore = getDraggedColumnPositionState(
                //     pageX,
                //     columnXPos,
                //     columnWidth,
                // );
            }

            // const {
            //     pageX, pageY,
            // } = event;
            // const {
            //     overRow, directionOfCollision,
            // } = this.mousePosition;
            // const localDirectionOfCollision = this.getMouseOverProps(pageX, pageY);
            // const collidingItem = this.getCollidingItemAtRow(overRow);
            // const isElementHasCollision = collidingItem !== null
            //     && directionOfCollision !== localDirectionOfCollision;
            // const isElementBeyondCollision = collidingItem === null && overRow > this.maxRow;
            //
            // if (isElementHasCollision) {
            //     this.setGhostItemPosition(this.getCollidingPosition(collidingItem));
            // } else if (isElementBeyondCollision) {
            //     let coordinates = {
            //         column: null,
            //         row: null,
            //     };
            //     const allowedColumn = this.getAllowedColumn();
            //
            //     if ((this.constantRoot && allowedColumn !== 0) || !this.constantRoot) {
            //         coordinates = {
            //             column: allowedColumn,
            //             row: this.maxRow + this.positionBetweenRows,
            //         };
            //     }
            //     this.setGhostItemPosition(coordinates);
            // }
            // return true;
        },
        getPosition({
            pageX,
            pageY,
        }) {
            const elements = document.elementsFromPoint(pageX, pageY);
            const shadowItem = elements.find(element => element.classList.contains('shadow-grid-item'));

            if (shadowItem) {
                return {
                    row: +shadowItem.getAttribute('row-index'),
                    column: +shadowItem.getAttribute('column-index'),
                };
            }

            return null;
        },
        insertElementIntoGrid() {
            const {
                row: ghostRow, column: ghostColumn,
            } = this.ghostElement;
            const {
                id, code, name, row, column,
            } = this.draggedElement;
            const rowToInsert = ghostRow === null ? row - this.positionBetweenRows : ghostRow;
            const columnToInsert = ghostRow === null ? column : ghostColumn;
            const parentId = this.getParentId(rowToInsert, columnToInsert);
            const childrenLength = this.hiddenItems[id]
                ? this.hiddenItems[id].filter(el => el.parent === id).length
                : 0;
            const droppedItem = {
                id,
                code,
                name,
                column: columnToInsert,
                row: rowToInsert,
                children: childrenLength,
                expanded: childrenLength > 0,
                parent: parentId,
            };

            this.removeGhostElement();
            this.addGridItem(droppedItem);
            if (!this.isMultiDraggable) {
                this.setDisabledElement({
                    languageCode: this.language,
                    elementId: id,
                    disabled: true,
                });
            }
            this.setChildrenLength({
                id: parentId,
                value: 1,
            });
            this.rebuildGrid(id);
            if (childrenLength > 0) {
                this.$emit('toggle-item', {
                    ...droppedItem,
                    row: rowToInsert + this.positionBetweenRows,
                });
            }
            this.calculateRowsCount();
            this.$emit('after-drop', id);
        },
        getElementBelowMouse(event) {
            const {
                xPos, yPos,
            } = getPositionForBrowser(event);
            const itemsContainer = this.$el;

            return {
                itemsContainer,
                isOutOfBounds: isMouseOutOfBoundsElement(itemsContainer, xPos, yPos),
            };
        },
        removeGhostElement() {
            const {
                id,
            } = this.ghostElement;

            this.ghostElement.row = null;
            this.ghostElement.column = null;
            this.removeGridItem(id);
        },
        getBottomCollidingColumn({
            neighborElColumn, collidingElColumn,
        }) {
            const {
                overColumn,
            } = this.mousePosition;

            if (neighborElColumn !== null && collidingElColumn < neighborElColumn) {
                return neighborElColumn;
            }

            return overColumn > collidingElColumn ? collidingElColumn + 1 : collidingElColumn;
        },
        getTopCollidingColumn({
            neighborElColumn, collidingElColumn,
        }) {
            const {
                overColumn,
            } = this.mousePosition;

            if (overColumn >= collidingElColumn && overColumn <= neighborElColumn + 1) {
                return overColumn;
            }

            return collidingElColumn;
        },
        getGhostCollidingColumn(topNeighborColumn, bottomNeighborColumn) {
            const {
                overColumn,
            } = this.mousePosition;
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
            const {
                id, row: collidingElRow, column: collidingElColumn,
            } = collidingEl;

            if (id === 'ghost_item') {
                const topNeighbor = this.dataWithoutGhostElement[
                    collidingElRow - this.positionBetweenRows
                ];
                const bottomNeighbor = this.dataWithoutGhostElement[
                    collidingElRow + this.positionBetweenRows
                ];
                const columnForLastRow = !bottomNeighbor ? this.getAllowedColumn() : 0;

                if (this.constantRoot && columnForLastRow === 0) {
                    return {
                        row: null,
                        column: null,
                    };
                }
                return {
                    column: bottomNeighbor && topNeighbor
                        ? this.getGhostCollidingColumn(topNeighbor.column, bottomNeighbor.column)
                        : columnForLastRow,
                    row: collidingElRow,
                };
            }
            const {
                directionOfCollision,
            } = this.mousePosition;
            const isTop = directionOfCollision === 'top';
            const [
                neighborEl,
            ] = this.dataWithoutGhostElement.filter(
                el => el.row === (isTop ? collidingElRow - 1 : collidingElRow + 1),
            );
            const isFirstElement = (!neighborEl || collidingElRow === 0) && isTop;
            const collidingData = {
                neighborElColumn: neighborEl ? neighborEl.column : null,
                collidingElColumn,
            };

            if (this.constantRoot && collidingElColumn === 0) {
                return {
                    row: null,
                    column: null,
                };
            }

            if (isFirstElement) {
                return {
                    column: 0,
                    row: -this.positionBetweenRows,
                };
            }

            return {
                column: isTop
                    ? this.getTopCollidingColumn(collidingData)
                    : this.getBottomCollidingColumn(collidingData),
                row: (isTop ? collidingElRow - 1 : collidingElRow) + this.positionBetweenRows,
            };
        },
        getParentId(row, column) {
            if (column > 0) {
                const possibleParents = this.gridData.filter(
                    element => element.column === column - 1 && element.row < row,
                );

                const closestParent = getObjectWithMaxValueInArrayByObjectKey(possibleParents, 'row');

                if (closestParent) {
                    return this.gridData[closestParent.row].id;
                }
            }

            return 'root';
        },
        setGhostItemPosition({
            column, row,
        }) {
            const isPositionNotDuplicated = (this.ghostElement.column !== column
                || this.ghostElement.row !== row) && (row !== null && column !== null);

            if (isPositionNotDuplicated) {
                this.ghostElement.row = row;
                this.ghostElement.column = column;
                this.ghostElement.parent = this.getParentId(row, column);
                this.addGridItem({
                    ...this.ghostElement,
                });
            }
        },
        getMouseOverProps(pageX, pageY) {
            const elements = document.elementsFromPoint(pageX, pageY);
            const shadowItem = elements.find(e => e.classList.contains('shadow-grid-item'));

            if (shadowItem) {
                const positionOverRow = pageY - shadowItem.getBoundingClientRect().top;
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
            const centerPosition = Math.floor(this.rowHeight / 2);

            return layerPositionY > centerPosition ? 'bottom' : 'top';
        },
        isRowGet(row) {
            const [
                item,
            ] = this.gridData.filter(element => element.row === row);

            return item || null;
        },
        getCollidingItemAtRow(row) {
            const {
                row: ghostRow,
            } = this.ghostElement;
            const newRow = ghostRow !== null && row > ghostRow
                ? row - 1
                : row;

            if (ghostRow !== null && row === ghostRow + this.positionBetweenRows) {
                return this.isRowGet(ghostRow);
            }

            return this.isRowGet(newRow);
        },
        getAllowedColumn() {
            const {
                overColumn,
            } = this.mousePosition;
            const {
                column: interactionColumn,
            } = this.isRowGet(this.maxRow);

            return overColumn > interactionColumn ? interactionColumn + 1 : overColumn;
        },
    },
};
</script>

<style lang="scss" scoped>
    .template-grid-container {
        position: relative;
        height: 100%;
    }
</style>
