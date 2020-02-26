/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <svg
        class="icon"
        xmlns="http://www.w3.org/2000/svg"
        :width="width"
        :height="height"
        :aria-label="iconName"
        role="presentation">
        <g :fill="iconColor">
            <slot />
        </g>
    </svg>
</template>

<script>
export default {
    props: {
        iconName: {
            type: String,
            default: 'box',
        },
        width: {
            type: [Number, String],
            default: 16,
        },
        height: {
            type: [Number, String],
            default: 16,
        },
        iconColor: {
            type: String,
            default: 'currentColor',
        },
    },
};
</script>

<style lang="scss" scoped>
    .icon {
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    }
</style>
