/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="[
            'column',
            { 'column--dragged': isDragged },
        ]"
        :draggable="isDraggable"
        @dragstart="onDragStart"
        @dragend="onDragEnd"
        @dragover="onDragOver"
        @drop="onDrop">
        <template v-if="!isDragged">
            <slot />
            <GridColumnResizer
                v-if="!isHeaderFocused"
                @widthChange="onUpdateWidth"
                @resize="onResize" />
        </template>
        <template v-else>
            <GridGhostColumn />
        </template>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import {
    addElementCopyToDocumentBody,
    removeElementCopyFromDocumentBody,
} from '@Core/models/layout/ElementCopy';
import {
    getDraggedColumnPositionState,
    isTrashBelowMouse,
    getPositionForBrowser,
} from '@Core/models/drag_and_drop/helpers';
import {
    DRAGGED_ELEMENT,
} from '@Core/defaults/grid';

const updateColumnsTransform = () => import('@Core/models/drag_and_drop/updateColumnsTransform');

export default {
    name: 'GridDraggableColumn',
    components: {
        GridGhostColumn: () => import('@Core/components/Grid/Layout/Table/Columns/GridGhostColumn'),
        GridColumnResizer: () => import('@Core/components/Grid/Layout/Table/Columns/Resizer/GridColumnResizer'),
    },
    props: {
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
    },
    data() {
        return {
            columnWidth: 0,
            isDragged: false,
            isResizing: false,
        };
    },
    computed: {
        ...mapState('authentication', {
            languageCode: state => state.user.language,
        }),
        ...mapState('draggable', {
            draggedElement: state => state.draggedElement,
            ghostIndex: state => state.ghostIndex,
            draggedElIndex: state => state.draggedElIndex,
            draggedElementOnGrid: state => state.draggedElementOnGrid,
        }),
        isDraggable() {
            return !this.isHeaderFocused
                && !this.isResizing;
        },
    },
    methods: {
        ...mapActions('draggable', [
            'setDraggableState',
            'setDraggedElement',
            'setDraggedElIndex',
            'setGhostElXTranslation',
            'setGhostIndex',
        ]),
        onDragStart(event) {
            if (this.isResizing) return false;

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
                || isMouseAboveLeftBorderLimit) {
                event.preventDefault();
                event.stopPropagation();

                return false;
            }

            this.isDragged = true;

            addElementCopyToDocumentBody(event, headerWidth, this.column.id);
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
                this.$emit('remove', this.index);
            } else if (this.ghostIndex !== this.draggedElIndex) {
                this.$emit('swapColumns', {
                    from: this.draggedElIndex,
                    to: this.ghostIndex,
                });
            }

            this.removeColumnsTransform();
            this.resetDraggedElementCache();
            this.setDraggableState({ propName: 'draggedElementOnGrid', value: null });
            this.isDragged = false;
        },
        onDrop(event) {
            event.preventDefault();

            if (typeof this.draggedElement !== 'object') {
                const columnId = event.dataTransfer.getData('text/plain');

                this.$emit('drop', {
                    from: this.draggedElIndex,
                    to: this.ghostIndex,
                    columnId,
                });
                this.resetDraggedElementCache();
            }
        },
        onDragOver(event) {
            if (!this.draggedElement) return false;

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

            updateColumnsTransform().then((response) => {
                response.default(
                    targetGhostIndex,
                    this.draggedElIndex,
                    this.ghostIndex,
                );
                this.setGhostIndex(targetGhostIndex);
            });

            return true;
        },
        onUpdateWidth(width) {
            this.$emit('updateWidth', {
                index: this.index, width,
            });
        },
        onResize(isResizing) {
            this.isResizing = isResizing;
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
            return document.documentElement.querySelector('.grid-table-layout');
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
        background-color: $WHITE;
        will-change: width;

        &::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            box-shadow: $ELEVATOR_2_DP;
            opacity: 0;
            pointer-events: none;
            content: "";
        }

        &--hovered:not(&--dragged) {
            z-index: $Z_INDEX_LVL_4;

            &::after {
                opacity: 1;
            }
        }

        &--dragged {
            will-change: transform;
            grid-template-rows: unset !important;
        }
    }
</style>
