/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="circle-progress-bar">
        <svg
            class="circle-progress-bar__svg"
            :height="size"
            :width="size">
            <circle
                :stroke="whitesmokeStrokeColor"
                fill="transparent"
                :stroke-width="stroke"
                :r="normalizedRadius"
                :cx="radius"
                :cy="radius" />
            <circle
                class="circle-progress-bar__progress"
                :stroke="strokeColor"
                fill="transparent"
                :stroke-dasharray="strokeDasharray"
                :style="{ strokeDashoffset }"
                :stroke-width="stroke"
                :r="normalizedRadius"
                :cx="radius"
                :cy="radius"
            />
        </svg>
        <span
            class="circle-progress-bar__title"
            v-text="percentProgress" />
        <slot />
    </div>
</template>

<script>
import {
    GREEN,
    WHITESMOKE,
} from '@UI/assets/scss/_js-variables/colors.scss';

export default {
    name: 'CircleProgressBar',
    props: {
        radius: {
            type: Number,
            default: 40,
        },
        progress: {
            type: Number,
            default: 0,
        },
        stroke: {
            type: Number,
            default: 4,
        },
        strokeColor: {
            type: String,
            default: GREEN,
        },
    },
    computed: {
        whitesmokeStrokeColor() {
            return WHITESMOKE;
        },
        percentProgress() {
            return `${Math.floor(this.progress)}%`;
        },
        size() {
            return this.radius * 2;
        },
        normalizedRadius() {
            return this.radius - (this.stroke / 2);
        },
        circumference() {
            return this.normalizedRadius * 2 * Math.PI;
        },
        strokeDashoffset() {
            return this.circumference - ((this.progress / 100) * this.circumference);
        },
        strokeDasharray() {
            return `${this.circumference} ${this.circumference}`;
        },
    },
};
</script>

<style lang="scss" scoped>
.circle-progress-bar {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__progress {
        transition: 0.35s stroke-dashoffset;
        transform: rotate(-90deg);
        transform-origin: 50% 50%;
    }

    &__title {
        position: absolute;
        color: $GRAPHITE_DARK;
        font: $FONT_SEMI_BOLD_12_16;
    }

    &__svg {
        paint-order: stroke;
    }
}
</style>
