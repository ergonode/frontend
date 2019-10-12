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
                    'column--last': isLast,
                    'column--dragged': draggedElIndex !== -1,
                }
            ]"
        :style="colGridTemplate"
        :draggable="isColumnDraggable"
        @dragstart="onDragStart"
        @dragend="onDragEnd"
        @dragover="onDragOver"
        @drop="onDrop">
        <template v-if="!isDraggedColumn">
            <slot />
            <div
                v-if="!isExtenderColumn && isColumnResizeable && !isHeaderFocused"
                :class="['column__resizer', {
                    'column__resizer--resizing': isResizing
                }]"
                @mousedown="initResizeDrag" />
        </template>
        <template v-else>
            <GridGhostColumn :is-mouse-over-grid="isMouseOverGrid" />
        </template>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import {
    addElementCopyToDocumentBody,
    removeElementCopyFromDocumentBody,
} from '~/model/layout/ElementCopy';
import { removeColumnCookieByID } from '~/model/grid/cookies/GridLayoutConfiguration';
import { getDraggedColumnPositionState } from '~/model/drag_and_drop/helpers';
import { DRAGGED_ELEMENTS } from '~/defaults/grid/main';

export default {
    name: 'GridColumn',
    components: {
        GridGhostColumn: () => import('~/components/Grid/GridGhostColumn'),
    },
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
        isLast: {
            type: Boolean,
            default: false,
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
    computed: {
        ...mapState('authentication', {
            languageCode: (state) => state.user.language,
        }),
        ...mapState('draggable', {
            draggedElement: (state) => state.draggedElement,
            ghostIndex: (state) => state.ghostIndex,
            bounds: (state) => state.bounds,
            draggedElIndex: (state) => state.draggedElIndex,
        }),
        colGridTemplate() {
            if (this.isDraggedColumn) return null;

            return {
                gridAutoRows: `${this.rowsHeight}px`,
            };
        },
        gridState() {
            return this.$store.state[this.storeNamespace];
        },
        isPinnedColumn() {
            return this.gridState.pinnedColumns.find((col) => col.id === this.column.id);
        },
        isColumnDraggable() {
            return this.gridState.configuration.isColumnMoveable
                && Object.keys(this.gridState.editingCellCoordinates).length === 0
                && !this.isHeaderFocused;
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
            'setGhostIndex',
        ]),
        onDragStart(event) {
            const { clientX, clientY } = event;
            const [header] = this.$el.children;
            const {
                x: headerXPos, y: headerYPos, height: headerHeight, width: headerWidth,
            } = header.getBoundingClientRect();
            const xOffset = 2.5;
            const contentGrid = this.getGridContentElement();
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

            addElementCopyToDocumentBody(event, headerWidth, this.column.id);
            this.removeColumnHover();
            this.addBorderToRightNeighbour(contentGrid.children[neighbourIndex]);
            this.setGhostIndex(this.index);
            this.setDraggedElIndex(this.index);
            this.setDraggedElement({ ...this.column, index: this.index });
            this.setDraggableState({ propName: 'draggedElementOnGrid', value: DRAGGED_ELEMENTS.COLUMN });
            this.updateElementWidth(`${headerWidth}px`);

            return true;
        },
        onDragEnd(event) {
            const { clientX, clientY } = event;
            const elementBelowMouse = document.elementFromPoint(clientX, clientY);
            const isTrashBelowMouse = elementBelowMouse && elementBelowMouse.className === 'trash-can';
            removeElementCopyFromDocumentBody(event);

            if (isTrashBelowMouse) {
                removeColumnCookieByID(this.$cookies, this.draggedElement.id);
                this.removeColumnWrapper(this.draggedElIndex);
            } else {
                this.removeColumnsTransform();

                if (this.ghostIndex !== this.draggedElIndex) {
                    this.changeColumnPositionWrapper();
                }
            }

            this.resetDraggedElementCache();
            this.setDraggableState({ propName: 'draggedElementOnGrid', value: null });
            this.$emit('mouseOverGrid', false);
        },
        async onDrop(event) {
            event.preventDefault();

            if (typeof this.draggedElement !== 'object') {
                const columnId = event.dataTransfer.getData('text/plain');

                this.removeColumnsTransform();
                await this.$store.dispatch(`${this.storeNamespace}/getColumnData`, {
                    ghostIndex: this.ghostIndex,
                    columnId,
                    path: `${this.languageCode}/products`,
                });
                this.resetDraggedElementCache();
                this.$emit('mouseOverGrid', false);
            }
        },
        onDragOver(event) {
            if (!this.draggedElement) return false;
            if (!this.isMouseOverGrid) this.$emit('mouseOverGrid', true);

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

            this.updateColumnsTransform(isBefore);
            this.updateGhostIndex(isBefore);

            return true;
        },
        initResizeDrag(event) {
            this.isResizing = true;
            this.initMousePosition(event);
            this.initElementWidth();
            this.updateElementWidth(`${this.startWidth}px`);
            this.addEventListenersForResizeState();
        },
        doResizeDrag(event) {
            const { clientX } = event;
            const width = this.getElementWidthBasedOnMouseXPosition(clientX);
            const minWidth = 40;

            if (width > minWidth) {
                this.updateElementWidth(`${width}px`);
                this.$store.dispatch(`${this.storeNamespace}/updateColumnWidthAtIndex`, {
                    index: this.index, width: `${width}px`,
                });
            }
        },
        stopResizeDrag() {
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
        addBorderToRightNeighbour(neighbour) {
            neighbour.classList.add('border-right');
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
            this.$store.dispatch(`${this.storeNamespace}/removeColumnAtIndex`, index);
            this.$store.dispatch(`${this.storeNamespace}/removeColumnWidthAtIndex`, index);
        },
        changeColumnPositionWrapper() {
            this.$store.dispatch(`${this.storeNamespace}/changeColumnPosition`, {
                from: this.draggedElIndex,
                to: this.ghostIndex,
            });
            this.$store.dispatch(`${this.storeNamespace}/changeColumnWidthPosition`, {
                from: this.draggedElIndex,
                to: this.ghostIndex,
            });
        },
        updateGhostIndex(isBefore) {
            if (this.index < this.draggedElIndex) {
                this.setGhostIndex(isBefore ? this.index : this.index + 1);
            } else {
                this.setGhostIndex(isBefore ? this.index - 1 : this.index);
            }
        },
        updateColumnsTransform(isBefore) {
            const contentGrid = this.getGridContentElement();
            const { width: ghostWidth } = contentGrid.children[this.draggedElIndex]
                .getBoundingClientRect();
            const ghostTransform = +contentGrid.children[this.draggedElIndex].style.transform.replace(/[^0-9\-.,]/g, '');
            let bounds = {};

            if (this.ghostIndex > this.index) {
                bounds = this.getLowerBoundsTransforms({
                    contentGrid, ghostWidth, ghostTransform, isBefore,
                });
            } else {
                bounds = this.getUpperBoundsTransforms({
                    contentGrid, ghostWidth, ghostTransform, isBefore,
                });
            }

            Object.keys(bounds.transforms).forEach((index) => {
                contentGrid.children[index].style.transform = `translateX(${bounds.transforms[index]}px)`;
            });

            contentGrid.children[this.draggedElIndex].style.transform = `translateX(${bounds.updatedGhostTransform}px)`;
        },
        getLowerBoundsTransforms(contentGrid, ghostWidth, ghostTransform) {
            const transforms = {};
            const lowerBoundOffset = this.ghostIndex > this.draggedElIndex ? 1 : 0;
            let lowerBound = this.ghostIndex + lowerBoundOffset;
            let updatedGhostTransform = ghostTransform;

            while (lowerBound > this.index) {
                lowerBound -= 1;

                if (lowerBound !== this.draggedElIndex) {
                    const {
                        colWidth, colTransform,
                    } = this.getColumnElBounds(contentGrid, lowerBound);

                    if (colTransform > 0) {
                        transforms[lowerBound] = 0;
                        updatedGhostTransform += colWidth;
                    } else {
                        transforms[lowerBound] = lowerBound > this.draggedElIndex ? 0 : ghostWidth;
                        updatedGhostTransform -= colWidth;
                    }
                }
            }

            return { transforms, updatedGhostTransform };
        },
        getUpperBoundsTransforms(contentGrid, ghostWidth, ghostTransform) {
            const transforms = {};
            const upperBoundOffset = this.ghostIndex < this.draggedElIndex ? 1 : 0;
            let upperBound = this.ghostIndex - upperBoundOffset;
            let updatedGhostTransform = ghostTransform;

            while (upperBound < this.index) {
                upperBound += 1;

                if (upperBound !== this.draggedElIndex) {
                    const {
                        colWidth, colTransform,
                    } = this.getColumnElBounds(contentGrid, upperBound);

                    if (colTransform < 0) {
                        transforms[upperBound] = 0;
                        updatedGhostTransform -= colWidth;
                    } else {
                        transforms[upperBound] = upperBound < this.draggedElIndex ? 0 : -ghostWidth;
                        updatedGhostTransform += colWidth;
                    }
                }
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
            const contentGrid = this.getGridContentElement();
            const { children: columns } = contentGrid;

            this.$el.classList.remove('hover');

            if (this.index - 1 > -1) {
                columns[this.index - 1].classList.add('border-right');
                columns[this.index].classList.add('border-right');
            }
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
        }

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
    }
</style>
