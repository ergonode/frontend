/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="slider">
        <div
            class="slider__sphere"
            :style="spherePositionStyle"
            @mousedown="initResizeDrag"
            @mouseenter="onMouseEnter"
            @mouseleave="onMouseLeave" />
        <div
            ref="tracker"
            class="slider__tracker"
            @click="onClick" />
        <div
            :style="progressStyle"
            class="slider__progress" />
    </div>
</template>

<script>
export default {
    name: 'Slider',
    props: {
        value: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            width: 0,
            xPos: 0,
            maxValue: 100,
            sphereSize: 16,
        };
    },
    mounted() {
        const { width, x } = this.$refs.tracker.getBoundingClientRect();
        this.width = width;
        this.xPos = x;
    },
    computed: {
        transformValue() {
            return this.value === this.maxValue
                ? this.width - this.sphereSize
                : this.width * (this.value / this.maxValue);
        },
        progressStyle() {
            return {
                transform: `scaleX(${this.transformValue})`,
            };
        },
        spherePositionStyle() {
            return {
                transform: `translateX(${this.transformValue}px)`,
            };
        },
    },
    methods: {
        initResizeDrag() {
            this.addEventListenersForResizeState();
        },
        onClick(event) {
            this.$emit('input', this.getProgress(event.pageX));
        },
        onMouseEnter(event) {
            event.target.classList.add('column--hovered');
        },
        onMouseLeave(event) {
            event.target.classList.remove('column--hovered');
        },
        doResizeDrag(event) {
            if (this.xPos < event.pageX) {
                this.$emit('input', this.getProgress(event.pageX));
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
    },
};
</script>

<style lang="scss" scoped>
    .slider {
        position: relative;
        display: flex;
        align-items: center;

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

        &__sphere {
            z-index: 1;
            width: 16px;
            height: 16px;
            background-color: $GREEN;
            border-radius: 50%;
            cursor: grab;

            &.hover {
                box-shadow: $ELEVATOR_2_DP;
            }
        }
    }
</style>
