/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResizeObserver @resize="onResize">
        <div class="horizontal-tab-bar-item-resize-observer">
            <slot />
        </div>
    </ResizeObserver>
</template>

<script>
export default {
    name: 'HorizontalTabBarItemResizeObserver',
    props: {
        index: {
            type: Number,
            default: -1,
        },
    },
    methods: {
        onResize(entry) {
            const {
                width,
            } = entry.contentRect;

            if (width) {
                this.$emit('width-change', {
                    index: this.index,
                    width: entry.contentRect.width,
                });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .horizontal-tab-bar-item-resize-observer {
        display: flex;
    }
</style>
