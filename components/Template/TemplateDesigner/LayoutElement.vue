/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="['layout-element', { 'layout-element--dragged': isDragged}]"
        :draggable="isDraggingEnabled"
        @dragstart="onDragStart"
        @dragend="onDragEnd">
        <slot name="content" />
        <div
            class="layout-element__resizer"
            @mousedown="initResizeDrag" />
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import {
    getHighlightingPositions,
    getHighlightingLayoutDropPositions,
    getMaxRowForGivenColumn,
    getMaxColumnForGivenRow,
    getRowBasedOnHeight,
    getColumnBasedOnWidth,
} from '~/model/template_designer/layout/LayoutCalculations';
import {
    addGhostElementToDraggableLayer,
    updateGhostElementWidth,
    updateGhostElementHeight,
    removeGhostElementFromDraggableLayer,
} from '~/model/template_designer/layout/GhostElement';
import {
    addLayoutElementCopyToDocumentBody,
    removeLayoutElementCopyFromDocumentBody,
} from '~/model/template_designer/layout/LayoutElementCopy';

export default {
    name: 'LayoutElement',
    props: {
        index: {
            type: Number,
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
        ...mapState('templateDesigner', {
            layoutElements: state => state.layoutElements,
        }),
        ...mapState('draggable', {
            draggedElement: state => state.draggedElement,
        }),
    },
    methods: {
        ...mapActions('templateDesigner', [
            'updateLayoutElementBounds',
            'removeLayoutElementAtIndex',
        ]),
        ...mapActions('draggable', [
            'setDraggedElement',
        ]),
        onDragStart(event) {
            const { id, width, height } = this.element;

            this.setDraggedElement({ ...this.element, index: this.index });
            window.requestAnimationFrame(() => { this.isDragged = true; });
            addLayoutElementCopyToDocumentBody(event);
            this.highlightingPositions = getHighlightingLayoutDropPositions({
                draggedElWidth: width,
                draggedElHeight: height,
                layoutWidth: this.columnsNumber,
                layoutHeight: this.rowsNumber,
                layoutElements: this.layoutElements.filter(el => el.id !== id),
            });

            this.$emit('highlightedPositionChange', this.highlightingPositions);
        },
        onDragEnd() {
            this.isDragged = false;
            this.highlightingPositions = [];
            this.setDraggedElement();
            removeLayoutElementCopyFromDocumentBody();
            this.$emit('highlightedPositionChange', []);
        },
        initResizeDrag(event) {
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

            addGhostElementToDraggableLayer({
                top: this.$el.offsetTop,
                left: this.$el.offsetLeft,
                width: this.startWidth,
                height: this.startHeight,
            });

            this.minWidth = this.getElementMinWidth();
            this.minHeight = this.getElementMinHeight();

            this.addEventListenersForResizeState();

            this.$emit('highlightedPositionChange', this.highlightingPositions);
        },
        doResizeDrag(event) {
            const { clientX, clientY } = event;
            const width = this.getElementWidthBasedOnMouseXPosition(clientX);
            const height = this.getElementHeightBasedOnMouseYPosition(clientY);

            this.updateElementWidth(width);
            this.updateElementHeight(height);
        },
        stopResizeDrag() {
            this.updateLayoutElementBounds({
                index: this.index,
                width: this.newWidth,
                height: this.newHeight,
            });

            this.resetElementStyleForEndResizeInteraction();
            this.resetDataForEndResizeInteraction();

            removeGhostElementFromDraggableLayer();
            this.removeEventListenersForResizeState();

            this.$emit('highlightedPositionChange', []);
        },
        getElementWidthBasedOnMouseXPosition(xPos) {
            return this.startWidth + xPos - this.startX;
        },
        getElementHeightBasedOnMouseYPosition(yPos) {
            return this.startHeight + yPos - this.startY;
        },
        getElementMinWidth() {
            const { width } = this.element;
            return (this.startWidth - (this.elementsGap * (width - 1))) / width;
        },
        getElementMinHeight() {
            const { height } = this.element;
            return (this.startHeight - (this.elementsGap * (height - 1))) / height;
        },
        updateElementWidth(width) {
            const { column } = this.element;
            const columnBellowMouse = getColumnBasedOnWidth(width, this.minWidth, column);
            const maxColumn = getMaxColumnForGivenRow(
                this.actualElementRow,
                this.highlightingPositions,
            );

            if (width >= this.minWidth && columnBellowMouse <= maxColumn) {
                this.newWidth = columnBellowMouse - column + 1;

                if (columnBellowMouse !== this.actualElementColumn) {
                    const gapsValue = this.elementsGap * (this.newWidth - 1);
                    const ghostElementWidth = this.minWidth * this.newWidth
                        + gapsValue;

                    updateGhostElementWidth(ghostElementWidth);
                }

                this.$el.style.width = `${width}px`;
                this.actualElementColumn = columnBellowMouse;
            }
        },
        updateElementHeight(height) {
            const { row } = this.element;
            const rowBellowMouse = getRowBasedOnHeight(height, this.minHeight, row);
            const maxRow = getMaxRowForGivenColumn(
                this.actualElementColumn,
                this.highlightingPositions,
            );

            if (height >= this.minHeight && rowBellowMouse <= maxRow) {
                this.newHeight = rowBellowMouse - row + 1;

                if (rowBellowMouse !== this.actualElementRow) {
                    const gapsValue = this.elementsGap * (this.newHeight - 1);
                    const ghostElementHeight = this.minHeight * this.newHeight
                        + gapsValue;

                    updateGhostElementHeight(ghostElementHeight);
                }

                this.$el.style.height = `${height}px`;
                this.actualElementRow = rowBellowMouse;
            }
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
        blockOtherInteractionsOnResizeEvent() {
            this.isDraggingEnabled = false;
        },
        initMousePosition({ clientX, clientY }) {
            this.startX = clientX;
            this.startY = clientY;
        },
        initActualElementNormalizedBoundary() {
            const { row, column } = this.element;

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
            const { width, height } = this.element;

            this.newWidth = width;
            this.newHeight = height;
        },
        initElementStyleForResizeState() {
            this.$el.style.position = 'absolute';
            this.$el.style.width = `${this.startWidth}px`;
            this.$el.style.height = `${this.startHeight}px`;
            this.$el.style.border = '2px solid #00bc87';
            this.$el.style.zIndex = '5';
        },
        resetElementStyleForEndResizeInteraction() {
            this.$el.style.border = '1px solid #d6d7d8';
            this.$el.style.position = 'relative';
            this.$el.style.width = null;
            this.$el.style.height = null;
            this.$el.style.zIndex = 'unset';
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
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        border: 1px solid $grey;
        margin: 8px;
        box-sizing: border-box;
        background-color: $background;
        user-select: none;
        cursor: grab;

        &__resizer {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 10px;
            height: 10px;
            cursor: se-resize;
        }

        &--dragged {
            visibility: hidden;
        }
    }
</style>
