/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="classes"
        @mousedown="onInitResize"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave" />
</template>

<script>
const registerResizeEventListeners = () => import('@Core/models/resize/registerResizeEventListeners');
const unregisterResizeEventListeners = () => import('@Core/models/resize/unregisterResizeEventListeners');

export default {
    name: 'GridColumnResizer',
    props: {
        minWidth: {
            type: Number,
            default: 150,
        },
    },
    data() {
        return {
            isResizing: false,
            isMouseOver: false,
            startWidth: 0,
            startX: 0,
        };
    },
    computed: {
        classes() {
            return [
                'column-resizer',
                {
                    'column-resizer--resizing': this.isResizing || this.isMouseOver,
                },
            ];
        },
    },
    methods: {
        onMouseEnter() {
            this.isMouseOver = true;
        },
        onMouseLeave() {
            this.isMouseOver = false;
        },
        onInitResize({
            pageX,
        }) {
            const {
                width,
            } = this.$parent.$el.getBoundingClientRect();

            this.isResizing = true;
            this.startX = pageX;
            this.startWidth = parseInt(width, 10);

            this.$emit('resize', true);

            registerResizeEventListeners().then((response) => {
                response.default(this.onResize, this.onStopResizing);
            });
        },
        onResize({
            pageX,
        }) {
            const width = this.startWidth + pageX - this.startX;

            if (width > this.minWidth) {
                window.requestAnimationFrame(() => {
                    this.$emit('widthChange', `${width}px`);
                });
            }
        },
        onStopResizing() {
            this.isResizing = false;

            this.$emit('resize', false);

            unregisterResizeEventListeners().then((response) => {
                response.default(this.onResize, this.onStopResizing);
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    .column-resizer {
        position: absolute;
        top: 0;
        right: 1.25px;
        z-index: $Z_INDEX_LVL_5;
        width: 2.5px;
        height: 100%;
        cursor: col-resize;

        &--resizing {
            background-color: $GRAPHITE_DARK;
        }
    }
</style>
