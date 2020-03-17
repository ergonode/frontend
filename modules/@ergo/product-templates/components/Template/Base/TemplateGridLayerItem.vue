/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="['template-grid-layer-item', highlightedStateClasses]"
        @dragenter="onDragEnter"
        @dragleave="onDragLeave"
        @dragover="onDragOver"
        @drop="onDrop">
        <TemplateGridGhostItem
            v-if="isGhostElement"
            :style="ghostItemBoundsStyle" />
    </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
    name: 'TemplateGridLayerItem',
    components: {
        TemplateGridGhostItem: () => import('@Templates/components/Template/Base/TemplateGridGhostItem'),
    },
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
            draggedElement: state => state.draggedElement,
        }),
        highlightedStateClasses() {
            return {
                'template-grid-layer-item--highlighted': this.highlightedElement,
                'template-grid-layer-item--top-border': this.highlightedElement && !this.isTopNeighbour,
                'template-grid-layer-item--right-border': this.highlightedElement && !this.isRightNeighbour,
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
        ghostItemBoundsStyle() {
            let draggedElementWidth = 1;
            let draggedElementHeight = 1;
            if (typeof this.draggedElement === 'object') {
                draggedElementWidth = this.draggedElement.width;
                draggedElementHeight = this.draggedElement.height;
            }
            const elementsGap = 16;
            const {
                width, height,
                top,
                left,
            } = this.$el.getBoundingClientRect();
            const normalizedWidth = width * draggedElementWidth - elementsGap;
            const normalizedHeight = height * draggedElementHeight - elementsGap;
            return {
                top: `${top + (elementsGap / 2)}px`,
                left: `${left + (elementsGap / 2)}px`,
                width: `${normalizedWidth}px`,
                height: `${normalizedHeight}px`,
            };
        },
    },
    methods: {
        onDrop(event) {
            event.preventDefault();
            if (this.isGhostElement) {
                this.isGhostElement = false;
                this.$emit('drop', this.position);
            }
        },
        onDragOver(event) {
            event.preventDefault();
        },
        onDragEnter() {
            if (this.highlightedElement && !this.highlightedElement.isObstacle) {
                this.isGhostElement = true;
            }
        },
        onDragLeave() {
            if (this.highlightedElement && !this.highlightedElement.isObstacle) {
                this.isGhostElement = false;
            }
        },
        isEqualToPosition(position) {
            const { row, column } = this.position;
            return row === position.row && column === position.column;
        },
    },
};
</script>
<style lang="scss" scoped>
    .template-grid-layer-item {
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
