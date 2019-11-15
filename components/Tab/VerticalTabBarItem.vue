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
        display: grid;
        row-gap: 4px;
        justify-items: center;
        align-items: center;
        padding: 12px 0;
        color: $GRAPHITE;
        outline: none;
        text-align: center;

        &--selected {
            background-image: linear-gradient(to left, $WHITE, $WHITESMOKE);

            #{$tabItem}__title {
                opacity: 0.9;
                color: $GRAPHITE_DARK;
            }
        }
    }
</style>
