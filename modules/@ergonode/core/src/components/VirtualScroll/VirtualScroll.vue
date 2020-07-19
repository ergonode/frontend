/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

<template>
    <div
        class="virtual-scroll"
        ref="root"
        :style="rootStyle"
        @scroll="onScroll">
        <div
            class="virtual-scroll__viewport"
            :style="viewportStyle">
            <div
                class="virtual-scroll__spacer"
                :style="spacerStyle">
                <slot :visible-items="visibleItems" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GridScrollVirtualiser',
    props: {
        items: {
            type: Array,
            default: () => [],
        },
        rootHeight: {
            type: Number,
            default: 100,
        },
        rowHeight: {
            type: Number,
            default: 30,
        },
    },
    data() {
        return {
            scrollTop: 0,
            nodePadding: this.rowHeight,
        };
    },
    computed: {
        viewportHeight() {
            return this.itemCount * this.rowHeight;
        },
        startIndex() {
            let startNode = Math.floor((this.scrollTop - this.nodePadding) / this.rowHeight);
            startNode = Math.max(0, startNode);
            return startNode;
        },
        visibleNodeCount() {
            let count = Math.ceil((this.rootHeight + 2 * this.nodePadding) / this.rowHeight);
            count = Math.min(this.itemCount - this.startIndex, count);
            return count;
        },
        visibleItems() {
            return this.items.slice(
                this.startIndex,
                this.startIndex + this.visibleNodeCount,
            );
        },
        itemCount() {
            return this.items.length;
        },
        offsetY() {
            return this.startIndex * this.rowHeight;
        },
        spacerStyle() {
            return {
                transform: `translateY(${this.offsetY}px)`,
            };
        },
        viewportStyle() {
            return {
                height: `${this.viewportHeight}px`,
            };
        },
        rootStyle() {
            return {
                height: `${this.rootHeight}px`,
            };
        },
    },
    methods: {
        onScroll() {
            window.requestAnimationFrame(() => {
                this.scrollTop = this.$refs.root.scrollTop;
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    .virtual-scroll {
        overflow: auto;

        &__spacer {
            display: flex;
            will-change: transform;
        }

        &__viewport {
            position: relative;
            overflow: hidden;
            width: 100%;
            will-change: transform;
        }
    }
</style>
