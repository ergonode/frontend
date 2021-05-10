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
        obstacleColumns: {
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
                    'workflow-designer-background-item--top-border-highlighted': this.isHighlightedTop,
                    'workflow-designer-background-item--left-border-highlighted': this.isHighlightedLeft,
                },
            ];
        },
        // TODO: Change it with Vuex state value when edit / create transition is done
        creatingTransitionRow() {
            return 1;
        },
        isHighlighted() {
            return this.row === this.creatingTransitionRow
                && this.obstacleColumns.includes(this.column + 1);
        },
        isHighlightedTop() {
            return this.row === this.creatingTransitionRow + 1
                && this.obstacleColumns.includes(this.column + 1);
        },
        isHighlightedLeft() {
            return this.row === this.creatingTransitionRow
                && this.obstacleColumns.includes(this.column);
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
