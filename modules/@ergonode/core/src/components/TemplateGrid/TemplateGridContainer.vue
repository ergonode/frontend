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
    getRowBounds,
} from '@Core/models/template_grid/TreeCalculations';
import {
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
            default: () => [],
        },
        hiddenItems: {
            type: Object,
            default: () => ({}),
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
        additionalRows: 3,
        rowBounds: {},
        debounceFunc: null,
    }),
    computed: {
        ...mapState('gridDesigner', [
            'fullGridData',
        ]),
        ...mapState('authentication', {
            language: state => state.user.language,
        }),
        ...mapState('draggable', [
            'draggedElement',
            'draggedElIndex',
            'ghostIndex',
        ]),
        maxRow() {
            return getObjectWithMaxValueInArrayByObjectKey(this.gridData, 'row').row;
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
            'removeGridItem',
            '',
            'shiftItems',
            'addItem',
            'removeItemAtIndex',
            'setItemAtIndex',
            'insertItemAtIndex',
            'swapItemsPosition',
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
                    column,
                } = shadowItem;
                const item = this.gridData[row];
                const {
                    id,
                    children,
                    code,
                } = item;
                const fixedColumn = Math.min(column, item.column);
                const parent = this.getParent(row, fixedColumn);

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
                        column: fixedColumn,
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

                // this.setChildrenLength({
                //     id: parent,
                //     value: -1,
                // });

                this.setItemAtIndex({
                    index: row,
                    item: {
                        id: 'ghost_item',
                        row,
                        column: fixedColumn,
                        parent: parent.id,
                    },
                });

                if (children > 0 && typeof this.hiddenItems[id] === 'undefined') {
                    this.$emit('expand', item);
                }
            }
        },
        onDrop(event) {
            if (this.ghostIndex !== -1) {
                console.log('drop');
                const parent = this.getParent(this.ghostIndex.row, this.ghostIndex.column);
                const item = {
                    ...this.draggedElement,
                    ...this.ghostIndex,
                    parent: parent.id,
                };

                this.setItemAtIndex({
                    index: this.ghostIndex.row,
                    item,
                });

                const nextRow = this.ghostIndex.row + 1;

                if (nextRow < this.gridData.length
                    && this.gridData[nextRow].column - this.ghostIndex.column === 1) {
                    this.setItemAtIndex({
                        index: nextRow,
                        item: {
                            ...this.gridData[nextRow],
                            parent: this.draggedElement.id,
                        },
                    });
                }

                if (item.children > 0 && typeof this.hiddenItems[item.id] !== 'undefined') {
                    this.$emit('expand', item);
                }

                this.__setState({
                    key: 'ghostIndex',
                    value: -1,
                });
            }

            event.preventDefault();
        },
        onDragEnd(event) {
            removeElementCopyFromDocumentBody(event);

            const {
                xPos,
                yPos,
            } = getPositionForBrowser(event);
            const trashElement = document.documentElement.querySelector('.drop-zone');
            const isDroppedToTrash = isMouseInsideElement(trashElement, xPos, yPos);

            if (isDroppedToTrash) {
                this.$emit('remove', this.draggedElement);
            } else if (this.isOutOfBounds(event)) {
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
            if (this.isOutOfBounds(event) && this.ghostIndex !== -1) {
                this.shiftItems({
                    since: this.ghostIndex.row,
                    value: -1,
                });
                this.removeItemAtIndex(this.ghostIndex.row);
                this.__setState({
                    key: 'ghostIndex',
                    value: -1,
                });
                console.log('left');
            }
        },
        onDragOver(event) {
            event.preventDefault();

            if (this.ghostIndex === -1) {
                this.insertGhostItemOnEnter(event);
            } else if (this.gridData.length > 1) {
                this.updateGhostItemPositionOnDragOver(event);
            }
        },
        updateGhostItemPositionOnDragOver(event) {
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

                const isBeforeRow = getDraggedRowPositionState(
                    event.pageY,
                    shadowItemYPos,
                    shadowItemHeight,
                );

                const isSamePosition = row === this.ghostIndex.row
                    && column === this.ghostIndex.column;
                const isAbovePreviousRow = !isBeforeRow && this.ghostIndex.row === row + 1;
                const isBeforeNextRow = isBeforeRow && this.ghostIndex.row === row - 1;

                if (isSamePosition
                    || isAbovePreviousRow
                    || isBeforeNextRow) {
                    return;
                }

                const isSameRow = row === this.ghostIndex.row;

                if (isSameRow) {
                    this.updateHorizontally(row, column);
                } else {
                    this.updateVertically(row, column);
                }
            }
        },
        updateHorizontally(row, column) {
            if (this.isColliding(row, column)) {
                return;
            }

            const parent = this.getParent(row, column);

            this.setItemAtIndex({
                index: this.ghostIndex.row,
                item: {
                    id: 'ghost_item',
                    row,
                    column,
                    parent: parent.id,
                },
            });

            this.__setState({
                key: 'ghostIndex',
                value: {
                    row,
                    column,
                },
            });
        },
        updateVertically(row, column) {
            const fromRow = this.ghostIndex.row;

            const isColliding = this.isColliding(row, column);

            let since = fromRow;
            let till = row;
            let ghostShiftRow = row - fromRow;
            const ghostColumn = isColliding
                ? this.gridData[row].column
                : Math.min(this.gridData[row].column + 1, column);
            let shiftRow = -1;

            if (fromRow > row) {
                since = row;
                till = fromRow;
                shiftRow = 1;
                ghostShiftRow = row - fromRow;
            }

            this.swapItemsPosition({
                since,
                till,
                ghostShiftRow,
                ghostColumn,
                shiftRow,
                parentId: this.getParent(till, ghostColumn).id,
            });

            this.__setState({
                key: 'ghostIndex',
                value: {
                    row: fromRow + ghostShiftRow,
                    column: ghostColumn,
                },
            });
        },
        insertGhostItemOnEnter(event) {
            const shadowItem = this.getShadowItem(event);

            if (shadowItem) {
                const {
                    row,
                } = shadowItem;
                const fixedRow = Math.min(row, this.gridData.length - 1);

                let column = 0;

                if (fixedRow !== -1) {
                    column = this.gridData[fixedRow].column;
                }

                const parent = this.getParent(fixedRow, column);

                if (row < this.gridData.length) {
                    this.shiftItems({
                        since: row - 1,
                        value: 1,
                    });

                    this.insertItemAtIndex({
                        index: fixedRow,
                        item: {
                            id: 'ghost_item',
                            row: fixedRow,
                            column,
                            parent: parent.id,
                        },
                    });

                    this.__setState({
                        key: 'ghostIndex',
                        value: {
                            row: fixedRow,
                            column,
                        },
                    });
                } else {
                    this.addItem({
                        id: 'ghost_item',
                        row: this.gridData.length,
                        column,
                        parent: parent.id,
                    });

                    this.__setState({
                        key: 'ghostIndex',
                        value: {
                            row: fixedRow + 1,
                            column,
                        },
                    });
                }
            }
        },
        isColliding(row, column) {
            const aboveColumn = this.getAboveItem(row).column;
            const bellowColumn = this.getBellowItem(row).column;

            const isCollidingTop = !(aboveColumn >= bellowColumn
                && column > this.ghostIndex.column
                && column <= aboveColumn + 1);
            const isCollidingBottom = !(bellowColumn <= aboveColumn
                && column < this.ghostIndex.column
                && column >= bellowColumn);

            return (isCollidingTop && isCollidingBottom) || row === 0;
        },
        getAboveItem(row) {
            return row - 1 > 0
                ? this.gridData[row - 1]
                : this.gridData[0];
        },
        getBellowItem(row) {
            return row + 1 < this.gridData.length
                ? this.gridData[row + 1]
                : this.gridData[0];
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
        isOutOfBounds(event) {
            const {
                xPos,
                yPos,
            } = getPositionForBrowser(event);

            return isMouseOutOfBoundsElement(this.$el, xPos, yPos);
        },
        getParent(row, column) {
            if (!this.gridData.length) {
                return {
                    id: null,
                    row: 0,
                    column: 0,
                };
            }

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
        flex: 1;
    }
</style>
