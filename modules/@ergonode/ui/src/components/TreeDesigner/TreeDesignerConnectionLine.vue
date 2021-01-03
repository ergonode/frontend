/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :style="styles"
        class="tree-designer-connection-line" />
</template>

<script>
import {
    getParent,
} from '@UI/models/treeDesigner';

export default {
    name: 'TreeDesignerConnectionLine',
    props: {
        row: {
            type: Number,
            default: 0,
        },
        column: {
            type: Number,
            default: 0,
        },
        rowHeight: {
            type: Number,
            default: 0,
        },
        gap: {
            type: Number,
            default: 8,
        },
        items: {
            type: Array,
            default: () => [],
        },
        borderStyle: {
            type: String,
            default: 'solid',
        },
    },
    computed: {
        styles() {
            return {
                gridArea: `${this.row + 1} / ${this.column} / ${this.row + 2} / ${this.column + 1}`,
                transform: `translate(32px, -${this.distanceBetweenParent * this.rowHeight + this.gap}px)`,
                height: `calc((${this.distanceBetweenParent} * 100%) + 50% + ${this.gap}px)`,
                borderStyle: this.borderStyle,
            };
        },
        parent() {
            return getParent({
                items: this.items,
                row: this.row,
                column: this.column,
            });
        },
        distanceBetweenParent() {
            return this.row - this.parent.row - 1;
        },
    },
};
</script>

<style lang="scss" scoped>
    .tree-designer-connection-line {
        width: 100%;
        border-left: 2px solid $GREEN;
        border-bottom: 2px solid $GREEN;
    }
</style>
