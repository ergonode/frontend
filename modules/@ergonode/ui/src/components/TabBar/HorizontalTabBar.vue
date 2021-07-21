/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="horizontal-tab-bar">
        <HorizontalTabBarItems
            :items="items"
            :selected-index="selectedIndex">
            <template #item="{ index, item }">
                <slot
                    name="item"
                    :index="index"
                    :item="item">
                    <HorizontalTabBarItem
                        :key="index"
                        :index="index"
                        :item="item"
                        @select="onSelectTabBarItem" />
                </slot>
            </template>
        </HorizontalTabBarItems>
        <HorizontalTabBarContent v-if="items.length">
            <KeepAlive>
                <slot
                    name="content"
                    :item="items[selectedIndex].content">
                    <Component
                        :is="items[selectedIndex].content.component"
                        v-bind="{ ...items[selectedIndex].content.props || {} }"
                        v-on="{ ...items[selectedIndex].content.listeners || {} }" />
                </slot>
            </KeepAlive>
        </HorizontalTabBarContent>
    </div>
</template>

<script>
export default {
    name: 'HorizontalTabBar',
    props: {
        /**
         * List of items
         */
        items: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            selectedIndex: 0,
        };
    },
    methods: {
        onSelectTabBarItem(index) {
            this.selectedIndex = index;
        },
    },
};
</script>

<style lang="scss" scoped>
    .horizontal-tab-bar {
        position: relative;
        display: flex;
        flex: 1;
        flex-direction: column;
    }
</style>
