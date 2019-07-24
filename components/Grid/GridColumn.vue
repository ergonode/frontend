/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="
            [
                'column',
                `column-${column.id}`,
                'column--border-right',
                {
                    'column__left-pinned': column.isLeftPinned,
                    'column__right-pinned': column.isRightPinned,
                    'column__extender': isExtenderColumn,
                    'column__ghost': isDraggedColumn,
                }
            ]"
        :style="colRowsTemplate"
        draggable
        @dragstart="onDragStart"
        @dragend="onDragEnd"
        @dragover="onDragOver"
        @dragleave="onDragLeave"
        @drop="onDrop">
        <template v-if="!isDraggedColumn">
            <slot />
            <div
                class="column__resizer"
                @mousedown="initResizeDrag" />
        </template>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import {
    addGridColumnCopyToDocumentBody,
    removeGridColumnCopyFromDocumentBody,
    getGhostColumnElementModel,
} from '~/model/grid/layout/GridColumnElementCopy';
import {
    insertColumnAtIndexToCookie,
    removeColumnCookieByID,
} from '~/model/grid/cookies/GridLayoutConfiguration';
import {
    isMouseOutOfBoundsElement,
    getDraggedColumnPositionState,
} from '~/model/drag_and_drop/helpers';

export default {
    name: 'GridColumn',
    props: {
        index: {
            type: Number,
            required: true,
        },
        column: {
            type: Object,
            required: true,
        },
        rowsHeight: {
            type: Number,
            default: 40,
        },
        isPinnedRight: {
            type: Boolean,
            default: false,
        },
        isPinnedLeft: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            startWidth: 0,
            startX: 0,
            minWidth: this.column.width,
            columnWidth: null,
        };
    },
    computed: {
        ...mapState('authentication', {
            languageCode: state => state.user.language,
        }),
        ...mapState('draggable', {
            draggedElement: state => state.draggedElement,
            ghostIndex: state => state.ghostIndex,
            bounds: state => state.bounds,
            draggedElIndex: state => state.draggedElIndex,
        }),
        colRowsTemplate() {
            return {
                gridAutoRows: `${this.rowsHeight}px`,
            };
        },
        isExtenderColumn() {
            return this.column.id === 'extender';
        },
        isDraggedColumn() {
            return this.draggedElIndex === this.index;
        },
    },
    methods: {
        ...mapActions('grid', [
            'updateColumnWidthAtIndex',
            'removeColumnAtIndex',
            'insertColumnAtIndex',
            'changeColumnPosition',
            'getColumnData',
        ]),
        ...mapActions('draggable', [
            'updateXBound',
            'setDraggableState',
            'setDraggedElement',
            'setDraggedElIndex',
            'setGhostElXTranslation',
            'setBounds',
            'setGhostIndex',
        ]),
        onDragStart(event) {
            const { clientY } = event;
            const [header] = this.$el.children;
            const {
                y: headerYPos, height: headerHeight,
            } = header.getBoundingClientRect();
            const grid = document.documentElement.querySelector('.grid');
            const isMouseAboveColumnHeader = headerYPos <= clientY
                && headerYPos + headerHeight >= clientY;
            const neighbourIndex = this.index === 0 ? this.index : this.index - 1;
            const {
                x, width,
            } = this.$el.getBoundingClientRect();

            if (!isMouseAboveColumnHeader
                || this.isPinnedLeft
                || this.isPinnedRight
                || this.isExtenderColumn) {
                event.preventDefault();

                return false;
            }

            addGridColumnCopyToDocumentBody(event, width);
            this.addBorderToRightNeighbour(grid.children[neighbourIndex]);
            this.setBounds({ x, width });
            this.setGhostIndex(this.index);
            this.setDraggedElIndex(this.index);
            this.setDraggedElement({ ...this.column, index: this.index });
            this.setDraggableState({ propName: 'isColumnDragging', value: true });

            return true;
        },
        onDragEnd(event) {
            const { clientX, clientY } = event;
            const { index } = this.draggedElement;
            const elementBelowMouse = document.elementFromPoint(clientX, clientY);
            const isTrashBelowMouse = elementBelowMouse && elementBelowMouse.className === 'trash-can';
            const ghostColumnExists = this.ghostIndex !== -1;
            removeGridColumnCopyFromDocumentBody();

            if (ghostColumnExists) {
                const grid = document.documentElement.querySelector('.grid');

                for (let i = 0; i < grid.children.length; i += 1) {
                    grid.children[i].style.transform = 'translateX(0)';
                }

                if (this.ghostIndex !== index) {
                    this.changeColumnPosition({
                        from: index,
                        to: this.ghostIndex,
                    });
                }
            } else if (!isTrashBelowMouse) {
                this.insertColumnAtIndex({
                    column: this.draggedElement, index,
                });
                insertColumnAtIndexToCookie(this.$cookies, index, this.column.id);
            } else {
                removeColumnCookieByID(this.$cookies, this.draggedElement.id);
            }

            this.resetDraggedElementCache();

            this.setDraggableState({ propName: 'isColumnDragging', value: false });
        },
        onDrop(event) {
            event.preventDefault();
            const columnId = event.dataTransfer.getData('text/plain');

            if (columnId) {
                this.getColumnData({
                    index: this.ghostIndex + 1,
                    columnId,
                    path: `${this.languageCode}/products`,
                });

                if (this.ghostIndex !== -1) {
                    this.removeColumnAtIndex({ index: this.draggedElIndex });
                    this.resetDraggedElementCache();
                }
            }
        },
        onDragOver(event) {
            event.preventDefault();

            const { clientX } = event;
            const {
                x: columnXPos, width: columnWidth,
            } = this.$el.getBoundingClientRect();
            const isBefore = getDraggedColumnPositionState(
                clientX,
                columnXPos,
                columnWidth,
            );
            const fixedIndex = this.getColumnFixedIndex();

            if ((this.index === this.draggedElIndex && this.ghostIndex !== -1)
                || (isBefore && this.ghostIndex === fixedIndex - 1)
                || (!isBefore && this.ghostIndex === fixedIndex + 1)
                || (this.isExtenderColumn && !isBefore)
                || this.isPinnedLeft
                || this.isPinnedRight) {
                return false;
            }

            this.insertColumnOnDragOverIfNeeded(isBefore, columnXPos, columnWidth);
            this.updateColumnsTransition(isBefore);
            this.updateGhostIndex(isBefore);

            return true;
        },
        onDragLeave(event) {
            const { pageX, pageY } = event;

            if (pageX === 0 && pageY === 0) return false;

            const elementBelowMouse = document.elementFromPoint(pageX, pageY);
            const grid = document.documentElement.querySelector('.grid');
            const isOutOfBounds = isMouseOutOfBoundsElement(grid, pageX, pageY);
            const ghostColumnExists = this.draggedElIndex >= 0;
            const isTrashBelowMouse = elementBelowMouse && elementBelowMouse.className === 'trash-can';

            if ((isOutOfBounds || isTrashBelowMouse) && ghostColumnExists) {
                for (let i = 0; i < grid.children.length; i += 1) {
                    grid.children[i].style.transform = 'translateX(0)';
                }
                this.removeColumnAtIndex({ index: this.draggedElIndex });
                this.setGhostIndex();
                this.setDraggedElIndex();
            }

            return true;
        },
        initResizeDrag(event) {
            this.initMousePosition(event);
            this.initElementWidth();
            this.initElementStyleForResizeState();
            this.addEventListenersForResizeState();
        },
        doResizeDrag(event) {
            const { clientX } = event;
            const width = this.getElementWidthBasedOnMouseXPosition(clientX);

            if (width > this.minWidth) {
                this.columnWidth = width;
                this.updateElementWidth(width);
            }
        },
        stopResizeDrag() {
            // this.updateColumnWidthAtIndex({ index: this.index, width: this.columnWidth });
            this.removeEventListenersForResizeState();
        },
        initMousePosition({ clientX }) {
            this.startX = clientX;
        },
        initElementWidth() {
            const {
                width: elementWidth,
            } = this.$el.getBoundingClientRect();

            this.startWidth = parseInt(elementWidth, 10);
        },
        initElementStyleForResizeState() {
            this.$el.style.width = `${this.startWidth}px`;
        },
        getElementWidthBasedOnMouseXPosition(xPos) {
            return this.startWidth + xPos - this.startX;
        },
        updateElementWidth(width) {
            this.$el.style.width = `${width}px`;
        },
        addEventListenersForResizeState() {
            document.documentElement.addEventListener(
                'mousemove',
                this.doResizeDrag,
                false,
            );
            document.documentElement.addEventListener(
                'mouseup',
                this.stopResizeDrag,
                false,
            );
        },
        removeEventListenersForResizeState() {
            document.documentElement.removeEventListener(
                'mousemove',
                this.doResizeDrag,
                false,
            );
            document.documentElement.removeEventListener(
                'mouseup',
                this.stopResizeDrag,
                false,
            );
        },
        addBorderToRightNeighbour(neighbour) {
            neighbour.classList.add('column--border-right');
        },
        getColumnFixedIndex() {
            if (this.$el.style.transform) {
                const xTransform = this.$el.style.transform.replace(/[^0-9\-.,]/g, '');

                if (+xTransform) {
                    if (+xTransform > 0) return this.index + 1;

                    return this.index - 1;
                }
            }

            return this.index;
        },
        insertColumnOnDragOverIfNeeded(isBefore, x, width) {
            if (this.ghostIndex === -1) {
                let ghostColIndex = this.index;
                let xPos = x;
                if (!isBefore) {
                    ghostColIndex = this.index + 1;
                    xPos += width;
                }

                if (typeof this.draggedElement === 'object') {
                    this.insertColumnAtIndex({ column: this.draggedElement, index: ghostColIndex });
                    this.updateXBound(xPos);
                } else {
                    this.insertColumnAtIndex({
                        column: getGhostColumnElementModel(), index: ghostColIndex,
                    });
                    this.setBounds({ x: xPos, width: 100 });
                }

                this.setGhostIndex(ghostColIndex);
                this.setDraggedElIndex(ghostColIndex);
            }
        },
        updateGhostIndex(isBefore) {
            if (this.index < this.draggedElIndex) {
                this.setGhostIndex(isBefore ? this.index : this.index + 1);
            } else {
                this.setGhostIndex(isBefore ? this.index - 1 : this.index);
            }
        },
        updateColumnsTransition(isBefore) {
            const grid = document.documentElement.querySelector('.grid');
            const { x: ghElXPos, width: ghElWidth } = this.bounds;
            const { offsetLeft, offsetWidth } = this.$el;
            let ghostElTransformValue = 0;
            let columnElTransformValue = 0;

            if (isBefore) {
                if (ghElXPos > offsetLeft) {
                    ghostElTransformValue = offsetLeft - ghElXPos;
                    columnElTransformValue = ghElWidth;
                } else {
                    ghostElTransformValue = offsetLeft - ghElWidth - ghElXPos;
                    columnElTransformValue = 0;
                }
            } else if (ghElXPos > offsetLeft) {
                ghostElTransformValue = offsetLeft - ghElXPos + offsetWidth;
                columnElTransformValue = 0;
            } else {
                ghostElTransformValue = offsetLeft + offsetWidth - ghElWidth - ghElXPos;
                columnElTransformValue = -ghElWidth;
            }

            grid.children[this.draggedElIndex].style.transform = `translateX(${ghostElTransformValue}px)`;
            this.$el.style.transform = `translateX(${columnElTransformValue}px)`;
        },
        resetDraggedElementCache() {
            this.setBounds();
            this.setGhostIndex();
            this.setDraggedElIndex();
            this.setDraggedElement();
        },
    },
};
</script>


