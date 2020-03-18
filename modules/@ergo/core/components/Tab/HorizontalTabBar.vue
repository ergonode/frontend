/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="tab-bar">
        <div
            class="tab-bar__items-background"
            v-if="isTabVisible">
            <HorizontalFixedScroll>
                <div class="tab-bar__items">
                    <HorizontalTabBarItem
                        v-for="(item, index) in items"
                        :key="index"
                        :index="index"
                        :is-selected="index === selectedTabIndex"
                        :item="item"
                        @select="onSelectTabBarItem" />
                </div>
            </HorizontalFixedScroll>
        </div>
        <slot
            name="item"
            v-if="items.length"
            :item="items[selectedTabIndex]">
            <HorizontalTabBarContent />
        </slot>
    </div>
</template>

<script>
export default {
    name: 'HorizontalTabBar',
    components: {
        HorizontalTabBarContent: () => import('@Core/components/Tab/HorizontalTabBarContent'),
        HorizontalTabBarItem: () => import('@Core/components/Tab/HorizontalTabBarItem'),
        HorizontalFixedScroll: () => import('@Core/components/Layout/Scroll/HorizontalFixedScroll'),
    },
    props: {
        items: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            selectedTabIndex: this.items.findIndex(
                item => item.route.name === this.$route.name,
            ),
        };
    },
    computed: {
        isTabVisible() {
            return this.items.length > 1;
        },
    },
    methods: {
        onSelectTabBarItem(index) {
            this.selectedTabIndex = index;

            this.$emit('selectTabAtIndex', index);
        },
    },
};
</script>

<style lang="scss" scoped>
    .tab-bar {
        display: flex;
        flex: 1;
        flex-direction: column;

        &__items-background {
            background-image: linear-gradient($WHITESMOKE, $WHITE);
        }

        &__items, &__items-background {
            display: flex;
            height: 40px;
        }
    }
</style>
