/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="tab-bar">
        <div
            class="tab-bar__items"
            v-if="isTabVisible">
            <HorizontalTabBarItem
                v-for="(item, index) in items"
                :key="index"
                :index="index"
                :is-selected="index === selectedTabIndex"
                :item="item"
                @select="onSelectTabBarItem" />
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

        &__items {
            display: flex;
            height: 40px;
            background-image: linear-gradient($WHITESMOKE, $WHITE);
            overflow: auto;
        }
    }
</style>
