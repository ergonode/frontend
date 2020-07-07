/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="slider">
        <div
            class="slider__lower-sphere"
            :style="lowerSpherePositionStyle"
            @mousedown="onInitResize"
            @mouseenter="onMouseEnter"
            @mouseleave="onMouseLeave" />
        <div
            class="slider__upper-sphere"
            :style="upperSpherePositionStyle"
            @mousedown="onInitResize"
            @mouseenter="onMouseEnter"
            @mouseleave="onMouseLeave" />
        <div
            ref="tracker"
            class="slider__tracker" />
        <div
            :style="progressStyle"
            class="slider__progress" />
    </div>
</template>

<script>

const registerResizeEventListeners = () => import('@Core/models/resize/registerResizeEventListeners');
const unregisterResizeEventListeners = () => import('@Core/models/resize/unregisterResizeEventListeners');

export default {
    name: 'RangeSlider',
    props: {
        value: {
            type: Object,
            default: () => ({
                from: 0,
                to: 0,
            }),
        },
    },
    data() {
        return {
            width: 0,
            xPos: 0,
            maxValue: 100,
            sphereSize: 16,
            isDraggingUpperSphere: false,
        };
    },
    computed: {
        progressStyle() {
            const {
                from, to,
            } = this.value;
            const distance = to - from;

            return {
                transform: `translate(${this.getTransformValue(from)}px, 0) scale(${this.getTransformValue(distance)}, 1)`,
            };
        },
        lowerSpherePositionStyle() {
            return {
                transform: `translateX(${this.getTransformValue(this.value.from)}px)`,
            };
        },
        upperSpherePositionStyle() {
            return {
                transform: `translateX(${this.getTransformValue(this.value.to)}px)`,
            };
        },
    },
    mounted() {
        const {
            width, x,
        } = this.$refs.tracker.getBoundingClientRect();
        this.width = width;
        this.xPos = x;
    },
    methods: {
        onInitResize(event) {
            this.isDraggingUpperSphere = event.target.classList.contains('slider__upper-sphere');
            registerResizeEventListeners().then((response) => {
                response.default(this.onResize, this.onStopResizing);
            });
        },
        onMouseEnter(event) {
            event.target.classList.add('draggable-column--hovered');
        },
        onMouseLeave(event) {
            event.target.classList.remove('draggable-column--hovered');
        },
        onResize(event) {
            if (this.xPos < event.pageX) {
                const progress = this.getProgress(event.pageX);

                if (this.isDraggingUpperSphere) {
                    this.$emit('input', {
                        ...this.value,
                        to: progress,
                    });
                } else {
                    this.$emit('input', {
                        ...this.value,
                        from: progress,
                    });
                }
            }
        },
        onStopResizing() {
            unregisterResizeEventListeners().then((response) => {
                response.default(this.onResize, this.onStopResizing);
            });
        },
        getProgress(pageX) {
            const fixedXOffset = pageX - this.xPos - (this.sphereSize / 2);

            return Math.round((fixedXOffset / this.width) * this.maxValue);
        },
        getTransformValue(value) {
            return value === this.maxValue
                ? this.width - this.sphereSize
                : this.width * (value / this.maxValue);
        },
    },
};
</script>

<style lang="scss" scoped>
    .slider {
        position: relative;
        display: flex;
        align-items: center;
        height: 16px;

        &__progress, &__tracker {
            position: absolute;
            height: 2px;
        }

        &__progress {
            width: 1px;
            transform-origin: left;
            background-color: $GREEN;
        }

        &__tracker {
            width: 100%;
            background-color: $GREY;
        }

        &__lower-sphere, &__upper-sphere {
            position: absolute;
            width: 16px;
            height: 16px;
            background-color: $GREEN;
            border-radius: 50%;
            cursor: grab;

            &.hover {
                box-shadow: $ELEVATOR_2_DP;
            }
        }

        &__lower-sphere {
            z-index: $Z_INDEX_LVL_1;
        }

        &__upper-sphere {
            z-index: $Z_INDEX_LVL_2;
        }
    }
</style>
