/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :style="styles"
        class="template-grid-item-line" />
</template>

<script>
export default {
    name: 'TemplateGirdItemLine',
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
        gridData: {
            type: Array,
            default: () => [],
        },
        isGhost: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        styles() {
            return {
                gridArea: `${this.row + 1} / ${this.column} / ${this.row + 2} / ${this.column + 1}`,
                transform: `translate(32px, -${this.distanceBetweenParentRow * this.rowHeight + this.gap}px)`,
                height: `calc((${this.distanceBetweenParentRow} * 100%) + 50% + ${this.gap}px)`,
                borderStyle: this.isGhost ? 'dashed' : 'solid',
            };
        },
        parent() {
            if (this.column === 0 || this.row === 0) {
                return this.gridData[0];
            }

            for (let i = this.row - 1; i >= 0; i -= 1) {
                if (this.gridData[i].column < this.column) {
                    return this.gridData[i];
                }
            }

            return this.gridData[0];
        },
        distanceBetweenParentRow() {
            return this.row - this.parent.row - 1;
        },
    },
};
</script>

<style lang="scss" scoped>
    .template-grid-item-line {
        width: 100%;
        border-left: 2px solid $GREEN;
        border-bottom: 2px solid $GREEN;
    }
</style>
