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
                v-if="!isCheckColumn && !isHeaderFocused"
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
} from '~/model/layout/ElementCopy';
import { removeCookieById } from '~/model/cookies';
import { COLUMNS_IDS } from '~/defaults/grid/cookies';
import { getDraggedColumnPositionState } from '~/model/drag_and_drop/helpers';
import { DRAGGED_ELEMENT, COLUMN_TYPE } from '~/defaults/grid';

export default {
    name: 'GridColumnData',
    components: {
        GridBaseColumn: () => import('@Core/components/Grid/Columns/GridBaseColumn'),
        GridColumnGhost: () => import('@Core/components/Grid/Columns/GridColumnGhost'),
    },
    props: {
        namespace: {
            type: String,
            required: true,
        },
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
        gridState() {
            return this.$store.state[this.namespace];
        },
        isCheckColumn() {
            return this.column.type === COLUMN_TYPE.CHECK;
        },
        isPinnedColumn() {
            return this.gridState.pinnedColumns
                .findIndex((col) => col.id === this.column.id) > -1;
        },
        isColumnDraggable() {
            return this.draggable
                && Object.keys(this.gridState.editingCellCoordinates).length === 0
                && !this.isHeaderFocused
                && !this.isCheckColumn;
        },
        isDraggedColumn() {
            return this.draggedElIndex === this.index;
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
                || this.isPinnedColumn
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
            this.updateElementWidth(`${headerWidth}px`);

            return true;
        },
        onDragEnd(event) {
            let xPos = null;
            let yPos = null;

            // Firefox does not support pageX, pageY...
            if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
                xPos = event.screenX;
                yPos = event.screenY;
            } else {
                xPos = event.pageX;
                yPos = event.pageY;
            }

            const elementBelowMouse = document.elementFromPoint(xPos, yPos);
            const isTrashBelowMouse = elementBelowMouse && elementBelowMouse.className === 'trash-can';

            removeElementCopyFromDocumentBody(event);

            if (isTrashBelowMouse) {
                this.removeColumnWrapper(this.draggedElIndex - this.columnOffset);
            } else if (this.ghostIndex !== this.draggedElIndex) {
                this.changeColumnPositionWrapper();
            }

            this.removeColumnsTransform();
            this.resetDraggedElementCache();
            this.setDraggableState({ propName: 'draggedElementOnGrid', value: null });
            this.$emit('mouseOverGrid', false);
        },
        async onDrop(event) {
            event.preventDefault();

            if (typeof this.draggedElement !== 'object') {
                const columnId = event.dataTransfer.getData('text/plain');

                this.removeColumnsTransform();
                this.$emit('mouseOverGrid', false);
                await this.$store.dispatch(`${this.namespace}/getColumnData`, {
                    ghostIndex: this.ghostIndex - this.columnOffset,
                    columnId,
                    path: `${this.languageCode}/products`,
                });
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
                || this.isPinnedColumn
                || this.draggedElementOnGrid === DRAGGED_ELEMENT.FILTER) {
                event.preventDefault();
                event.stopPropagation();

                return false;
            }

            const targetGhostIndex = this.getTargetGhostIndex(isBefore);

            this.updateColumnsTransform(targetGhostIndex);
            this.setGhostIndex(targetGhostIndex);

            return true;
        },
        initResizeDrag(event) {
            this.setResizingElement({ index: this.index });
            this.initMousePosition(event);
            this.initElementWidth();
            this.updateElementWidth(`${this.startWidth}px`);
            this.addEventListenersForResizeState();
        },
        doResizeDrag(event) {
            const { pageX } = event;
            const width = this.getElementWidthBasedOnMouseXPosition(pageX);

            if (width > this.minWidth) {
                this.updateElementWidth(`${width}px`);
                this.$store.dispatch(`${this.namespace}/updateColumnWidthAtIndex`, {
                    index: this.index - this.columnOffset, width: `${width}px`,
                });
            }
        },
        stopResizeDrag() {
            this.removeEventListenersForResizeState();
            this.setResizingElement(null);
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
        updateElementWidth(width) {
            this.$el.style.width = width;
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
            return document.documentElement.querySelector('.grid__content');
        },
        removeColumnWrapper(index) {
            if (this.column.element_id) {
                this.setDisabledElement({
                    languageCode: this.column.language,
                    elementId: this.column.element_id,
                    disabled: false,
                });
            }
            this.$store.dispatch(`${this.namespace}/removeColumnAtIndex`, index);
            this.$store.dispatch(`${this.namespace}/removeColumnWidthAtIndex`, index);
            removeCookieById({
                cookies: this.$cookies,
                cookieName: COLUMNS_IDS,
                id: this.draggedElement.id,
            });
        },
        changeColumnPositionWrapper() {
            this.$store.dispatch(`${this.namespace}/changeColumnPosition`, {
                from: this.draggedElIndex - this.columnOffset,
                to: this.ghostIndex - this.columnOffset,
            });
            this.$store.dispatch(`${this.namespace}/changeColumnWidthPosition`, {
                from: this.draggedElIndex - this.columnOffset,
                to: this.ghostIndex - this.columnOffset,
            });
        },
        getTargetGhostIndex(isBefore) {
            if (this.index < this.draggedElIndex) {
                return isBefore ? this.index : this.index + 1;
            }

            return isBefore ? this.index - 1 : this.index;
        },
        updateColumnsTransform(targetGhostIndex) {
            const contentGrid = this.getGridContentElement();
            const { width: ghostWidth } = contentGrid.children[this.draggedElIndex]
                .getBoundingClientRect();
            const ghostTransform = +contentGrid.children[this.draggedElIndex].style.transform.replace(/[^0-9\-.,]/g, '');
            let bounds = {};

            if (targetGhostIndex < this.ghostIndex) {
                bounds = this.getLowerBoundsTransforms(
                    contentGrid, ghostWidth, ghostTransform, targetGhostIndex,
                );
            } else {
                bounds = this.getUpperBoundsTransforms(
                    contentGrid, ghostWidth, ghostTransform, targetGhostIndex,
                );
            }
            Object.keys(bounds.transforms).forEach((index) => {
                contentGrid.children[index].style.transform = `translateX(${bounds.transforms[index]}px)`;
            });

            contentGrid.children[this.draggedElIndex].style.transform = `translateX(${bounds.updatedGhostTransform}px)`;
        },
        getLowerBoundsTransforms(contentGrid, ghostWidth, ghostTransform, targetGhostIndex) {
            const transforms = {};
            let lowerBound = this.ghostIndex - 1; // We can shift to next iteration - no need to do anything with ghost column
            let updatedGhostTransform = ghostTransform;

            while (lowerBound >= targetGhostIndex) {
                const index = this.draggedElIndex <= lowerBound ? lowerBound + 1 : lowerBound;

                if (lowerBound !== this.draggedElIndex) {
                    const {
                        colWidth, colTransform,
                    } = this.getColumnElBounds(contentGrid, index);

                    if (colTransform > 0) {
                        transforms[index] = 0;
                        updatedGhostTransform += colWidth;
                    } else {
                        transforms[index] = lowerBound > this.draggedElIndex ? 0 : ghostWidth;
                        updatedGhostTransform -= colWidth;
                    }
                } else {
                    // Reset transforms - columns are at theirs start position
                    transforms[index] = 0;
                    updatedGhostTransform = 0;
                }

                lowerBound -= 1;
            }

            return { transforms, updatedGhostTransform };
        },
        getUpperBoundsTransforms(contentGrid, ghostWidth, ghostTransform, targetGhostIndex) {
            const transforms = {};
            let upperBound = this.ghostIndex + 1; // We can shift to next iteration - no need to do anything with ghost column
            let updatedGhostTransform = ghostTransform;

            while (upperBound <= targetGhostIndex) {
                const index = this.draggedElIndex >= upperBound ? upperBound - 1 : upperBound;

                if (upperBound !== this.draggedElIndex) {
                    const {
                        colWidth, colTransform,
                    } = this.getColumnElBounds(contentGrid, index);


                    if (colTransform < 0) {
                        transforms[index] = 0;
                        updatedGhostTransform -= colWidth;
                    } else {
                        transforms[index] = upperBound < this.draggedElIndex ? 0 : -ghostWidth;
                        updatedGhostTransform += colWidth;
                    }
                } else {
                    // Reset transforms - columns are at theirs start position
                    transforms[index] = 0;
                    updatedGhostTransform = 0;
                }

                upperBound += 1;
            }

            return { transforms, updatedGhostTransform };
        },
        getColumnElBounds(contentGrid, index) {
            const { width } = contentGrid.children[index].getBoundingClientRect();
            const { transform } = contentGrid.children[index].style;

            return { colWidth: parseInt(width, 10), colTransform: +transform.replace(/[^0-9\-.,]/g, '') };
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
            this.updateElementWidth(null);
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
            z-index: 2;
            width: 2.5px;
            height: 100%;
            cursor: col-resize;

            &:not(&--resizing):hover, &--resizing {
                background-color: $GRAPHITE_DARK;
            }
        }
    }
</style>
