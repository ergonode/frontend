/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResizeObserver @resize="onResize">
        <div class="complex-progress-bar">
            <span
                class="complex-progress-bar__label"
                v-text="label" />
            <div class="complex-progress-bar__progress">
                <div
                    class="complex-progress-bar__value"
                    ref="value"
                    :style="valueStyles" />
                <div
                    v-if="value <= maxValue && value > 0 || value > maxValue"
                    ref="progressDivider"
                    class="complex-progress-bar__progress-divider" />
            </div>
        </div>
    </ResizeObserver>
</template>

<script>
import {
    GRAPHITE_DARK,
} from '@UI/assets/scss/_js-variables/colors.scss';

export default {
    name: 'ComplexProgressBar',
    props: {
        /**
         * Color of progress bar
         */
        color: {
            type: String,
            default: GRAPHITE_DARK,
            validator: value => /^#([A-Fa-f0-9]{6})$/.test(value),
        },
        /**
         * The label is a text caption or description for the component
         */
        label: {
            type: String,
            default: '',
        },
        /**
         * Component value
         */
        value: {
            type: Number,
            default: 0,
        },
        /**
         * Max value of possible given *value*
         */
        maxValue: {
            type: Number,
            default: 100,
        },
    },
    computed: {
        valueStyles() {
            return {
                backgroundColor: this.color,
            };
        },
    },
    methods: {
        onResize(entry) {
            const {
                width,
            } = entry.contentRect;
            const value = this.value > this.maxValue
                ? this.maxValue
                : this.value;
            const progressWidth = (value / this.maxValue) * width;

            requestAnimationFrame(() => {
                if (this.$refs.value && this.$refs.progressDivider) {
                    this.$refs.value.style.transform = `scaleX(${progressWidth})`;
                    this.$refs.progressDivider.style.transform = `translateX(${progressWidth - 1}px)`;
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    .complex-progress-bar {
        width: 100%;

        &__progress {
            display: flex;
            margin-top: 8px;
            height: 4px;
            background-color: $GREY;
            box-shadow: $ELEVATOR_2_DP;
        }

        &__value {
            position: relative;
            width: 1px;
            height: 4px;
            will-change: transform;
            transform-origin: left;
        }

        &__progress-divider {
            width: 4px;
            height: 4px;
            background-color: $GRAPHITE_DARK;
            will-change: transform;
        }

        &__value, &__progress-divider {
            transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
        }

        &__label {
            color: $GREY;
            font: $FONT_MEDIUM_12_16;
        }

        &__label-value {
            margin: 3px 0 0 24px;
            color: $WHITE;
            font: $FONT_SEMI_BOLD_24_32;
        }
    }
</style>
