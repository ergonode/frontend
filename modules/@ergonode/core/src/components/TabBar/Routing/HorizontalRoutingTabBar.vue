/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="horizontal-routing-tab-bar">
        <template v-if="isTabVisible">
            <div
                data-cy="tab-bar__items"
                class="horizontal-routing-tab-bar__items">
                <template v-for="(item, index) in items">
                    <slot
                        name="item"
                        :index="index"
                        :item="item">
                        <HorizontalRoutingTabBarItem
                            :key="index"
                            :index="index"
                            :item="item"
                            :errors="errors[item.scope]"
                            @select="onSelectTabBarItem" />
                    </slot>
                </template>
            </div>
            <TabBarItemSlider :selected-index="selectedTabIndex" />
        </template>
        <div class="horizontal-routing-tab-bar__content">
            <slot
                name="content"
                v-if="items.length"
                :item="items[selectedTabIndex]">
                <HorizontalRoutingTabBarContent />
            </slot>
        </div>
    </div>
</template>

<script>
import HorizontalRoutingTabBarContent from '@Core/components/TabBar/Routing/HorizontalRoutingTabBarContent';
import HorizontalRoutingTabBarItem from '@Core/components/TabBar/Routing/HorizontalRoutingTabBarItem';
import TabBarItemSlider from '@Core/components/TabBar/TabBarItemSlider';

export default {
    name: 'HorizontalRoutingTabBar',
    components: {
        TabBarItemSlider,
        HorizontalRoutingTabBarContent,
        HorizontalRoutingTabBarItem,
    },
    props: {
        items: {
            type: Array,
            required: true,
        },
        errors: {
            type: Object,
            default: () => ({}),
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
            flex-shrink: 0;
            background-image: linear-gradient($WHITESMOKE, $WHITE);
            overflow: auto;
        }

        &__content {
            display: flex;
            border-top: $BORDER_1_GREY;
            height: 100%;
            background-color: $WHITE;
        }
    }
</style>
