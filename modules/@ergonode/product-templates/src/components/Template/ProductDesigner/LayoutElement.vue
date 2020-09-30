/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="classes"
        :draggable="isDraggingEnabled && !disabled"
        ref="layoutElement"
        @dragstart="onDragStart"
        @dragend="onDragEnd">
        <slot name="content" />
        <IconResize
            v-if="!disabled"
            class="layout-element__resizer"
            :width="8"
            :height="8"
            view-box="0 0 8 8"
            @mousedown.native="onInitResize" />
    </div>
</template>

<script>
import {
    GREEN,
} from '@Core/assets/scss/_js-variables/colors.scss';
import {
    ELEVATOR_HOLE,
} from '@Core/assets/scss/_js-variables/elevators.scss';
import IconResize from '@Core/components/Icons/Others/IconResize';
import {
    DRAGGED_ELEMENT,
} from '@Core/defaults/grid';
import {
    getPositionForBrowser,
    isMouseInsideElement,
} from '@Core/models/drag_and_drop/helpers';
import {
    addElementCopyToDocumentBody,
    removeElementCopyFromDocumentBody,
} from '@Core/models/layout/ElementCopy';
import {
    addResizablePlaceholder,
    removeResizablePlaceholder,
    updateResizablePlaceholderHeight,
    updateResizablePlaceholderWidth,
} from '@Templates/models/layout/GhostElement';
import {
    getColumnBasedOnWidth,
    getHighlightingLayoutDropPositions,
    getHighlightingPositions,
    getMaxColumnForGivenRow,
    getMaxRowForGivenColumn,
    getRowBasedOnHeight,
} from '@Templates/models/layout/LayoutCalculations';
import {
    mapActions,
    mapState,
} from 'vuex';

const registerResizeEventListeners = () => import('@Core/models/resize/registerResizeEventListeners');
const unregisterResizeEventListeners = () => import('@Core/models/resize/unregisterResizeEventListeners');

