/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="vertical-tab-bar">
        <div class="vertical-tab-bar__items">
            <VerticalTabBarItem
                v-for="(item, index) in items"
                :key="index"
                :index="index"
                :item="item"
                :is-selected="index === selectedTabIndex && isExpanded"
                @select="onSelectTabBarItem" />
            <Fab
                :floating="{ bottom: '16px' }"
                :theme="secondaryTheme"
                @click.native="onExpand">
                <template #icon="{ color }">
                    <IconArrowDouble
                        :fill-color="color"
                        :state="expendStateIcon" />
                </template>
            </Fab>
        </div>
        <VerticalTabContent
            v-show="isExpanded"
            :item="items[selectedTabIndex]" />
    </div>
</template>

<script>

import { THEME } from '@Core/defaults/theme';
import { ARROW } from '@Core/defaults/icons';

export default {
    name: 'VerticalTabBar',
    components: {
        VerticalTabContent: () => import('@Core/components/TabBar/VerticalTabContent'),
        VerticalTabBarItem: () => import('@Core/components/TabBar/VerticalTabBarItem'),
        Fab: () => import('@Core/components/Buttons/Fab'),
        IconArrowDouble: () => import('@Core/components/Icons/Arrows/IconArrowDouble'),
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
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        expendStateIcon() {
            return this.isExpanded ? ARROW.LEFT : ARROW.RIGHT;
        },
    },
    methods: {
        onSelectTabBarItem(index) {
            this.selectedTabIndex = index;
            this.isExpanded = true;
        },
        onExpand() {
            this.isExpanded = !this.isExpanded;
        },
    },
};
</script>

<style lang="scss" scoped>
    .vertical-tab-bar {
        display: flex;
        height: 100%;

        &__items {
            position: relative;
            display: flex;
            flex-flow: column nowrap;
            flex-direction: column;
            align-items: center;
            width: 80px;
            box-sizing: border-box;
            background-color: $WHITESMOKE;
        }
    }
</style>
