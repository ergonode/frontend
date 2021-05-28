/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="classes"
        :row="row"
        :column="column">
        <slot />
    </div>
</template>
<script>

export default {
    name: 'WorkflowDesignerBackgroundItem',
    props: {
        row: {
            type: Number,
            default: 0,
        },
        column: {
            type: Number,
            default: 0,
        },
        editedRow: {
            type: Number,
            default: -1,
        },
        validColumns: {
            type: Array,
            default: () => [],
        },
        excludeRows: {
            type: Array,
            default: () => [],
        },
        hasRightBorder: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        classes() {
            return [
                'workflow-designer-background-item',
                {
                    'workflow-designer-background-item--right-border': this.hasRightBorder,
                    'workflow-designer-background-item--highlighted': this.isHighlighted,
                    'workflow-designer-background-item--start-position': this.isStartPosition,
                    'workflow-designer-background-item--top-border-highlighted': this.isHighlightedTop,
                    'workflow-designer-background-item--left-border-highlighted': this.isHighlightedLeft,
                },
            ];
        },
        isStartPosition() {
            return !this.excludeRows.includes(this.row);
        },
        isHighlighted() {
            return this.row === this.editedRow
                && this.validColumns.includes(this.column);
        },
        isHighlightedTop() {
            return this.row === this.editedRow + 1
                && this.validColumns.includes(this.column);
        },
        isHighlightedLeft() {
            return this.row === this.editedRow
                && this.validColumns.includes(this.column - 1);
        },
    },
};
</script>

<style lang="scss" scoped>
.workflow-designer-background-item {
    border-top: $BORDER_DASHED_GREY;
    border-left: $BORDER_DASHED_GREY;

    &--right-border {
        border-right: $BORDER_DASHED_GREY;
    }

    &--highlighted {
        border-color: $GREEN;
        background-color: $GREEN_LIGHT;
    }

    &--top-border-highlighted {
        border-top-color: $GREEN;
    }

    &--left-border-highlighted {
        border-left-color: $GREEN;
    }
}
</style>
