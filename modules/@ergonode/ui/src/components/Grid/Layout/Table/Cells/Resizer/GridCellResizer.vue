/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="cell-resizer"
        :style="styles">
        <div
            v-if="isResizing"
            class="cell-resizer__focus-imitator"
            :style="focusImitatorStyles" />
        <div
            class="cell-resizer__content"
            @mousedown="initResizingDrag">
            <div
                v-if="isResizing"
                class="cell-resizer__border"
                :style="borderStyles"
                ref="border" />
        </div>
    </div>
</template>

<script>
const registerResizeEventListeners = () => import('@UI/models/resize/registerResizeEventListeners');
const unregisterResizeEventListeners = () => import('@UI/models/resize/unregisterResizeEventListeners');

export default {
    name: 'GridCellResizer',
    inject: [
        'getGridTableLayoutReference',
    ],
    props: {
        /**
         * The size of the component
         */
        size: {
            type: Object,
            default: () => ({
                width: 0,
                height: 0,
                minHeight: 1,
                maxHeight: 1,
            }),
        },
        /**
         * Position at which cell resizer will be rendered
         */
        position: {
            type: Object,
            default: () => ({
                top: '0',
                left: '0',
            }),
        },
    },
    data() {
        return {
            startY: 0,
            startHeight: 0,
            currentHeight: 0,
            isResizing: false,
        };
    },
    computed: {
        styles() {
            return {
                ...this.position,
                width: `${this.size.width}px`,
            };
        },
        focusImitatorStyles() {
            return {
                height: `${this.size.height}px`,
                width: `${this.size.width}px`,
                transform: `translateY(-${this.size.height}px)`,
            };
        },
        borderStyles() {
            return {
                width: `${this.size.width - 2}px`,
            };
        },
    },
    methods: {
        initResizingDrag(event) {
            const {
                pageY,
            } = event;

            this.isResizing = true;
            this.startY = pageY + this.getGridTableLayoutReference().scrollTop;
            this.startHeight = parseInt(this.size.height, 10);
            this.currentHeight = this.startHeight;

            this.$emit('resize', {
                isResizing: true,
                factor: 0,
            });

            registerResizeEventListeners().then((response) => {
                response.default(this.onResize, this.onStopResizing);
            });
        },
        onResize(event) {
            const {
                pageY,
            } = event;
            const height = pageY + this.getGridTableLayoutReference().scrollTop - this.startY;
            const factor = Math.ceil(height / this.startHeight);
            const fixedHeight = factor * this.startHeight;

            if (this.position.row + factor < this.position.minRow
                || this.position.row + factor > this.position.maxRow) {
                return false;
            }

            if (height < 0) {
                this.$refs.border.style.height = `${-1 * fixedHeight + this.startHeight}px`;
                this.$refs.border.style.bottom = '0';
                this.$refs.border.style.top = null;
            } else {
                this.$refs.border.style.height = `${fixedHeight - 1}px`;
                this.$refs.border.style.top = '0';
                this.$refs.border.style.bottom = null;
            }

            this.currentHeight = fixedHeight;

            return true;
        },
        onStopResizing() {
            const absCurrentHeight = Math.abs(this.currentHeight);
            const absStartHeight = Math.abs(this.startHeight);
            const factor = Math.ceil(this.currentHeight / this.startHeight);

            if (absCurrentHeight !== absStartHeight || absCurrentHeight === absStartHeight) {
                this.$emit('copy', factor);
            }

            this.isResizing = false;

            this.$emit('resize', {
                isResizing: false,
                factor,
            });

            unregisterResizeEventListeners().then((response) => {
                response.default(this.onResize, this.onStopResizing);
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    .cell-resizer {
        position: absolute;
        display: inline-block;

        &__content {
            position: relative;
            z-index: $Z_INDEX_LVL_1;
            height: 100%;

            &::after {
                position: absolute;
                left: 50%;
                bottom: -3px;
                z-index: $Z_INDEX_LVL_1;
                transform: translate(-50%, 0);
                width: 8px;
                height: 8px;
                border-radius: 4px;
                background-color: $GREEN;
                content: "";
                cursor: row-resize;
            }
        }

        &__border {
            position: absolute;
            z-index: $Z_INDEX_LVL_1;
            border: $BORDER_DASHED_GREEN;
        }

        &__focus-imitator {
            position: absolute;
            box-shadow: inset 0 0 0 2px $GREEN;
        }
    }
</style>
