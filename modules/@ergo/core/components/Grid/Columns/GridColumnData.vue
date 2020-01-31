/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridBaseColumn
        :class="{
            'column--dragged': isDraggedColumn,
        }"
        :draggable="isColumnDraggable"
        @dragstart.native="onDragStart"
        @dragend.native="onDragEnd"
        @dragover.native="onDragOver"
        @drop.native="onDrop">
        <template v-if="!isDraggedColumn">
            <slot />
            <div
                v-if="!isHeaderFocused"
                :class="['column__resizer', {
                    'column__resizer--resizing': resizingElement && resizingElement.index === index
                }]"
                @mousedown="initResizeDrag" />
        </template>
        <template v-else>
            <GridColumnGhost :is-mouse-over-grid="isMouseOverGrid" />
        </template>
    </GridBaseColumn>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import {
    addElementCopyToDocumentBody,
    removeElementCopyFromDocumentBody,
} from '@Core/models/layout/ElementCopy';
import { removeCookieById } from '@Core/models/cookies';
import { COLUMNS_IDS } from '@Core/defaults/grid/cookies';
import {
    getDraggedColumnPositionState,
    isTrashBelowMouse,
    getPositionForBrowser,
} from '@Core/models/drag_and_drop/helpers';
import { DRAGGED_ELEMENT } from '@Core/defaults/grid';

const registerResizeEventListenersModule = () => import('@Core/models/resize/registerResizeEventListeners');
const unregisterResizeEventListenersModule = () => import('@Core/models/resize/unregisterResizeEventListeners');
const updateColumnsTransformModule = () => import('@Core/models/drag_and_drop/updateColumnsTransform');

