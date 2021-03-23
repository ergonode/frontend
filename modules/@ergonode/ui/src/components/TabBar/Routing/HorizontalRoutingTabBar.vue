/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="horizontal-routing-tab-bar">
        <template v-if="isTabVisible">
            <div
                data-cy="tab-bar__items"
                ref="items"
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
                            :selected-index="selectedTabIndex"
                            :change-values="changeValues[item.scope]"
                            :errors="errors[item.scope]"
                            @select="onSelectTabBarItem" />
                    </slot>
                </template>
            </div>
            <ClientOnly>
                <TabBarItemSlider
                    :items-reference="$refs.items"
                    :selected-index="selectedTabIndex" />
            </ClientOnly>
        </template>
        <div class="horizontal-routing-tab-bar__content">
            <slot
                name="content"
                v-if="items.length"
                :item="items[selectedTabIndex]"
                :change-values="changeValues[items[selectedTabIndex].scope]"
                :errors="errors[items[selectedTabIndex].scope]">
                <HorizontalRoutingTabBarContent
                    :scope="items[selectedTabIndex].scope"
                    :change-values="changeValues[items[selectedTabIndex].scope]"
                    :errors="errors[items[selectedTabIndex].scope]" />
            </slot>
        </div>
    </div>
</template>

<script>
import HorizontalRoutingTabBarContent from '@UI/components/TabBar/Routing/HorizontalRoutingTabBarContent';
import HorizontalRoutingTabBarItem from '@UI/components/TabBar/Routing/HorizontalRoutingTabBarItem';
import TabBarItemSlider from '@UI/components/TabBar/TabBarItemSlider';

export default {
    name: 'HorizontalRoutingTabBar',
    components: {
        TabBarItemSlider,
        HorizontalRoutingTabBarContent,
        HorizontalRoutingTabBarItem,
    },
    props: {
        /**
         * List of items
         */
        items: {
            type: Array,
            required: true,
        },
        /**
         * The validation errors
         */
        errors: {
            type: Object,
            default: () => ({}),
        },
        /**
         * Values that have been changes at given context
         */
        changeValues: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            childrenQueries: {},
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
            const {
                name,
            } = this.items[index].route;
            const route = {
                name,
                query: this.childrenQueries[name] || {},
            };

            this.childrenQueries[this.$route.name] = {
                ...this.$route.query,
            };
            this.selectedTabIndex = index;
            this.$router.push(route);
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