export default {
    name: 'LayoutElement',
    components: {
        IconResize,
    },
    props: {
        index: {
            type: Number,
            required: true,
        },
        disabled: {
            type: Boolean,
            required: true,
        },
        element: {
            type: Object,
            required: true,
        },
        columnsNumber: {
            type: Number,
            required: true,
        },
        rowsNumber: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            isDraggingEnabled: true,
            startX: 0,
            startY: 0,
            startWidth: 0,
            startHeight: 0,
            minWidth: 0,
            minHeight: 0,
            maxWidth: 0,
            maxHeight: 0,
            newWidth: 0,
            newHeight: 0,
            actualElementRow: 0,
            actualElementColumn: 0,
            highlightingPositions: [],
            elementsGap: 16,
            isDragged: false,
        };
    },
    computed: {
        ...mapState('productTemplate', [
            'layoutElements',
        ]),
        ...mapState('draggable', [
            'draggedElement',
        ]),
        classes() {
            return [
                'layout-element',
                {
                    'layout-element--dragged': this.isDragged,
                    'layout-element--resized': !this.isDraggingEnabled,
                    'layout-element--disabled': this.disabled,
                },
            ];
        },
    },
    methods: {
        ...mapActions('productTemplate', [
            'updateLayoutElementAtIndex',
            'removeLayoutElementAtIndex',
        ]),
        ...mapActions('draggable', [
            '__setState',
        ]),
        onDragStart(event) {
            const {
                id, width, height,
            } = this.element;

            this.__setState({
                key: 'draggedElement',
                value: {
                    ...this.element,
                    index: this.index,
                },
            });
            this.__setState({
                key: 'isElementDragging',
                value: DRAGGED_ELEMENT.TEMPLATE,
            });
            window.requestAnimationFrame(() => { this.isDragged = true; });
            addElementCopyToDocumentBody({
                event,
                id: 'layoutElement',
                label: this.element.label,
            });

            this.highlightingPositions = getHighlightingLayoutDropPositions({
                draggedElWidth: width,
                draggedElHeight: height,
                layoutWidth: this.columnsNumber,
                layoutHeight: this.rowsNumber,
                layoutElements: this.layoutElements.filter(el => el.id !== id),
            });

            this.$emit('highlightedPositionChange', this.highlightingPositions);
        },
        onDragEnd(event) {
            removeElementCopyFromDocumentBody(event);

            const {
                xPos,
                yPos,
            } = getPositionForBrowser(event);
            const trashElement = document.documentElement.querySelector('.drop-zone');
            const isDroppedToTrash = isMouseInsideElement(trashElement, xPos, yPos);

            this.isDragged = false;
            this.highlightingPositions = [];
            this.__setState({
                key: 'draggedElement',
                value: null,
            });
            this.__setState({
                key: 'isElementDragging',
                value: null,
            });

            if (isDroppedToTrash) {
                this.$emit('remove', this.index);
            }

            this.$emit('highlightedPositionChange', []);
        },
        onInitResize(event) {
            this.highlightingPositions = getHighlightingPositions(
                this.element,
                this.layoutElements,
            );

            this.blockOtherInteractionsOnResizeEvent();
            this.initActualElementNormalizedBoundary();
            this.initElementNormalizedBoundary();
            this.initMousePosition(event);
            this.initElementBoundary();
            this.initElementStyleForResizeState();

            addResizablePlaceholder({
                top: this.$el.offsetTop,
                left: this.$el.offsetLeft,
                width: this.startWidth,
                height: this.startHeight,
                boxShadow: ELEVATOR_HOLE,
                backgroundColor: GREEN,
            });

            this.minWidth = this.getElementMinWidth();
            this.minHeight = this.getElementMinHeight();

            registerResizeEventListeners().then((response) => {
                response.default(this.onResize, this.onStopResizing);
            });

            this.$emit('highlightedPositionChange', this.highlightingPositions);
        },
        onResize(event) {
            const {
                pageX, pageY,
            } = event;
            const width = this.getElementWidthBasedOnMouseXPosition(pageX);
            const height = this.getElementHeightBasedOnMouseYPosition(pageY);

            this.updateElementWidth(width);
            this.updateElementHeight(height);
        },
        onStopResizing() {
            this.updateLayoutElementAtIndex({
                index: this.index,
                element: {
                    ...this.element,
                    width: this.newWidth,
                    height: this.newHeight,
                },
            });

            this.resetElementStyleForEndResizeInteraction();
            this.resetDataForEndResizeInteraction();

            removeResizablePlaceholder();

            unregisterResizeEventListeners().then((response) => {
                response.default(this.onResize, this.onStopResizing);
            });

            this.$emit('highlightedPositionChange', []);
        },
        getElementWidthBasedOnMouseXPosition(xPos) {
            return this.startWidth + xPos - this.startX;
        },
        getElementHeightBasedOnMouseYPosition(yPos) {
            return this.startHeight + yPos - this.startY;
        },
        getElementMinWidth() {
            const {
                width,
            } = this.element;
            return (this.startWidth - (this.elementsGap * (width - 1))) / width;
        },
        getElementMinHeight() {
            const {
                height,
            } = this.element;
            return (this.startHeight - (this.elementsGap * (height - 1))) / height;
        },
        getElementMaxWidth(maxWidth) {
            const {
                column,
            } = this.element;
            const columnsNumberToFill = maxWidth - (column - 1);
            const elementGapsNumber = columnsNumberToFill - 1;

            return (this.minWidth * columnsNumberToFill) + (elementGapsNumber * this.elementsGap);
        },
        getElementMaxHeight(maxHeight) {
            return (this.minHeight * maxHeight) + ((maxHeight - 1) * this.elementsGap);
        },
        updateElementWidth(width) {
            const {
                column,
            } = this.element;
            const columnBellowMouse = getColumnBasedOnWidth(width, this.minWidth, column);
            const maxColumn = getMaxColumnForGivenRow(
                this.actualElementRow,
                this.highlightingPositions,
            );
            const elWidth = 1 + maxColumn - column;
            this.maxWidth = this.getElementMaxWidth(elWidth);

            if (width <= this.maxWidth && width >= this.minWidth) {
                this.newWidth = columnBellowMouse - column + 1;

                if (columnBellowMouse !== this.actualElementColumn) {
                    const gapsValue = this.elementsGap * (this.newWidth - 1);
                    const ghostElementWidth = this.minWidth * this.newWidth
                        + gapsValue;

                    updateResizablePlaceholderWidth(ghostElementWidth);
                }

                window.requestAnimationFrame(() => {
                    this.$el.style.width = `${width}px`;
                });

                this.actualElementColumn = columnBellowMouse;
            }
        },
        updateElementHeight(height) {
            const {
                row,
            } = this.element;
            const rowBellowMouse = getRowBasedOnHeight(height, this.minHeight, row);
            const maxRow = getMaxRowForGivenColumn(
                this.actualElementColumn,
                this.highlightingPositions,
            );
            const elHeight = 1 + maxRow - row;
            this.maxHeight = this.getElementMaxHeight(elHeight);

            if (height <= this.maxHeight && height >= this.minHeight) {
                this.newHeight = rowBellowMouse - row + 1;

                if (rowBellowMouse !== this.actualElementRow) {
                    const gapsValue = this.elementsGap * (this.newHeight - 1);
                    const ghostElementHeight = this.minHeight * this.newHeight
                        + gapsValue;

                    updateResizablePlaceholderHeight(ghostElementHeight);
                }

                window.requestAnimationFrame(() => {
                    this.$el.style.height = `${height}px`;
                });

                this.actualElementRow = rowBellowMouse;
                this.$emit('resizingElMaxRow', this.newHeight + row);
            }
        },
        blockOtherInteractionsOnResizeEvent() {
            this.isDraggingEnabled = false;
        },
        initMousePosition({
            pageX, pageY,
        }) {
            this.startX = pageX;
            this.startY = pageY;
        },
        initActualElementNormalizedBoundary() {
            const {
                row, column,
            } = this.element;

            this.actualElementRow = row;
            this.actualElementColumn = column;
        },
        initElementBoundary() {
            const {
                width: elementWidth,
                height: elementHeight,
            } = this.$el.getBoundingClientRect();

            this.startWidth = parseInt(elementWidth, 10);
            this.startHeight = parseInt(elementHeight, 10);
        },
        initElementNormalizedBoundary() {
            const {
                width, height,
            } = this.element;

            this.newWidth = width;
            this.newHeight = height;
        },
        initElementStyleForResizeState() {
            window.requestAnimationFrame(() => {
                this.$el.style.width = `${this.startWidth}px`;
                this.$el.style.height = `${this.startHeight}px`;
            });
        },
        resetElementStyleForEndResizeInteraction() {
            window.requestAnimationFrame(() => {
                this.$el.style.width = null;
                this.$el.style.height = null;
            });
        },
        resetDataForEndResizeInteraction() {
            this.isDraggingEnabled = true;
            this.highlightingPositions = [];
        },
    },
};
</script>

<style lang="scss" scoped>
    .layout-element {
        position: relative;
        z-index: $Z_INDEX_UNSET;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        border: $BORDER_1_GREY;
        margin: 8px;
        box-sizing: border-box;
        background-color: $WHITESMOKE;
        user-select: none;
        transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
        transition-property:
            border-color,
            box-shadow;
        cursor: grab;

        &:hover:not(&--resized):not(&--disabled) {
            border-color: $WHITESMOKE;
            box-shadow: $ELEVATOR_2_DP;
        }

        &__resizer {
            position: absolute;
            bottom: 0;
            right: 0;
            padding: 2px;
            cursor: se-resize;
        }

        &--dragged {
            visibility: hidden;
        }

        &--resized {
            position: absolute;
            z-index: 5;
            border: 2px solid $GREEN;
        }

        &--disabled {
            cursor: not-allowed;
        }
    }
</style>
