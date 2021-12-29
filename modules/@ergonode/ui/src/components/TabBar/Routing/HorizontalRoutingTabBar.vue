/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="horizontal-routing-tab-bar">
        <HorizontalTabBarItems
            v-if="isTabVisible"
            :items="items"
            :selected-index="selectedIndex">
            <template #item="{ index, item }">
                <slot
                    name="item"
                    :index="index"
                    :item="item">
                    <HorizontalRoutingTabBarItem
                        :index="index"
                        :item="item"
                        :selected-index="selectedIndex"
                        :change-values="changeValues[item.scope]"
                        :errors="errors[item.scope]"
                        @select="onSelectTabBarItem" />
                </slot>
            </template>
        </HorizontalTabBarItems>
        <HorizontalTabBarContent v-if="items.length">
            <slot
                name="content"
                :item="items[selectedIndex]"
                :change-values="changeValues[items[selectedIndex].scope]"
                :errors="errors[items[selectedIndex].scope]">
                <NuxtChild
                    :key="$route.name"
                    keep-alive
                    :scope="items[selectedIndex].scope"
                    :change-values="changeValues[items[selectedIndex].scope]"
                    :errors="errors[items[selectedIndex].scope]" />
            </slot>
        </HorizontalTabBarContent>
    </div>
</template>

<script>

export default {
    name: 'HorizontalRoutingTabBar',
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
            selectedIndex: -1,
        };
    },
    computed: {
        isTabVisible() {
            return this.items.length > 1;
        },
    },
    watch: {
        $route: {
            immediate: true,
            handler() {
                this.selectedIndex = this.items.findIndex(
                    item => item.route.name === this.$route.name,
                );
            },
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
    }
</style>