export default {
    name: 'GridColumnData',
    components: {
        GridBaseColumn: () => import('@Core/components/Grid/Columns/GridBaseColumn'),
        GridColumnGhost: () => import('@Core/components/Grid/Columns/GridColumnGhost'),
    },
    props: {
        draggable: {
            type: Boolean,
            required: true,
        },
        columnOffset: {
            type: Number,
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
        isHeaderFocused: {
            type: Boolean,
            default: false,
        },
        isMouseOverGrid: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            minWidth: 150,
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
    computed: {
        ...mapState('authentication', {
            languageCode: (state) => state.user.language,
        }),
        ...mapState('draggable', {
            draggedElement: (state) => state.draggedElement,
            resizingElement: (state) => state.resizingElement,
            ghostIndex: (state) => state.ghostIndex,
            bounds: (state) => state.bounds,
            draggedElIndex: (state) => state.draggedElIndex,
            draggedElementOnGrid: (state) => state.draggedElementOnGrid,
        }),
        isColumnDraggable() {
            return this.draggable
                && !this.isHeaderFocused;
        },
        isDraggedColumn() {
            return this.draggedElIndex === this.index || this.column.id === 'ghost';
        },
    },
    methods: {
        ...mapActions('draggable', [
            'setDraggableState',
            'setResizingElement',
            'setDraggedElement',
            'setDraggedElIndex',
            'setGhostElXTranslation',
            'setGhostIndex',
        ]),
        ...mapActions('list', [
            'setDisabledElement',
        ]),
        onDragStart(event) {
            const { pageX, pageY } = event;
            const [header] = this.$el.children;
            const {
                x: headerXPos, y: headerYPos, height: headerHeight, width: headerWidth,
            } = header.getBoundingClientRect();
            const xOffset = 2.5;
            const isMouseAboveColumnHeader = headerYPos <= pageY
                && headerYPos + headerHeight >= pageY;
            const isMouseAboveLeftBorderLimit = pageX - headerXPos < xOffset;

            if (!isMouseAboveColumnHeader
                || isMouseAboveLeftBorderLimit
                || this.resizingElement) {
                event.preventDefault();
                event.stopPropagation();

                return false;
            }

            addElementCopyToDocumentBody(event, headerWidth, this.column.id);
            this.removeColumnHover();
            this.setGhostIndex(this.index);
            this.setDraggedElIndex(this.index);
            this.setDraggedElement({ ...this.column, index: this.index });
            this.setDraggableState({ propName: 'draggedElementOnGrid', value: DRAGGED_ELEMENT.COLUMN });

            return true;
        },
        onDragEnd(event) {
            const { xPos, yPos } = getPositionForBrowser(event);

            removeElementCopyFromDocumentBody(event);

            if (isTrashBelowMouse(xPos, yPos) && this.column.deletable) {
                this.removeColumnWrapper(this.draggedElIndex - this.columnOffset);
            } else if (this.ghostIndex !== this.draggedElIndex) {
                this.$emit('changeColumnsPosition', {
                    from: this.draggedElIndex - this.columnOffset,
                    to: this.ghostIndex - this.columnOffset,
                });
            }

            this.removeColumnsTransform();
            this.resetDraggedElementCache();
            this.setDraggableState({ propName: 'draggedElementOnGrid', value: null });
            this.$emit('mouseOverGrid', false);
        },
        onDrop(event) {
            event.preventDefault();

            if (typeof this.draggedElement !== 'object') {
                const columnId = event.dataTransfer.getData('text/plain');

                this.$emit('drop', {
                    ghostIndex: this.ghostIndex - this.columnOffset,
                    columnId,
                });
                this.$emit('mouseOverGrid', false);
                this.removeColumnsTransform();
                this.resetDraggedElementCache();
            }
        },
        onDragOver(event) {
            if (!this.draggedElement) return false;
            if (!this.isMouseOverGrid) this.$emit('mouseOverGrid', true);

            event.preventDefault();

            const { pageX } = event;
            const {
                x: columnXPos, width: columnWidth,
            } = this.$el.getBoundingClientRect();
            const isBefore = getDraggedColumnPositionState(
                pageX,
                columnXPos,
                columnWidth,
            );
            const fixedIndex = this.getColumnFixedIndex();

            if ((this.index === this.draggedElIndex && this.ghostIndex !== -1)
                || (isBefore && this.ghostIndex === fixedIndex - 1)
                || (!isBefore && this.ghostIndex === fixedIndex + 1)
                || this.draggedElementOnGrid === DRAGGED_ELEMENT.FILTER) {
                event.preventDefault();
                event.stopPropagation();

                return false;
            }

            const targetGhostIndex = this.getTargetGhostIndex(isBefore);

            updateColumnsTransformModule().then((response) => {
                response.default(
                    targetGhostIndex,
                    this.draggedElIndex,
                    this.ghostIndex,
                );
                this.setGhostIndex(targetGhostIndex);
            });

            return true;
        },
        initResizeDrag(event) {
            this.setResizingElement({ index: this.index });
            this.initMousePosition(event);
            this.initElementWidth();

            registerResizeEventListenersModule().then((response) => {
                response.default(this.doResizeDrag, this.stopResizeDrag);
            });
        },
        doResizeDrag(event) {
            const { pageX } = event;
            const width = this.getElementWidthBasedOnMouseXPosition(pageX);

            if (width > this.minWidth) {
                window.requestAnimationFrame(() => {
                    this.$emit('updateColumnWidthAtIndex', {
                        index: this.index, width: `${width}px`,
                    });
                });
            }
        },
        stopResizeDrag() {
            unregisterResizeEventListenersModule().then((response) => {
                response.default(this.doResizeDrag, this.stopResizeDrag);
            });
            this.setResizingElement();
        },
        initMousePosition({ pageX }) {
            this.startX = pageX;
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
        getColumnFixedIndex() {
            if (this.$el.style.transform) {
                const xTransform = this.getElementTransform();

                if (xTransform) {
                    if (xTransform > 0) return this.index + 1;

                    return this.index - 1;
                }
            }

            return this.index;
        },
        getElementTransform() {
            return +this.$el.style.transform.replace(/[^0-9\-.,]/g, '');
        },
        getGridContentElement() {
            return document.documentElement.querySelector('.grid__columns');
        },
        removeColumnWrapper(index) {
            if (this.column.element_id) {
                this.setDisabledElement({
                    languageCode: this.column.language,
                    elementId: this.column.element_id,
                    disabled: false,
                });
            }
            removeCookieById({
                cookies: this.$cookies,
                cookieName: COLUMNS_IDS,
                id: this.draggedElement.id,
            });
            this.$emit('removeColumnAtIndex', index);
        },
        getTargetGhostIndex(isBefore) {
            if (this.index < this.draggedElIndex) {
                return isBefore ? this.index : this.index + 1;
            }

            return isBefore ? this.index - 1 : this.index;
        },
        removeColumnsTransform() {
            const contentGrid = this.getGridContentElement();
            const { length } = contentGrid.children;

            for (let i = 0; i < length; i += 1) {
                contentGrid.children[i].style.transform = null;
            }
        },
        removeColumnHover() {
            this.$el.classList.remove('column--hovered');
        },
        resetDraggedElementCache() {
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
        box-sizing: border-box;

        &--dragged {
            will-change: transform;
            grid-template-rows: unset !important;
        }

        &__resizer {
            position: absolute;
            top: 0;
            right: 1.25px;
            z-index: $Z_INDEX_LVL_2;
            width: 2.5px;
            height: 100%;
            cursor: col-resize;

            &:not(&--resizing):hover, &--resizing {
                background-color: $GRAPHITE_DARK;
            }
        }
    }
</style>
