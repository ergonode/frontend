/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="cell-resizer">
        <div
            class="cell-resizer__content"
            @mousedown="initResizingDrag">
            <div
                v-if="isResizing"
                class="cell-resizer__border"
                ref="border" />
        </div>
    </div>
</template>

<script>
const registerResizeEventListeners = () => import('@Core/models/resize/registerResizeEventListeners');
const unregisterResizeEventListeners = () => import('@Core/models/resize/unregisterResizeEventListeners');

export default {
    name: 'GridCellResizer',
    data() {
        return {
            startY: 0,
            startHeight: 0,
            currentHeight: 0,
            isResizing: false,
        };
    },
    methods: {
        initResizingDrag(event) {
            const { pageY } = event;

            this.isResizing = true;
            this.startY = pageY;
            this.startHeight = parseInt(this.$parent.$el.offsetHeight, 10);
            this.currentHeight = this.startHeight;

            registerResizeEventListeners().then((response) => {
                response.default(this.onResize, this.onStopResizing);
            });
        },
        onResize(event) {
            const { pageY } = event;
            const height = pageY - this.startY;
            const factor = Math.ceil(height / this.startHeight);
            const fixedHeight = factor * this.startHeight;

            if (fixedHeight !== this.currentHeight) {
                if (height < 0) {
                    this.$refs.border.style.height = `${-1 * fixedHeight + this.startHeight}px`;
                    this.$refs.border.style.bottom = '0';
                    this.$refs.border.style.top = null;
                } else {
                    this.$refs.border.style.height = `${fixedHeight}px`;
                    this.$refs.border.style.top = '0';
                    this.$refs.border.style.bottom = null;
                }

                this.currentHeight = fixedHeight;
            }
        },
        onStopResizing() {
            if (this.currentHeight !== this.startHeight) {
                const factor = Math.ceil(this.currentHeight / this.startHeight);

                this.$emit('copy', factor);
            }

            this.isResizing = false;

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
        bottom: 0;
        display: inline-block;
        width: 100%;
        opacity: 0;

        .cell-resizer__content {
            position: relative;
            z-index: $Z_INDEX_LVL_1;

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

        .cell-resizer__border {
            position: absolute;
            z-index: $Z_INDEX_LVL_1;
            width: 100%;
            border: $BORDER_DASHED_GREEN;
        }
    }
</style>
