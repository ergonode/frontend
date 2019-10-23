/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="
            [
                'tab-bar-item',
                {
                    'tab-bar-item--selected': (isSelected && isContentExpanded),
                    'not-expanded-content': !isContentExpanded,
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

            return this.isSelected && this.isContentExpanded
                ? '#00bc87'
                : '#5c5f65';
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
        @include setFont(medium, small, 15, $GRAPHITE);

        $tabItem: &;

        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 14px 8px;
        background-color: $WHITE;
        outline: none;
        border-left: 1px solid $GREY;
        border-top: 1px solid $GREY;
        text-align: center;

        &__title {
            margin-top: 8px;
        }

        &:not(&--selected), &.not-expanded-content {
            border-right: 1px solid $GREY;
            padding-right: 7px;
        }

        &:last-child {
            border-bottom: 1px solid $GREY;
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
