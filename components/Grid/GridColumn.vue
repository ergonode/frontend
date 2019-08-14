/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="
            [
                'column',
                'border-right',
                {
                    'column__extender': isExtenderColumn,
                    'column__ghost': isDraggedColumn,
                    'column--last': isLast,
                }
            ]"
        :style="colGridTemplate"
        :draggable="isColumnDraggable"
        @dragstart="onDragStart"
        @dragend="onDragEnd"
        @dragover="onDragOver"
        @dragleave="onDragLeave"
        @drop="onDrop">
        <template v-if="!isDraggedColumn && column.id !== 'ghost'">
            <slot />
            <div
                v-if="!isExtenderColumn && isColumnResizeable"
                :class="['column__resizer', {
                    'column__resizer--resizing': isResizing
                }]"
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
        storeNamespace: {
            type: String,
            required: true,
        },
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
        isPinned: {
            type: Boolean,
            default: false,
        },
        isLast: {
            type: Boolean,
            default: false,
        },
        isLastRightPinnedColumn: {
            type: Boolean,
            default: false,
        },
        isLastLeftPinnedColumn: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isResizing: false,
        };
    },
    beforeCreate() {
        this.startWidth = 0;
        this.startX = 0;
        this.columnWidth = 0;
    },
    beforeDestroy() {
        delete this.startWidth;
        delete this.startX;
        delete this.columnWidth;
    },
    mounted() {
        const { width } = this.column;
        this.$el.style.width = width ? `${width}px` : 'auto';
    },
    computed: {
        ...mapState('authentication', {
            languageCode: state => state.user.language,
        }),
        ...mapState('draggable', {
            draggedElement: state => state.draggedElement,
            ghostIndex: state => state.ghostIndex,
            bounds: state => state.bounds,
            ghostElTransform: state => state.ghostElTransform,
            draggedElIndex: state => state.draggedElIndex,
        }),
        colGridTemplate() {
            return {
                gridAutoRows: `${this.rowsHeight}px`,
            };
        },
        gridState() {
            return this.$store.state[this.storeNamespace];
        },
        isPinnedColumn() {
            return this.gridState.pinnedColumns.find(col => col.id === this.column.id);
        },
        isColumnDraggable() {
            return this.gridState.configuration.isColumnMoveable;
        },
        isColumnResizeable() {
            return this.gridState.configuration.isColumnResizeable;
        },
        isExtenderColumn() {
            return this.column.id === 'extender';
        },
        isDraggedColumn() {
            return this.draggedElIndex === this.index;
        },
    },
    methods: {
        ...mapActions('draggable', [
            'setDraggableState',
            'setDraggedElement',
            'setDraggedElIndex',
            'setGhostElXTranslation',
            'setBounds',
            'setGhostElTransform',
            'setGhostIndex',
        ]),
        onDragStart(event) {
            const { clientX, clientY } = event;
            const [header] = this.$el.children;
            const {
                x: headerXPos, y: headerYPos, height: headerHeight,
            } = header.getBoundingClientRect();
            const xOffset = 2.5;
            const grid = document.documentElement.querySelector('.grid');
            const isMouseAboveColumnHeader = headerYPos <= clientY
                && headerYPos + headerHeight >= clientY;
            const isMouseAboveLeftBorderLimit = clientX - headerXPos < xOffset;
            const neighbourIndex = this.index === 0 ? this.index : this.index - 1;

            if (!isMouseAboveColumnHeader
                || isMouseAboveLeftBorderLimit
                || this.isPinnedColumn
                || this.isExtenderColumn
                || this.isResizing) {
                event.preventDefault();

                return false;
            }

            addGridColumnCopyToDocumentBody(event, this.column.width);
            this.addBorderToRightNeighbour(grid.children[neighbourIndex]);
            this.setBounds({ width: this.column.width });
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
                    grid.children[i].style.transform = null;
                }

                if (this.ghostIndex !== index) {
                    this.$store.dispatch(`${this.storeNamespace}/changeColumnPosition`, {
                        from: index,
                        to: this.ghostIndex,
                    });
                }
            } else if (!isTrashBelowMouse) {
                this.$store.dispatch(`${this.storeNamespace}/insertColumnAtIndex`, {
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
                const grid = document.documentElement.querySelector('.grid');

                for (let i = 0; i < grid.children.length; i += 1) {
                    grid.children[i].style.transform = null;
                }

                this.$store.dispatch(`${this.storeNamespace}/getColumnData`, {
                    ghostIndex: this.ghostIndex,
                    columnId,
                    path: `${this.languageCode}/products`,
                });

                this.resetDraggedElementCache();
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
                || this.isPinnedColumn) {
                return false;
            }

            if (this.ghostIndex === -1) {
                this.insertColumnOnDragOver(isBefore, columnXPos, columnWidth);
            } else {
                this.updateColumnsTransition(isBefore);
                this.updateGhostIndex(isBefore);
            }

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
                    grid.children[i].style.transform = null;
                }

                this.$store.dispatch(`${this.storeNamespace}/removeColumnAtIndex`, { index: this.draggedElIndex });
                this.setGhostIndex();
                this.setDraggedElIndex();
                this.setGhostElTransform();
            }

            return true;
        },
        initResizeDrag(event) {
            this.isResizing = true;
            this.initMousePosition(event);
            this.initElementWidth();
            this.updateElementWidth(this.startWidth);
            this.addEventListenersForResizeState();
        },
        doResizeDrag(event) {
            const { clientX } = event;
            const width = this.getElementWidthBasedOnMouseXPosition(clientX);

            if (width > this.column.minWidth) {
                this.columnWidth = width;
                this.updateElementWidth(width);
            }
        },
        stopResizeDrag() {
            this.$store.dispatch(`${this.storeNamespace}/updateColumnWidthAtIndex`, {
                index: this.index, width: this.columnWidth,
            });
            this.removeEventListenersForResizeState();
            this.isResizing = false;
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
            neighbour.classList.add('border-right');
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
        insertColumnOnDragOver(isBefore, x, width) {
            let ghostColIndex = this.index;
            let xPos = x;
            if (!isBefore) {
                ghostColIndex = this.index + 1;
                xPos += width;
            }

            if (typeof this.draggedElement === 'object') {
                this.$store.dispatch(`${this.storeNamespace}/insertColumnAtIndex`, { column: this.draggedElement, index: ghostColIndex });
            } else {
                this.$store.dispatch(`${this.storeNamespace}/insertColumnAtIndex`, {
                    column: getGhostColumnElementModel(), index: ghostColIndex,
                });
                this.setBounds({ x: xPos, width: 100 });
            }

            this.setGhostIndex(ghostColIndex);
            this.setDraggedElIndex(ghostColIndex);
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
            const { offsetWidth } = this.$el;
            const { width: ghostElWidth } = this.bounds;

            let ghostElTransform = 0;
            let columnElTransform = 0;
            let columnElCurrentTransform = 0;

            if (this.$el.style.transform) {
                columnElCurrentTransform = +this.$el.style.transform.replace(/[^0-9\-.,]/g, '');
            }

            if (isBefore) {
                ghostElTransform = this.ghostElTransform - offsetWidth;
                columnElTransform = 0;
                if (columnElCurrentTransform === 0) {
                    columnElTransform = ghostElWidth;
                }
            } else {
                ghostElTransform = this.ghostElTransform + offsetWidth;
                columnElTransform = -ghostElWidth;
                if (columnElCurrentTransform > 0) {
                    columnElTransform = 0;
                }
            }

            this.setGhostElTransform(ghostElTransform);

            grid.children[this.draggedElIndex].style.transform = `translateX(${this.ghostElTransform}px)`;
            this.$el.style.transform = `translateX(${columnElTransform}px)`;
        },
        resetDraggedElementCache() {
            this.setBounds();
            this.setGhostIndex();
            this.setDraggedElIndex();
            this.setDraggedElement();
            this.setGhostElTransform();
        },
    },
};
</script>


