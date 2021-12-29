/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="horizontal-tab-bar-items">
        <HorizontalFixedScroll @scroll.native="onScroll">
            <div
                data-cy="tab-bar__items"
                ref="items"
                class="horizontal-tab-bar-items__container">
                <template v-for="(item, index) in items">
                    <slot
                        name="item"
                        :index="index"
                        :item="item" />
                </template>
            </div>
        </HorizontalFixedScroll>
        <ClientOnly>
            <TabBarItemSlider
                :items-reference="$refs.items"
                :scroll-left="scrollLeft"
                :selected-index="selectedIndex" />
        </ClientOnly>
    </div>
</template>

<script>
import HorizontalFixedScroll from '@UI/components/Layout/Scroll/HorizontalFixedScroll';
import TabBarItemSlider from '@UI/components/TabBar/TabBarItemSlider';

export default {
    name: 'HorizontalTabBarItems',
    components: {
        HorizontalFixedScroll,
        TabBarItemSlider,
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
        };
    },
    methods: {
        onScroll(event) {
            requestAnimationFrame(() => {
                this.scrollLeft = event.target.scrollLeft;
            });
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
