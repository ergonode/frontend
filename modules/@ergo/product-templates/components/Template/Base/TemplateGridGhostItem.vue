/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="['ghost-item', highlightedStateClasses]"
        @dragenter="onDragEnter"
        @dragleave="onDragLeave"
        @dragover="onDragOver"
        @drop="onDrop" />
</template>

<script>
import { mapState } from 'vuex';
import {
    addGhostElementToDraggableLayer,
    removeGhostElementFromDraggableLayer,
} from '@Templates/models/layout/GhostElement';

export default {
    name: 'TemplateGridGhostItem',
    props: {
        position: {
            type: Object,
            required: true,
        },
        highlightingPositions: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            isGhostElement: false,
        };
    },
    computed: {
        ...mapState('draggable', {
            draggedElement: (state) => state.draggedElement,
        }),
        highlightedStateClasses() {
            return {
                'ghost-item--highlighted': this.highlightedElement,
                'ghost-item--top-border': this.highlightedElement && !this.isTopNeighbour,
                'ghost-item--right-border': this.highlightedElement && !this.isRightNeighbour,
            };
        },
        highlightedElement() {
            return this.highlightingPositions.find(this.isEqualToPosition);
        },
        isTopNeighbour() {
            const { row: rowPos, column: columnPos } = this.position;

            return this.highlightingPositions.some(
                ({ row, column }) => row === rowPos - 1 && column === columnPos,
            );
        },
        isRightNeighbour() {
            const { row: rowPos, column: columnPos } = this.position;

            return this.highlightingPositions.some(
                ({ row, column }) => row === rowPos && column === columnPos + 1,
            );
        },
    },
    methods: {
        onDrop(event) {
            event.preventDefault();
            if (this.isGhostElement) {
                removeGhostElementFromDraggableLayer();

                this.$emit('drop', this.position);
            }
        },
        onDragOver(event) {
            event.preventDefault();
        },
        onDragEnter() {
            if (this.highlightedElement && !this.highlightedElement.isObstacle) {
                this.addGhostElement();
                this.isGhostElement = true;
            }
        },
        onDragLeave() {
            if (this.highlightedElement && !this.highlightedElement.isObstacle) {
                removeGhostElementFromDraggableLayer();
                this.isGhostElement = false;
            }
        },
        isEqualToPosition(position) {
            const { row, column } = this.position;

            return row === position.row && column === position.column;
        },
        addGhostElement() {
            let draggedElementWidth = 1;
            let draggedElementHeight = 1;

            if (typeof this.draggedElement === 'object') {
                draggedElementWidth = this.draggedElement.width;
                draggedElementHeight = this.draggedElement.height;
            }

            const elementsGap = 16;
            const {
                width, height,
            } = this.$el.getBoundingClientRect();
            const normalizedWidth = width * draggedElementWidth - elementsGap;
            const normalizedHeight = height * draggedElementHeight - elementsGap;

            addGhostElementToDraggableLayer({
                top: this.$el.offsetTop + (elementsGap / 2),
                left: this.$el.offsetLeft + (elementsGap / 2),
                width: normalizedWidth,
                height: normalizedHeight,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    .ghost-item {
        position: relative;
        display: flex;
        padding: 8px;
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
        border-left: $BORDER_DASHED_GREY;
        border-bottom: $BORDER_DASHED_GREY;

        &--highlighted {
            flex: 1;
            background-color: $GREEN_LIGHT;
            border-left: $BORDER_DASHED_GREEN;
            border-bottom: $BORDER_DASHED_GREEN;
        }

        &--top-border {
            border-top: $BORDER_DASHED_GREEN;
        }

        &--right-border {
            border-right: $BORDER_DASHED_GREEN;
        }
    }
</style>
