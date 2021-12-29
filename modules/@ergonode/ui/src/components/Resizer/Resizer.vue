/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :style="styles"
        :class="classes"
        @mousedown="onInitResize"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave" />
</template>

<script>
const registerResizeEventListeners = () => import('@UI/models/resize/registerResizeEventListeners');
const unregisterResizeEventListeners = () => import('@UI/models/resize/unregisterResizeEventListeners');

export default {
    name: 'Resizer',
    props: {
        /**
         * The minimal width of the column to which it might be stretched
         */
        minWidth: {
            type: Number,
            default: 150,
        },
        /**
         * Position at which resizer will be rendered
         */
        position: {
            type: Object,
            default: () => ({
                top: '0',
                right: '0',
            }),
        },
        /**
         * The vue component reference to which resizer is hooked
         */
        // eslint-disable-next-line vue/require-prop-types
        parentReference: {
            required: true,
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
        styles() {
            return {
                ...this.position,
            };
        },
        classes() {
            return [
                'resizer',
                {
                    'resizer--resizing': this.isResizing || this.isMouseOver,
                },
            ];
        },
        parentElement() {
            return typeof this.parentReference.$el === 'undefined'
                ? this.parentReference
                : this.parentReference.$el;
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
            } = this.parentElement.getBoundingClientRect();

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
                requestAnimationFrame(() => {
                    this.$emit('width-change', `${width}px`);
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
    .resizer {
        position: absolute;
        z-index: $Z_INDEX_LVL_5;
        width: 2.5px;
        height: 100%;
        cursor: col-resize;

        &--resizing {
            background-color: $GRAPHITE_DARK;
        }
    }
</style>
