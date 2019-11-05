/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="
            [
                'tab-bar-item',
                'font--medium-12-16',
                {
                    'tab-bar-item--selected': (isSelected && isExpanded),
                    'tab-bar-item--expanded': isExpanded,
                }
            ]"
        @click="onClick">
        <Component
            :is="tabIconComponent"
            :fill-color="tabIconFillColor" />
        <span
            class="tab-bar-item__title"
            v-text="item.title" />
    </div>
</template>

<script>
import tabBarItemMixin from '~/mixins/tabBar/tabBarItemMixin';
import { GRAPHITE, GREEN } from '~/assets/scss/_variables/_colors.scss';

export default {
    name: 'VerticalTabBarItem',
    mixins: [tabBarItemMixin],
    computed: {
        tabIconComponent() {
            if (!this.item.iconPath) {
                return null;
            }

            return () => import(`~/components/Icon/${this.item.iconPath}`);
        },
        tabIconFillColor() {
            if (!this.item.iconPath) {
                return null;
            }

            return this.isSelected && this.isExpanded
                ? GREEN
                : GRAPHITE;
        },
    },
    methods: {
        onClick() {
            this.$emit('select', this.index);
        },
    },
};
</script>

<style lang="scss" scoped>
    .tab-bar-item {
        $tabItem: &;

        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 14px 8px;
        background-color: $WHITE;
        color: $GRAPHITE;
        outline: none;
        border-left: $BORDER_1_GREY;
        border-top: $BORDER_1_GREY;
        text-align: center;

        &__title {
            margin-top: 8px;
        }

        &:not(&--selected), &:not(&--expanded) {
            border-right: $BORDER_1_GREY;
            padding-right: 7px;
        }

        &:last-child {
            border-bottom: $BORDER_1_GREY;
        }

        &:after {
            position: absolute;
            top: -1px;
            left: -1px;
            bottom: -1px;
            z-index: 1;
            width: 3px;
            height: calc(100% + 2px);
            background-color: $GREEN;
            opacity: 0;
            content: "";
        }

        &--selected:after {
            opacity: 1;
        }

        &--selected {
            #{$tabItem}__title {
                opacity: 0.9;
                color: $GRAPHITE_DARK;
            }
        }
    }
</style>
