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
} from '~/model/template_designer/layout/GhostElement';

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
    computed: {
        ...mapState('draggable', {
            draggedElement: state => state.draggedElement,
        }),
        highlightedStateClasses() {
            return {
                'ghost-item--highlighted': this.isHighlighted,
                'ghost-item--top-border': this.isHighlighted && !this.isTopNeighbour,
                'ghost-item--right-border': this.isHighlighted && !this.isRightNeighbour,
            };
        },
        isHighlighted() {
            return this.highlightingPositions.some(this.isEqualToPosition);
        },
        isTopNeighbour() {
            return this.highlightingPositions.some(
                this.isEqualToPosition && this.isEqualToTopPosition,
            );
        },
        isRightNeighbour() {
            return this.highlightingPositions.some(
                this.isEqualToPosition && this.isEqualToRightPosition,
            );
        },
    },
    methods: {
        onDrop() {
            removeGhostElementFromDraggableLayer();

            this.$emit('drop', this.position);
        },
        onDragOver(event) {
            event.preventDefault();
        },
        onDragEnter() {
            this.addGhostElement();
        },
        onDragLeave() {
            removeGhostElementFromDraggableLayer();
        },
        isEqualToPosition(position) {
            const { row, column } = this.position;

            return row === position.row && column === position.column;
        },
        isEqualToTopPosition(position) {
            const { row } = this.position;

            return row - 1 === position.row;
        },
        isEqualToRightPosition(position) {
            const { column } = this.position;

            return column + 1 === position.column;
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
    $highlightingBorder: 1px dashed $success;
    $border: 1px dashed $grey;

    .ghost-item {
        position: relative;
        display: flex;
        padding: 8px;
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
        border-left: $border;
        border-bottom: $border;

        &--highlighted {
            flex: 1;
            background-color: $lightGreen;
            border-left: $highlightingBorder;
            border-bottom: $highlightingBorder;
        }

        &--top-border {
            border-top: $highlightingBorder;
        }

        &--right-border {
            border-right: $highlightingBorder;
        }
    }
</style>
