/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="horizontal-routing-tab-bar">
        <div
            data-cy="tab-bar__items"
            class="horizontal-routing-tab-bar__items"
            v-if="isTabVisible">
            <template v-for="(item, index) in items">
                <slot
                    name="item"
                    :index="index"
                    :item="item">
                    <HorizontalRoutingTabBarItem
                        :key="index"
                        :index="index"
                        :item="item"
                        @select="onSelectTabBarItem" />
                </slot>
            </template>
            <TabBarItemSlider :selected-index="selectedTabIndex" />
        </div>
        <slot
            name="content"
            v-if="items.length"
            :item="items[selectedTabIndex]">
            <HorizontalRoutingTabBarContent />
        </slot>
    </div>
</template>

<script>
export default {
    name: 'HorizontalRoutingTabBar',
    components: {
        TabBarItemSlider: () => import('@Core/components/TabBar/TabBarItemSlider'),
        HorizontalRoutingTabBarContent: () => import('@Core/components/TabBar/Routing/HorizontalRoutingTabBarContent'),
        HorizontalRoutingTabBarItem: () => import('@Core/components/TabBar/Routing/HorizontalRoutingTabBarItem'),
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
        },
    },
};
</script>

<style lang="scss" scoped>
    .horizontal-routing-tab-bar {
        position: relative;
        display: flex;
        flex: 1;
        flex-direction: column;

        &__items {
            position: relative;
            display: flex;
            height: 40px;
            background-image: linear-gradient($WHITESMOKE, $WHITE);
            overflow: auto;
        }
    }
</style>
