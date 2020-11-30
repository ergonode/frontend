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
        gap: {
            type: Number,
            default: 8,
        },
    },
    computed: {
        styles() {
            return {
                gridArea: `${this.row + 1} / ${this.column} / ${this.row + 2} / ${this.column + 1}`,
                transform: `translate(32px, -${this.gap}px)`,
                height: `calc(50% + ${this.gap}px)`,
            };
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
