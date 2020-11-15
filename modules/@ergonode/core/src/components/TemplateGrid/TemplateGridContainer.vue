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
    getDraggedRowPositionState,
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
            'swapItemsPosition',
            'setHiddenElementsForParent',
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
            const shadowItem = this.getShadowItem(event);

            if (shadowItem) {
                const {
                    row,
                } = shadowItem;
                const item = this.gridData[row];
                const {
                    id,
                    children,
                    parent,
                    expanded,
                    code,
                    column,
                } = item;

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

                // this.$emit('expand', item);
            }
        },
        onDrop(event) {
            if (this.ghostIndex !== -1) {
                console.log('drop');

                this.setItemAtIndex({
                    index: this.ghostIndex.row,
                    item: {
                        ...this.draggedElement,
                        ...this.ghostIndex,
                    },
                });

                this.__setState({
                    key: 'ghostIndex',
                    value: -1,
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
                console.log('remove');
                this.__setState({
                    key: 'ghostIndex',
                    value: -1,
                });
            }
        },
        onDragOver(event) {
            event.preventDefault();

            const shadowItem = this.getShadowItem(event);

            if (shadowItem && shadowItem.row < this.gridData.length) {
                const {
                    row,
                    column,
                } = shadowItem;

                const {
                    y: shadowItemYPos,
                    height: shadowItemHeight,
                } = shadowItem.element.getBoundingClientRect();

                const isBefore = getDraggedRowPositionState(
                    event.pageY,
                    shadowItemYPos,
                    shadowItemHeight,
                );

                const isSamePosition = row === this.ghostIndex.row
                    && column === this.ghostIndex.column;
                const isAbovePreviousRow = !isBefore && this.ghostIndex.row === row + 1;
                const isBeforeNextRow = isBefore && this.ghostIndex.row === row - 1;

                // console.log(this.gridData[row - 1].id === this.gridData[row].parent && this.gridData[row + 1].parent === this.gridData[row].parent);

                if (isSamePosition
                    || isAbovePreviousRow
                    || isBeforeNextRow) {
                    event.stopPropagation();

                    return;
                }

                // const parent = this.getParent(row, column);
                //
                // if (column - parent.column > 1) {
                //     event.stopPropagation();
                //
                //     // console.log('return');
                //
                //     return;
                // }

                const isSameRow = row === this.ghostIndex.row;
                // const isSameColumn = column === this.ghostIndex.column;
                // const isMaxColumnRangeExceeded = Math.abs(column - this.gridData[row].column) > 2;
                // const hasChildren = row + 1 < this.gridData.length && this.gridData[row + 1].parent === this.gridData[row].id;
                // const isParentAbove = this.gridData[row - 1].id === parent.id;

                if (isSameRow) {
                    // Navigate in horizontal direction; left - right

                    // TODO: Check for column collision

                    if (!this.isCollidingHorizontally(row, column)) {
                        console.log('insert', column);

                        this.setItemAtIndex({
                            index: this.ghostIndex.row,
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
                    }
                } else {
                    // Navigate between parent children; top - bottom
                    console.log('switching');
                    let fromRow = row - 1;
                    let toRow = this.ghostIndex.row + 1;

                    const fromColumn = this.gridData[row].column;
                    const toColumn = this.ghostIndex.column + Math.abs(column - this.gridData[row].column);

                    if (isBefore) {
                        fromRow = this.ghostIndex.row;
                        toRow = row;
                    }

                    this.swapItemsPosition({
                        fromRow,
                        toRow,
                        fromColumn,
                        toColumn,
                    });

                    this.__setState({
                        key: 'ghostIndex',
                        value: {
                            row,
                            column,
                        },
                    });
                }
            }
        },
        getShadowItem({
            pageX,
            pageY,
        }) {
            const elements = document.elementsFromPoint(pageX, pageY);
            const shadowItem = elements.find(element => element.classList.contains('shadow-grid-item'));

            if (shadowItem) {
                return {
                    element: shadowItem,
                    row: +shadowItem.getAttribute('row-index'),
                    column: +shadowItem.getAttribute('column-index'),
                };
            }

            return null;
        },
        isCollidingHorizontally(row, column) {
            const columns = [];
            // const nextItem = this.gridData[row + 1];
            const ghostItem = this.gridData[row];

            // if (row - 1 >= 0 && this.gridData[row - 1].id === ghostItem.parent) {
            //     return [];
            // }

            if (row + 1 < this.gridData.length && this.gridData[row + 1].parent === ghostItem.parent && this.gridData[row + 1].column - column < 2) {
                console.log('not colliding');
                return false;
            }

            // if (item.parent === prevItem.id) {
            //     if (nextItem.parent === prevItem.id) {
            //         return [];
            //     }
            //
            //     return [
            //         item.column,
            //         item.column + 1,
            //     ];
            // }

            // const maxColumn = ghostItem.column;
            //
            // for (let i = row + 1; i < this.gridData.length; i += 1) {
            //     const item = this.gridData[i];
            //
            //     if (item.parent !== ghostItem.parent) {
            //         if (item.column > maxColumn) {
            //             columns.push(item.column);
            //         }
            //     }
            //
            //     console.log(nextItem);
            // }

            return true;

            // if (item.id)
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
        getParentId(row, column) {
            if (column === 0 || row === 0) {
                return this.gridData[0];
            }

            if (this.gridData[row - 1].column === column) {
                return this.gridData[row - 1].parent;
            }

            return this.gridData[row - 1].id;
        },
        getParent(row, column) {
            if (column === 0 || row === 0) {
                return this.gridData[0];
            }

            for (let i = row - 1; i >= 0; i -= 1) {
                if (this.gridData[i].column < column) {
                    return this.gridData[i];
                }
            }

            return this.gridData[0];
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
