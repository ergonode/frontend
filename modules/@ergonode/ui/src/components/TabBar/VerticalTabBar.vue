/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
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
            v-if="isContentVisible"
            :item="items[selectedTabIndex]" />
        <slot />
    </div>
</template>

<script>

import {
    ARROW,
} from '@Core/defaults/icons';
import {
    THEME,
} from '@Core/defaults/theme';

export default {
    name: 'VerticalTabBar',
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
        isContentVisible() {
            return this.isExpanded && this.items.length > 0;
        },
    },
    watch: {
        items(oldValue, newValue) {
            if (oldValue.length !== newValue.length) {
                this.selectedTabIndex = 0;
            }
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
        position: relative;
        display: flex;
        height: 100%;
        border-right: $BORDER_1_GREY;

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
