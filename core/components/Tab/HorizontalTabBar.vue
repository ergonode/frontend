/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="tab-bar">
        <div
            v-if="isTabVisible"
            class="tab-bar__items">
            <HorizontalTabBarItem
                v-for="(item, index) in items"
                :key="index"
                :index="index"
                :is-selected="index === selectedTabIndex"
                :item="item"
                @select="onSelectTabBarItem" />
        </div>
        <HorizontalTabContent :item="items[selectedTabIndex]" />
    </div>
</template>

<script>
export default {
    name: 'HorizontalTabBar',
    components: {
        HorizontalTabContent: () => import('~/core/components/Tab/HorizontalTabContent'),
        HorizontalTabBarItem: () => import('~/core/components/Tab/HorizontalTabBarItem'),
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
                (item) => item.route.name === this.$route.name,
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

        &__items {
            position: relative;
            display: flex;
            height: 40px;
            box-sizing: border-box;
            background-image: linear-gradient($WHITESMOKE, $WHITE);
        }
    }
</style>
