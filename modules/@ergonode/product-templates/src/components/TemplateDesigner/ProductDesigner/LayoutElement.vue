/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :style="styles"
        :class="classes"
        :draggable="isDraggingEnabled && !disabled"
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
    DRAGGED_ELEMENT,
} from '@Core/defaults/grid';
import {
    addElementCopyToDocumentBody,
    removeElementCopyFromDocumentBody,
} from '@Core/models/layout/ElementCopy';
import {
    GRID_GAP,
} from '@Templates/defaults/templateDesigner';
import {
    addResizablePlaceholder,
    removeResizablePlaceholder,
    updateResizablePlaceholderHeight,
    updateResizablePlaceholderWidth,
} from '@Templates/models/layout/ResizablePlaceholder';
import {
    getElementColumn,
    getElementHeight,
    getElementMinHeight,
    getElementMinWidth,
    getElementRow,
    getElementWidth,
    getHighlightingLayoutDropPositions,
    getHighlightingPositions,
    getMaxColumnForGivenRow,
    getMaxRowForGivenColumn,
} from '@Templates/models/layout/TemplateDesignerCalculations';
import {
    GREEN,
} from '@UI/assets/scss/_js-variables/colors.scss';
import {
    ELEVATOR_HOLE,
} from '@UI/assets/scss/_js-variables/elevators.scss';
import {
    mapActions,
    mapState,
} from 'vuex';

const registerResizeEventListeners = () => import('@UI/models/resize/registerResizeEventListeners');
const unregisterResizeEventListeners = () => import('@UI/models/resize/unregisterResizeEventListeners');

