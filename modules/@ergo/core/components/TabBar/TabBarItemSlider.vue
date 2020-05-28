/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="tab-bar-item-slider"
        :style="positionStyle" />
</template>

<script>
export default {
    name: 'TabBarItemSlider',
    props: {
        selectedIndex: {
            type: Number,
            required: true,
        },
    },
    computed: {
        positionStyle() {
            return {
                transform: `translateX(${this.selectedIndex * 176}px)`,
            };
        },
    },
};
</script>

<style lang="scss" scoped>
    .tab-bar-item-slider {
        position: absolute;
        top: 38px;
        left: 0;
        z-index: $Z_INDEX_LVL_1;
        width: 176px;
        height: 2px;
        background-color: $GREEN;
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    }
</style>
