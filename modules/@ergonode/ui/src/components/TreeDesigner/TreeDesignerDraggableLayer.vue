/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <DesignerDraggableLayer
        :draggable="!disabled"
        @dragstart.native="onDragStart"
        @dragend.native="onDragEnd"
        @dragover.native="onDragOver"
        @dragleave.native="onDragLeave"
        @drop.native="onDrop">
        <slot />
    </DesignerDraggableLayer>
</template>

<script>
import {
    DRAGGED_ELEMENT,
} from '@Core/defaults/grid';
import {
    addElementCopyToDocumentBody,
    removeElementCopyFromDocumentBody,
} from '@Core/models/layout/ElementCopy';
import DesignerDraggableLayer from '@UI/components/Designer/DesignerDraggableLayer';
import {
    getBackgroundItem,
} from '@UI/models/designer/index';
import {
    getDraggedRowPositionState,
} from '@UI/models/dragAndDrop/helpers';
import {
    getFixedMousePosition,
    isMouseOutsideElement,
} from '@UI/models/mouse';
import {
    getParent,
} from '@UI/models/treeDesigner';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'TreeDesignerDraggableLayer',
    components: {
        DesignerDraggableLayer,
    },
    props: {
        /**
         * Grid data model
         */
        items: {
            type: Array,
            default: () => [],
        },
        hiddenItems: {
            type: Object,
            default: () => ({}),
        },
        childrenLength: {
            type: Object,
            default: () => ({}),
        },
        /**
         * Determines edit mode state
         */
        disabled: {
            type: Boolean,
            default: false,
        },
        singleRoot: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            wasItemExpanded: false,
        };
    },
    computed: {
        ...mapState('draggable', [
            'draggedElement',
            'draggedElIndex',
            'ghostIndex',
            'isOverDropZone',
        ]),
    },
    methods: {
        ...mapActions('draggable', [
            '__setState',
        ]),
        onDragStart(event) {
            const backgroundItem = getBackgroundItem({
                pageX: event.pageX,
                pageY: event.pageY,
            });

            if (this.items.length === 0
                || !backgroundItem
                || backgroundItem.row >= this.items.length
                || backgroundItem.column < this.items[backgroundItem.row].column
                || backgroundItem.column > this.items[backgroundItem.row].column + 1) {
                event.preventDefault();

                return;
            }

            const {
                row,
                column,
            } = backgroundItem;
            const item = this.items[row];
            const {
                id,
                code,
            } = item;
            const fixedColumn = Math.min(column, item.column);
            const parent = getParent({
                items: this.items,
                row,
                column: fixedColumn,
            });

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

            this.$emit('update-item', {
                index: this.ghostIndex.row,
                item: {
                    id: 'ghost_item',
                    row,
                    column: fixedColumn,
                    parent: parent.id,
                },
            });

            if (typeof this.hiddenItems[id] === 'undefined' && this.childrenLength[item.id]) {
                this.wasItemExpanded = true;

                this.$emit('expand-item', item);
            }
        },
        onDrop(event) {
            if (this.ghostIndex !== -1) {
                const parent = getParent({
                    items: this.items,
                    row: this.ghostIndex.row,
                    column: this.ghostIndex.column,
                });
                const item = {
                    ...this.draggedElement,
                    ...this.ghostIndex,
                    parent: parent.id,
                };

                this.$emit('update-item', {
                    index: this.ghostIndex.row,
                    item,
                });

                if (this.wasItemExpanded) {
                    this.wasItemExpanded = false;

                    this.$emit('expand-item', item);
                }

                this.__setState({
                    key: 'ghostIndex',
                    value: -1,
                });
                this.__setState({
                    key: 'draggedElIndex',
                    value: -1,
                });

                this.$emit('drop-item', item);
            }

            event.preventDefault();
        },
        onDragEnd(event) {
            removeElementCopyFromDocumentBody(event);

            if (this.isOverDropZone) {
                this.__setState({
                    key: 'isOverDropZone',
                    value: false,
                });

                this.$emit('remove-items', this.draggedElement);
            } else if (this.draggedElIndex !== -1 && this.ghostIndex === -1) {
                this.$emit('shift-items', {
                    since: this.draggedElIndex - 1,
                    value: 1,
                });
                this.$emit('insert-item', {
                    index: this.draggedElIndex,
                    item: this.draggedElement,
                });
            }

            this.__setState({
                key: 'draggedElement',
                value: null,
            });
            this.__setState({
                key: 'draggedInScope',
                value: '',
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
                xPos,
                yPos,
            } = getFixedMousePosition(event);

            if (this.isOutOfBounds({
                xPos,
                yPos,
            }) && this.ghostIndex !== -1) {
                this.$emit('shift-items', {
                    since: this.ghostIndex.row,
                    value: -1,
                });
                this.$emit('remove-item', this.ghostIndex.row);

                this.__setState({
                    key: 'ghostIndex',
                    value: -1,
                });
            }
        },
        onDragOver(event) {
            event.preventDefault();

            const backgroundItem = getBackgroundItem({
                pageX: event.pageX,
                pageY: event.pageY,
            });

            if (!backgroundItem
                || (this.singleRoot && this.items.length > 0
                    && (backgroundItem.row === 0 || backgroundItem.column === 0))) {
                return;
            }

            if (this.ghostIndex === -1) {
                this.insertGhostItemOnEnter(event, backgroundItem);
            } else if (this.items.length > 1) {
                this.updateGhostItemPositionOnDragOver(event, backgroundItem);
            }
        },
        updateGhostItemPositionOnDragOver(event, backgroundItem) {
            if (backgroundItem.row < this.items.length) {
                const {
                    row,
                    column,
                } = backgroundItem;

                const {
                    y: backgroundItemYPos,
                    height: backgroundItemHeight,
                } = backgroundItem.element.getBoundingClientRect();

                const isBeforeRow = getDraggedRowPositionState(
                    event.pageY,
                    backgroundItemYPos,
                    backgroundItemHeight,
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

            const parent = getParent({
                items: this.items,
                row,
                column,
            });

            this.$emit('update-item', {
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

            // GOING DOWN
            let since = fromRow;
            let till = row;
            let ghostShiftRow = row - fromRow;
            let ghostColumn = this.items[row].column;
            let shiftRow = -1;

            if (fromRow > row) {
                // GOING UP
                since = row;
                till = fromRow;
                shiftRow = 1;
                ghostShiftRow = row - fromRow;

                const aboveColumn = this.getAboveItem(since).column;

                if (aboveColumn - this.items[since].column > -1
                    && column > aboveColumn
                    && since > 0) {
                    const distance = Math.abs(this.items[since].column - column);

                    if (distance >= 1) {
                        ghostColumn = aboveColumn + 1;
                    }
                }
            } else {
                const bellowSinceColumn = this.getBellowItem(since).column;
                const bellowTillColumn = this.getBellowItem(till).column;

                if (bellowSinceColumn - bellowTillColumn < 0) {
                    const distance = Math.abs(this.items[since].column - column);

                    if (distance >= 0) {
                        ghostColumn = bellowSinceColumn + 1;
                    }
                }
            }

            this.$emit('update-items', {
                since,
                till,
                ghostShiftRow,
                ghostColumn,
                shiftRow,
                parentId: getParent({
                    items: this.items,
                    row: till,
                    column: ghostColumn,
                }).id,
            });
            this.__setState({
                key: 'ghostIndex',
                value: {
                    row: fromRow + ghostShiftRow,
                    column: ghostColumn,
                },
            });
        },
        insertGhostItemOnEnter(event, backgroundItem) {
            const {
                row,
            } = backgroundItem;
            const fixedRow = Math.min(row, this.items.length - 1);

            let column = 0;

            if (fixedRow !== -1) {
                column = this.items[fixedRow].column;
            }

            const parent = getParent({
                items: this.items,
                row: fixedRow,
                column,
            });
            const fixedColumn = this.singleRoot && column === 0 && this.items.length > 0
                ? column + 1
                : column;

            if (row < this.items.length) {
                this.$emit('shift-items', {
                    since: row - 1,
                    value: 1,
                });
                this.$emit('insert-item', {
                    index: fixedRow,
                    item: {
                        id: 'ghost_item',
                        row: fixedRow,
                        column: fixedColumn,
                        parent: parent.id,
                    },
                });
                this.__setState({
                    key: 'ghostIndex',
                    value: {
                        row: fixedRow,
                        column: fixedColumn,
                    },
                });
            } else {
                this.$emit('add-item', {
                    id: 'ghost_item',
                    row: this.items.length,
                    column: fixedColumn,
                    parent: parent.id,
                });
                this.__setState({
                    key: 'ghostIndex',
                    value: {
                        row: fixedRow + 1,
                        column: fixedColumn,
                    },
                });
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
                ? this.items[row - 1]
                : this.items[0];
        },
        getBellowItem(row) {
            return row + 1 < this.items.length
                ? this.items[row + 1]
                : this.items[0];
        },
        isOutOfBounds({
            xPos,
            yPos,
        }) {
            return isMouseOutsideElement(this.$el, xPos, yPos);
        },
    },
};
</script>
