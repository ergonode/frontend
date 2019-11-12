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
        HorizontalTabContent: () => import('~/components/Tab/HorizontalTabContent'),
        HorizontalTabBarItem: () => import('~/components/Tab/HorizontalTabBarItem'),
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
        },
    },
};
</script>

<style lang="scss" scoped>
    .tab-bar {
        display: flex;
        flex: 1;
        flex-direction: column;
        border-top: $BORDER_1_GREY;

        &__items {
            position: relative;
            display: flex;
            height: 48px;
            box-sizing: border-box;
            border-bottom: $BORDER_1_GREY;
            background-color: $WHITE;
        }
    }
</style>
