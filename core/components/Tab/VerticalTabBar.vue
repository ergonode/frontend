/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="tab-bar">
        <div
            v-if="isTabVisible || !isExpanded"
            class="tab-bar__items">
            <VerticalTabBarItem
                v-for="(item, index) in items"
                :key="index"
                :index="index"
                :item="item"
                :is-expanded="isExpanded"
                :is-selected="index === selectedTabIndex"
                @select="onSelectTabBarItem" />
        </div>
        <VerticalTabContent
            v-if="isExpanded"
            :tab-item="items[selectedTabIndex]"
            :selected-tab-index="selectedTabIndex"
            :is-expanded="isExpanded"
            @expand="onExpandTab" />
    </div>
</template>

<script>
export default {
    name: 'VerticalTabBar',
    components: {
        VerticalTabContent: () => import('~/core/components/Tab/VerticalTabContent'),
        VerticalTabBarItem: () => import('~/core/components/Tab/VerticalTabBarItem'),
    },
    props: {
        items: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            selectedTabIndex: 0,
            isExpanded: true,
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
            this.isExpanded = true;
        },
        onExpandTab(isExpanded) {
            this.isExpanded = isExpanded;
        },
    },
};
</script>

<style lang="scss" scoped>
    .tab-bar {
        display: flex;
        height: 100%;
        border-right: $BORDER_1_GREY;

        &__items {
            position: relative;
            display: flex;
            flex-flow: column nowrap;
            width: 82px;
            box-sizing: border-box;
            background-color: $WHITESMOKE;
        }
    }
</style>
