/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
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
    COLUMNS,
} from '@Templates/defaults/templateDesigner';
import {
    getMaxColumnForGivenRow,
} from '@Templates/models/layout/TemplateDesignerCalculations';
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
        columns: {
            type: Number,
            default: COLUMNS,
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
                    'template-designer-background-item--top-border': !this.highlightedElement && this.isTopNeighbour,
                    'template-designer-background-item--right-border': this.highlightedElement && this.isRightNeighbour,
                    'template-designer-background-item--last-column': this.column + 1 === this.columns,
                },
            ];
        },
        highlightedElement() {
            return this.highlightingPositions.find(this.isEqualToPosition);
        },
        isTopNeighbour() {
            return this.highlightingPositions.some(
                ({
                    row,
                    column,
                }) => row === this.row - 1 && column === this.column,
            );
        },
        isRightNeighbour() {
            const maxColumnForGivenRow = getMaxColumnForGivenRow(
                this.row,
                this.highlightingPositions,
                this.columns,
            );

            return this.highlightingPositions.some(({
                row,
            }) => row === this.row) && this.column === maxColumnForGivenRow;
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

        &--last-column {
            border-right: $BORDER_DASHED_GREY;
        }

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
