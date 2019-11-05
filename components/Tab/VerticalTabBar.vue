/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="tab-bar">
        <div
            v-if="isTabVisible"
            class="tab-bar__items">
            <div
                :class="
                    [
                        'scrollable-container',
                        {
                            'scrolling-disabled': !isScrollingEnabled
                        }
                    ]">
                <VerticalTabBarItem
                    v-for="(item, index) in items"
                    :key="index"
                    :index="index"
                    :item="item"
                    :is-expanded="isExpanded"
                    :is-selected="index === selectedTabIndex"
                    @select="onSelectTabBarItem" />
            </div>
        </div>
        <div
            v-show="isExpanded"
            class="tab-bar__item-content">
            <VerticalTabContent
                :tab-item="items[selectedTabIndex]"
                :is-expanded="isExpanded"
                @expand="onExpandTab" />
        </div>
    </div>
</template>

<script>
import tabBarMixin from '~/mixins/tabBar/tabBarMixin';

export default {
    name: 'VerticalTabBar',
    components: {
        VerticalTabContent: () => import('~/components/Tab/VerticalTabContent'),
        VerticalTabBarItem: () => import('~/components/Tab/VerticalTabBarItem'),
    },
    mixins: [tabBarMixin],
    data() {
        return {
            selectedTabIndex: 0,
            isExpanded: true,
        };
    },
    computed: {
        isTabVisible() {
            return this.items.length > 1 || !this.isExpanded;
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

        &__items {
            position: relative;
            right: -1px;
            z-index: 2;
            display: flex;
            flex-flow: column nowrap;
            width: 82px;
        }

        &__item-content {
            display: flex;
            flex-direction: column;
            border: $BORDER_1_GREY;
            box-sizing: border-box;
            background-color: $WHITE;
            border-bottom: none;
        }
    }

    .scrollable-container {
        position: relative;
        display: flex;
        overflow-x: auto;
        flex-flow: column nowrap;
    }
</style>
