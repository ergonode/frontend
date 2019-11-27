/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="slider">
        <div
            class="slider__lower-sphere"
            :style="lowerSpherePositionStyle"
            @mousedown="initResizeDrag"
            @mouseenter="onMouseEnter"
            @mouseleave="onMouseLeave" />
        <div
            class="slider__upper-sphere"
            :style="upperSpherePositionStyle"
            @mousedown="initResizeDrag"
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
export default {
    name: 'RangeSlider',
    props: {
        value: {
            type: Object,
            default: () => ({ from: 0, to: 0 }),
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
    mounted() {
        const { width, x } = this.$refs.tracker.getBoundingClientRect();
        this.width = width;
        this.xPos = x;
    },
    computed: {
        progressStyle() {
            const { from, to } = this.value;
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
    methods: {
        initResizeDrag(event) {
            this.isDraggingUpperSphere = event.target.classList.contains('slider__upper-sphere');
            this.addEventListenersForResizeState();
        },
        onMouseEnter(event) {
            event.target.classList.add('column--hovered');
        },
        onMouseLeave(event) {
            event.target.classList.remove('column--hovered');
        },
        doResizeDrag(event) {
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
        stopResizeDrag() {
            this.removeEventListenersForResizeState();
        },
        getProgress(pageX) {
            const fixedXOffset = pageX - this.xPos - (this.sphereSize / 2);

            return Math.round((fixedXOffset / this.width) * this.maxValue);
        },
        addEventListenersForResizeState() {
            document.documentElement.addEventListener(
                'mousemove',
                this.doResizeDrag,
                false,
            );
            document.documentElement.addEventListener(
                'mouseup',
                this.stopResizeDrag,
                false,
            );
        },
        removeEventListenersForResizeState() {
            document.documentElement.removeEventListener(
                'mousemove',
                this.doResizeDrag,
                false,
            );
            document.documentElement.removeEventListener(
                'mouseup',
                this.stopResizeDrag,
                false,
            );
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
            z-index: 1;
        }

        &__upper-sphere {
            z-index: 2;
        }
    }
</style>
