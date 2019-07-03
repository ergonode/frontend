/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="['grid', {'grid--placeholder': isPlaceholder}]"
        :style="templateColumns"
        :draggable="isColumnMoveable"
        @dragstart="onDragStart"
        @dragend="onDragEnd"
        @dragover="onDragOver"
        @dragleave="onDragLeave"
        @dragenter="onDragEnter"
        @drop="onDrop">
        <slot />
    </div>
</template>

<script>

import { mapState, mapActions } from 'vuex';

export default {
    name: 'Grid',
    props: {
        columns: {
            type: Array,
            required: true,
        },
        isPlaceholder: {
            type: Boolean,
            required: true,
        },
    },
    data: () => ({
        ghostColumnIndex: -1,
        draggedColumnIndex: -1,
        draggedColumn: null,
        columnBounds: [],
    }),
    computed: {
        ...mapState('grid', {
            isColumnMoveable: state => state.configuration.isColumnMoveable,
        }),
        ...mapState('draggable', {
            isColumnDragging: state => state.isColumnDragging,
        }),
        ...mapState('authentication', {
            userLanguageCode: state => state.user.language,
        }),
        templateColumns() {
            return {
                gridTemplateColumns: this.columnWidths.join(' '),
            };
        },
        columnWidths() {
            return this.columns.map(column => column.width);
        },
    },
    methods: {
        ...mapActions('grid', [
            'removeColumnAtIndex',
            'insertColumnAtIndex',
            'getColumnData',
            'changeColumnPosition',
        ]),
        ...mapActions('draggable', [
            'setDraggableState',
            'setDraggedElement',
        ]),
        onDragStart(event) {
            // TODO: Handle pinned columns
            const { clientX, clientY } = event;
            const { children: gridColumns } = this.$el;

            this.initializeColumnBounds();

            this.getColumnBellowMouse({ clientX, gridColumns }, ({ index, gridColumn }) => {
                const [header] = gridColumn.children;
                const { y, height } = header.getBoundingClientRect();

                const isMouseAboveColumnHeader = y <= clientY && y + height >= clientY;
                const isMouseAbovePinnedColumn = gridColumn.classList.contains('column__right-pinned')
                    || gridColumn.classList.contains('column__left-pinned');

                if (!isMouseAboveColumnHeader || isMouseAbovePinnedColumn) {
                    event.preventDefault();
                    return false;
                }

                // Setup helpers
                this.ghostColumnIndex = index;
                this.draggedColumnIndex = index;
                this.draggedColumn = { ...this.columns[index] };

                const neighbourIndex = index === 0 ? index : index - 1;

                this.addBorderToRightNeighbour({ neighbour: gridColumns[neighbourIndex] });
                this.createColumnCopy({ event, gridColumn });
                this.removeColumnAtIndex({ index });
                this.insertColumnAtIndex({ column: this.getGhostColumn(), index });
                this.setDraggableState({ propName: 'isColumnDragging', value: true });

                return true;
            });
        },
        onDragEnd(event) {
            const { clientX, clientY } = event;
            const elementBelowMouse = document.elementFromPoint(clientX, clientY);
            const isTrashBelowMouse = elementBelowMouse && elementBelowMouse.className === 'trash-can';
            const ghostColumnExists = this.ghostColumnIndex !== -1;

            this.removeColumnCopy();

            if (ghostColumnExists) {
                this.removeColumnAtIndex({ index: this.ghostColumnIndex });
                this.insertColumnAtIndex({
                    column: this.draggedColumn, index: this.ghostColumnIndex,
                });
                this.insertIDToColumnsIDCookie({ index: this.ghostColumnIndex });
            } else if (!isTrashBelowMouse) {
                this.insertColumnAtIndex({
                    column: this.draggedColumn, index: this.draggedColumnIndex,
                });
                this.insertIDToColumnsIDCookie({ index: this.draggedColumnIndex });
            } else {
                this.removeIDFromColumnsIDCookie();
            }

            this.setDraggableState({ propName: 'isColumnDragging', value: false });

            // Clear cache
            this.ghostColumnIndex = -1;
            this.draggedColumnIndex = -1;
            this.draggedColumn = null;
            this.columnBounds = [];
        },
        onDrop(event) {
            if (!this.isColumnDragging) {
                const columnId = event.dataTransfer.getData('text/plain');

                this.getColumnData({
                    index: this.ghostColumnIndex,
                    columnId,
                    path: `${this.userLanguageCode}/products`,
                });

                if (this.ghostColumnIndex !== -1) {
                    this.removeColumnAtIndex({ index: this.ghostColumnIndex });

                    // Clear cache
                    this.ghostColumnIndex = -1;
                }
            }
        },
        onDragOver(event) {
            const { clientX } = event;
            const { children: gridColumns } = this.$el;

            this.getColumnBellowMouse({ clientX, gridColumns }, ({ index, gridColumn }) => {
                const isBefore = this.determinateDraggedColumnPositionState({
                    clientX, gridColumn,
                });

                const isMouseAbovePinnedColumn = gridColumn.classList.contains('column__right-pinned')
                    || gridColumn.classList.contains('column__left-pinned');
                const isMouseAboveExtenderColumn = gridColumn.classList.contains('column-extender') && !isBefore;

                if (this.ghostColumnIndex === index
                        || (isBefore && this.ghostColumnIndex === index - 1)
                        || (!isBefore && this.ghostColumnIndex === index + 1)
                        || isMouseAboveExtenderColumn
                        || isMouseAbovePinnedColumn) {
                    return false;
                }

                if (this.ghostColumnIndex === -1) {
                    this.insertColumnAtIndex({ column: this.getGhostColumn(), index });
                } else {
                    this.changeColumnPosition(
                        {
                            from: this.ghostColumnIndex,
                            to: index,
                        },
                    );
                }

                this.ghostColumnIndex = index;

                return true;
            });

            event.preventDefault();

            return true;
        },
        onDragLeave(event) {
            const { clientY, clientX } = event;
            const elementBelowMouse = document.elementFromPoint(clientX, clientY);
            const gridBounds = this.$el.getBoundingClientRect();
            const {
                top, right, width, height,
            } = gridBounds;
            const leftAtTheLeft = clientX <= right - width;
            const leftAtTheRight = clientX >= right;
            const leftAtTheTop = clientY <= top;
            const leftAtTheBottom = clientY >= (top + height);
            const isOutOfBounds = (leftAtTheTop
                || leftAtTheBottom
                || leftAtTheLeft
                || leftAtTheRight);
            const ghostColumnExists = this.ghostColumnIndex >= 0;
            const isTrashBelowMouse = elementBelowMouse && elementBelowMouse.className === 'trash-can';

            if ((isOutOfBounds || isTrashBelowMouse) && ghostColumnExists) {
                this.removeColumnAtIndex({ index: this.ghostColumnIndex });

                // Clear cache
                this.ghostColumnIndex = -1;
            }
        },
        onDragEnter(event) {
            if (this.ghostColumnIndex === -1) {
                const { clientX } = event;
                const { children: gridColumns } = this.$el;

                if (!this.columnBounds.length) {
                    this.initializeColumnBounds();
                }

                this.getColumnBellowMouse({ clientX, gridColumns }, ({ index, gridColumn }) => {
                    const isMouseAbovePinnedColumn = gridColumn.classList.contains('column__right-pinned')
                        || gridColumn.classList.contains('column__left-pinned');

                    if (isMouseAbovePinnedColumn) {
                        event.preventDefault();
                        return false;
                    }

                    // Setup helper
                    this.ghostColumnIndex = index;

                    this.insertColumnAtIndex({ column: this.getGhostColumn(), index });

                    return true;
                });
            }
        },
        getColumnBellowMouse({ clientX, gridColumns }, completion) {
            const { length } = gridColumns;

            for (let i = 0; i < length; i += 1) {
                const { x, width } = this.columnBounds[i];

                if (x <= clientX && x + width >= clientX) {
                    return completion({ index: i, gridColumn: gridColumns[i] });
                }
            }
            return null;
        },
        initializeColumnBounds() {
            const { children: gridColumns } = this.$el;

            const { length } = gridColumns;

            for (let i = 0; i < length; i += 1) {
                const bounds = gridColumns[i].getBoundingClientRect();
                this.columnBounds.push(bounds);
            }
        },
        createColumnCopy({ event, gridColumn }) {
            const clonedDOMElement = gridColumn.cloneNode(true);

            clonedDOMElement.style.position = 'absolute';
            clonedDOMElement.style.backgroundColor = 'white';
            clonedDOMElement.classList.add('cloned-column-element');

            document.body.appendChild(clonedDOMElement);

            event.dataTransfer.setDragImage(clonedDOMElement, clonedDOMElement.offsetWidth / 2, 0);
        },
        insertIDToColumnsIDCookie({ index }) {
            const columnsID = this.columns.map(col => col.id).filter(id => id !== 'extender' && id !== 'ghost');
            const parsedColumnsID = [
                ...columnsID.slice(0, index),
                this.draggedColumn.id,
                ...columnsID.slice(index),
            ];
            this.$cookies.set('columnsID', parsedColumnsID.join(','));
        },
        removeIDFromColumnsIDCookie() {
            const columnsID = this.columns.map(col => col.id).filter(id => id !== 'extender' && id !== 'ghost');
            this.$cookies.set('columnsID', columnsID.join(','));
        },
        removeColumnCopy() {
            const clonedDOMElement = document.body.querySelector('.cloned-column-element');
            document.body.removeChild(clonedDOMElement);
        },
        determinateDraggedColumnPositionState({ clientX, gridColumn }) {
            const columnBounds = gridColumn.getBoundingClientRect();
            const { x: columnXPos, width: columnWidth } = columnBounds;
            const normalizedHalfWidthFactor = 0.5;

            return (clientX - columnXPos) / columnWidth < normalizedHalfWidthFactor;
        },
        addBorderToRightNeighbour({ neighbour }) {
            neighbour.classList.add('column--border-right');
        },
        getGhostColumn() {
            return {
                id: 'ghost',
                editable: false,
                label: '',
                type: '',
                width: '100px',
            };
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid {
        display: grid;
        border: 1px solid $grey;
        background-color: $background;
        border-bottom: none;
        overflow: auto;

        &--placeholder {
            flex-shrink: 0;
        }
    }
</style>
