/*
* Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
* See LICENSE for license details.
*/
<template>
    <div
        :class="['ghost-item', draggableStateClasses]"
        draggable
        @dragenter="onDragEnter"
        @dragleave="onDragLeave"
        @dragover="onDragOver"
        @drop="onDrop">
        <div
            v-if="isInside"
            class="ghost-item__placeholder" />
    </div>
</template>

<script>

import {
    addGhostElementToDraggableLayer,
    removeGhostElementFromDraggableLayer,
} from '~/model/template_designer/layout/GhostElement';
import { mapState } from 'vuex';

export default {
    name: 'TemplateGridGhostItem',
    props: {
        position: {
            type: Object,
            required: true,
        },
        highlightingPositions: {
            type: Array,
            required: false,
            default: () => [],
        },
    },
    data() {
        return {
            isInside: false,
        };
    },
    computed: {
        ...mapState('draggable', {
            draggedElement: state => state.draggedElement,
        }),
        draggableStateClasses() {
            return {
                'ghost-item--highlighted': this.isHighlighted,
                'ghost-item--last-row-highlighted': this.isLastRowHighlighted,
            };
        },
        isHighlighted() {
            return this.highlightingPositions.find(this.isEqualToPosition);
        },
        isLastRowHighlighted() {
            const { row } = this.position;
            const { length } = this.highlightingPositions;

            if (length === 0) return false;

            const { row: lastRow } = this.highlightingPositions.reduce(
                (prev, current) => ((prev.row > current.row) ? prev : current),
            );

            return lastRow === row;
        },
    },
    methods: {
        onDrop() {
            this.isInside = false;

            this.removeGhostElementIfExist();

            this.$emit('drop', this.position);
        },
        onDragOver(event) {
            event.preventDefault();
        },
        onDragEnter() {
            this.isInside = true;

            this.addGhostElementIfNeeded();
        },
        onDragLeave() {
            this.isInside = false;

            this.removeGhostElementIfExist();
        },
        isEqualToPosition(point) {
            const { row, column } = this.position;
            return row === point.row && column === point.column;
        },
        addGhostElementIfNeeded() {
            if (typeof this.draggedElement === 'object') {
                const elementsGap = 16;
                const {
                    width, height,
                } = this.$el.getBoundingClientRect();
                const {
                    width: draggedElementWidth, height: draggedElementHeight,
                } = this.draggedElement;
                const normalizedWidth = width * draggedElementWidth - elementsGap;
                const normalizedHeight = height * draggedElementHeight - elementsGap;

                addGhostElementToDraggableLayer({
                    top: this.$el.offsetTop + (elementsGap / 2),
                    left: this.$el.offsetLeft + (elementsGap / 2),
                    width: normalizedWidth,
                    height: normalizedHeight,
                });
            }
        },
        removeGhostElementIfExist() {
            if (typeof this.draggedElement === 'object') {
                removeGhostElementFromDraggableLayer();
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .ghost-item {
        position: relative;
        display: flex;
        padding: 8px;

        &__placeholder {
            pointer-events: none;
            flex: 1;
            background-color: $success;
            box-shadow:
                inset 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                inset 0 3px 1px 0 rgba(0, 0, 0, 0.12),
                inset 0 1px 5px 0 rgba(0, 0, 0, 0.2);
        }

        &--highlighted {
            flex: 1;
            background-color: $lightGreen;
            border-left: 1px dashed $success;
            border-top: 1px dashed $success;
        }

        &--last-row-highlighted {
            border-bottom: 1px dashed $success;
        }
    }
</style>