<style lang="scss" scoped>
    .column {
        position: relative;
        display: grid;

        &::before {
            position: absolute;
            top: 0;
            right: 0;
            z-index: 10;
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

        &.border-right:not(&--last) {
            &::before {
                opacity: 1;
            }
        }

        &.hover {
            z-index: 999;

            &::after {
                opacity: 1;
            }
        }

        &.sticky {
            position: sticky;
            z-index: 9999;
        }

        &.drop-shadow-right-pinned {
            &::before {
                left: 0;
                right: unset;
                z-index: unset;
                background-color: unset;
                box-shadow:
                    0 2px 2px 0 rgba(0, 0, 0, 0.14),
                    0 3px 1px -2px rgba(0, 0, 0, 0.12),
                    0 1px 5px 0 rgba(0, 0, 0, 0.2);
                opacity: 1;
            }
        }

        &.drop-shadow-left-pinned {
            &::before {
                z-index: unset;
                background-color: unset;
                box-shadow:
                    0 2px 2px 0 rgba(0, 0, 0, 0.14),
                    0 3px 1px -2px rgba(0, 0, 0, 0.12),
                    0 1px 5px 0 rgba(0, 0, 0, 0.2);
                opacity: 1;
            }
        }

        &__resizer {
            position: absolute;
            top: 0;
            right: 0;
            z-index: 9;
            width: 2.5px;
            height: 100%;
            cursor: col-resize;

            &:not(&--resizing):hover, &--resizing {
                background-color: $darkGraphite;
            }
        }

        &__ghost {
            height: 100%;
            background-color: $primary;
            box-shadow:
                inset 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                inset 0 3px 1px 0 rgba(0, 0, 0, 0.12),
                inset 0 1px 5px 0 rgba(0, 0, 0, 0.2);
        }
    }
</style>