<style lang="scss" scoped>
    .column {
        position: relative;
        display: grid;
        padding-right: 1px;
        transform: translateX(0);

        &::before {
            position: absolute;
            top: 0;
            right: 0;
            width: 1px;
            height: 100%;
            background-color: $grey;
            opacity: 0;
            content: "";
        }

        &::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            box-shadow:
                0 2px 2px 0 rgba(0, 0, 0, 0.14),
                0 3px 1px -2px rgba(0, 0, 0, 0.12),
                0 1px 5px 0 rgba(0, 0, 0, 0.2);
            opacity: 0;
            pointer-events: none;
            content: "";
        }

        &--border-right {
            &::before {
                opacity: 1;
            }
        }

        &.hover {
            z-index: 3;

            &::after {
                opacity: 1;
            }
        }

        &__resizer {
            position: absolute;
            top: 0;
            right: 1px;
            width: 5px;
            height: 100%;
            cursor: col-resize;
        }

        &__ghost {
            height: 100%;
            background-color: $primary;
            box-shadow:
                inset 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                inset 0 3px 1px 0 rgba(0, 0, 0, 0.12),
                inset 0 1px 5px 0 rgba(0, 0, 0, 0.2);
        }

        &__right-pinned {
            position: sticky;
            right: 0;
            z-index: 3;
        }

        &__left-pinned {
            left: 0;
        }
    }
</style>
