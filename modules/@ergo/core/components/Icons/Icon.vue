/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <svg
        class="icon"
        xmlns="http://www.w3.org/2000/svg"
        :viewBox="viewBox"
        :width="width"
        :height="height"
        :aria-label="iconName"
        role="presentation">
        <g :fill="fillColor">
            <slot />
        </g>
    </svg>
</template>

<script>
import { GRAPHITE } from '@Core/assets/scss/_js-variables/colors.scss';

export default {
    props: {
        iconName: {
            type: String,
            default: 'box',
        },
        width: {
            type: [Number, String],
            default: 24,
        },
        height: {
            type: [Number, String],
            default: 24,
        },
        viewBox: {
            type: String,
            default: '0 0 24 24',
        },
        fillColor: {
            type: String,
            default: GRAPHITE,
        },
    },
};
</script>

<style lang="scss" scoped>
    .icon {
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    }
</style>
