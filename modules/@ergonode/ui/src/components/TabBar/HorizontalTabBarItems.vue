/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="horizontal-tab-bar-items">
        <HorizontalFixedScroll @scroll.native="onScroll">
            <div
                data-cy="tab-bar__items"
                class="horizontal-tab-bar-items__container">
                <HorizontalTabBarItemResizeObserver
                    v-for="(item, index) in items"
                    :key="index"
                    :index="index"
                    @width-change="onWidthChange">
                    <slot
                        name="item"
                        :index="index"
                        :item="item" />
                </HorizontalTabBarItemResizeObserver>
            </div>
        </HorizontalFixedScroll>
        <TabBarItemSlider
            :widths="itemWidths"
            :scroll-left="scrollLeft"
            :selected-index="selectedIndex" />
    </div>
</template>

<script>
import HorizontalFixedScroll from '@UI/components/Layout/Scroll/HorizontalFixedScroll';

export default {
    name: 'HorizontalTabBarItems',
    components: {
        HorizontalFixedScroll,
    },
    props: {
        items: {
            type: Array,
            default: () => [],
        },
        selectedIndex: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            scrollLeft: 0,
            itemWidths: {},
        };
    },
    methods: {
        onScroll(event) {
            requestAnimationFrame(() => {
                this.scrollLeft = event.target.scrollLeft;
            });
        },
        onWidthChange({
            index,
            width,
        }) {
            this.itemWidths = {
                ...this.itemWidths,
                [index]: width,
            };
        },
    },
};
</script>

<style lang="scss" scoped>
    .horizontal-tab-bar-items {
        display: flex;
        flex-shrink: 0;
        background-image: linear-gradient($WHITESMOKE, $WHITE);

        &__container {
            display: flex;
            height: 40px;
        }
    }
</style>
