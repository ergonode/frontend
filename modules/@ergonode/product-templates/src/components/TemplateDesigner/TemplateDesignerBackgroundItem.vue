/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="classes"
        :row="row"
        :column="column" />
</template>
<script>
import {
    isObject,
} from '@Core/models/objectWrapper';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'TemplateDesignerBackgroundItem',
    props: {
        highlightingPositions: {
            type: Array,
            default: () => [],
        },
        row: {
            type: Number,
            default: 0,
        },
        column: {
            type: Number,
            default: 0,
        },
    },
    computed: {
        ...mapState('draggable', [
            'draggedElement',
        ]),
        classes() {
            return [
                'template-designer-background-item',
                {
                    'template-designer-background-item--highlighted': this.highlightedElement,
                    // 'template-designer-background-item--top-border': this.highlightedElement && !this.isTopNeighbour,
                    // 'template-designer-background-item--right-border': this.highlightedElement && !this.isRightNeighbour,
                },
            ];
        },
        highlightedElement() {
            return this.highlightingPositions.find(this.isEqualToPosition);
        },
        isTopNeighbour() {
            return this.highlightingPositions.some(
                ({
                    row, column,
                }) => row === this.row - 1 && column === this.column,
            );
        },
        isRightNeighbour() {
            return this.highlightingPositions.some(
                ({
                    row, column,
                }) => row === this.row && column === this.column + 1,
            );
        },
        ghostItemBoundsStyle() {
            let draggedElementWidth = 1;
            let draggedElementHeight = 1;
            if (isObject(this.draggedElement)) {
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
        ...mapActions('draggable', [
            '__setState',
        ]),
        isEqualToPosition(position) {
            return this.row === position.row && this.column === position.column;
        },
    },
};
</script>
<style lang="scss" scoped>
    .template-designer-background-item {
        position: relative;
        display: flex;
        padding: 8px;
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
        border-top: $BORDER_DASHED_GREY;
        border-left: $BORDER_DASHED_GREY;

        &--highlighted {
            background-color: $GREEN_LIGHT;
            border-color: $GREEN;
        }

        &--top-border {
            border-top-color: $GREEN;
        }

        &--right-border {
            border-right: $BORDER_DASHED_GREEN;
        }
    }
</style>
