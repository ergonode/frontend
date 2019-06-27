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
        @drop="onDrop">
        <div
            v-if="isInside"
            class="ghost-item__placeholder" />
    </div>
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
    data() {
        return {
            isInside: false,
        };
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
    $border: 1px dashed $success;

    .ghost-item {
        position: relative;
        display: flex;
        padding: 8px;
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);

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
            border-left: $border;
            border-bottom: $border;
        }

        &--top-border {
            border-top: $border;
        }

        &--right-border {
            border-right: $border;
        }
    }
</style>