export default {
    name: 'LayoutElement',
    props: {
        scope: {
            type: String,
            required: true,
        },
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
        layoutWidth: {
            type: Number,
            required: true,
        },
        layoutHeight: {
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
            isDragged: false,
        };
    },
    computed: {
        ...mapState('productTemplate', [
            'layoutElements',
        ]),
        ...mapState('draggable', [
            'draggedElement',
            'isOverDropZone',
        ]),
        gap() {
            return GRID_GAP;
        },
        styles() {
            const {
                row,
                column,
                height,
                width,
            } = this.element;

            const offsetRow = row + 1;
            const offsetColumn = column + 1;

            return {
                gridArea: `${offsetRow} / ${offsetColumn} / ${offsetRow + height} / ${offsetColumn + width}`,
            };
        },
        classes() {
            return [
                'layout-element',
                {
                    'layout-element--dragged': this.isDragged,
                    'layout-element--resizing': !this.isDraggingEnabled,
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
                key: 'draggedInScope',
                value: this.scope,
            });
            this.__setState({
                key: 'isElementDragging',
                value: DRAGGED_ELEMENT.TEMPLATE,
            });
            requestAnimationFrame(() => { this.isDragged = true; });
            addElementCopyToDocumentBody({
                event,
                id: 'layoutElement',
                label: this.element.label,
            });

            this.highlightingPositions = getHighlightingLayoutDropPositions({
                draggedElWidth: width,
                draggedElHeight: height,
                layoutWidth: this.layoutWidth,
                layoutHeight: this.layoutHeight,
                layoutElements: this.layoutElements.filter(el => el.id !== id),
            });

            this.$emit('highlighted-position-change', this.highlightingPositions);
        },
        onDragEnd(event) {
            removeElementCopyFromDocumentBody(event);

            this.isDragged = false;
            this.highlightingPositions = [];
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

            if (this.isOverDropZone) {
                this.__setState({
                    key: 'isOverDropZone',
                    value: false,
                });

                this.$emit('remove', this.index);
            }

            this.$emit('highlighted-position-change', []);
        },
        onInitResize(event) {
            this.highlightingPositions = getHighlightingPositions({
                elementBounds: this.element,
                elements: this.layoutElements,
                layoutWidth: this.layoutWidth,
                layoutHeight: this.layoutHeight,
            });

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

            this.minWidth = getElementMinWidth(
                this.startWidth,
                this.element.width,
                this.gap,
            );
            this.minHeight = getElementMinHeight(
                this.startHeight,
                this.element.height,
                this.gap,
            );

            registerResizeEventListeners().then((response) => {
                response.default(this.onResize, this.onStopResizing);
            });

            this.$emit('highlighted-position-change', this.highlightingPositions);
        },
        onResize({
            pageX,
            pageY,
        }) {
            const width = this.getElementWidthBasedOnMouseXPosition(pageX);
            const height = this.getElementHeightBasedOnMouseYPosition(pageY);

            requestAnimationFrame(() => {
                this.updateElementWidth(width);
                this.updateElementHeight(height);
            });
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

            this.$emit('highlighted-position-change', []);
        },
        getElementWidthBasedOnMouseXPosition(xPos) {
            return this.startWidth + xPos - this.startX;
        },
        getElementHeightBasedOnMouseYPosition(yPos) {
            return this.startHeight + yPos - this.startY;
        },
        updateElementWidth(width) {
            const maxColumn = getMaxColumnForGivenRow(
                this.actualElementRow,
                this.highlightingPositions,
                this.layoutWidth,
            );
            const fixedWidth = maxColumn + 1 - this.element.column;

            this.maxWidth = getElementWidth(
                this.minWidth,
                fixedWidth,
                this.gap,
            );

            if (width <= this.maxWidth && width >= this.minWidth) {
                const column = getElementColumn(width, this.minWidth, this.gap);
                const actualColumn = this.element.column + column - 1;

                this.newWidth = Math.min(fixedWidth, column);

                if (actualColumn !== this.actualElementColumn) {
                    updateResizablePlaceholderWidth(getElementWidth(
                        this.minWidth,
                        this.newWidth,
                        this.gap,
                    ));
                }

                this.$el.style.width = `${width}px`;

                this.actualElementColumn = actualColumn;
            } else if (width < this.minWidth) {
                this.$el.style.width = `${this.minWidth}px`;
            }
        },
        updateElementHeight(height) {
            const maxRow = getMaxRowForGivenColumn(
                this.actualElementColumn,
                this.highlightingPositions,
                this.layoutHeight,
            );
            const fixedHeight = maxRow + 1 - this.element.row;

            this.maxHeight = getElementHeight(
                this.minHeight,
                fixedHeight,
                this.gap,
            );

            if (height <= this.maxHeight && height >= this.minHeight) {
                const row = getElementRow(height, this.minHeight, this.gap);
                const actualRow = this.element.row + row - 1;

                this.newHeight = Math.min(fixedHeight, row);

                if (actualRow !== this.actualElementRow) {
                    updateResizablePlaceholderHeight(getElementHeight(
                        this.minHeight,
                        this.newHeight,
                        this.gap,
                    ));
                }

                this.$el.style.height = `${height}px`;

                this.actualElementRow = actualRow;
            } else if (height < this.minHeight) {
                this.$el.style.height = `${this.minHeight}px`;
            }
        },
        blockOtherInteractionsOnResizeEvent() {
            this.isDraggingEnabled = false;
        },
        initMousePosition({
            pageX,
            pageY,
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
            requestAnimationFrame(() => {
                this.$el.style.width = `${this.startWidth}px`;
                this.$el.style.height = `${this.startHeight}px`;
            });
        },
        resetElementStyleForEndResizeInteraction() {
            requestAnimationFrame(() => {
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
        will-change:
            border-color,
            box-shadow;
        transition-property:
            border-color,
            box-shadow;
        cursor: grab;

        &:hover:not(&--resizing):not(&--disabled) {
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

        &--resizing {
            position: absolute;
            z-index: 5;
            border: $BORDER_2_GREEN;
        }

        &--disabled {
            cursor: not-allowed;
        }
    }
</style>
