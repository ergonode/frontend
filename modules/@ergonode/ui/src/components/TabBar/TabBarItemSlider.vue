/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="tab-bar-item-slider"
        :style="style" />
</template>

<script>
export default {
    name: 'TabBarItemSlider',
    props: {
        /**
         * Selected index of tab
         */
        selectedIndex: {
            type: Number,
            required: true,
        },
        widths: {
            type: Object,
            default: () => ({}),
        },
        scrollLeft: {
            type: Number,
            default: 0,
        },
    },
    computed: {
        itemWidth() {
            return this.widths[this.selectedIndex] || 0;
        },
        itemsWidth() {
            return Object.keys(this.widths).map(key => +key)
                .sort((a, b) => a - b)
                .slice(0, this.selectedIndex)
                .reduce((width, curr) => width + this.widths[curr], 0);
        },
        style() {
            return {
                width: `${this.itemWidth}px`,
                transform: `translateX(${this.itemsWidth - this.scrollLeft}px)`,
            };
        },
    },
};
</script>

<style lang="scss" scoped>
    .tab-bar-item-slider {
        position: absolute;
        top: 39px;
        left: 0;
        z-index: $Z_INDEX_LVL_1;
        height: 2px;
        background-color: $GREEN;
        transition:
            width,
            transform 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
        will-change:
            width,
            transform;
    }
</style>
