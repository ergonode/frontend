/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <NuxtLink
        :to="item.route"
        :class="['tab-bar-item', {
            'tab-bar-item--selected': isSelected,
        }]"
        @click.native="onLinkSelect"
        v-text="item.title" />
</template>

<script>
import tabBarItemMixin from '~/mixins/tabBar/tabBarItemMixin';

export default {
    name: 'HorizontalTabBarItem',
    mixins: [tabBarItemMixin],
    methods: {
        onLinkSelect() {
            this.$emit('select', this.index);
        },
    },
};
</script>

<style lang="scss" scoped>
    .tab-bar-item {
        $item: &;

        outline: none;
        position: relative;
        bottom: -1px;
        display: flex;
        justify-content: center;
        width: 176px;
        padding-top: 6px;
        color: $GRAPHITE_DARK;
        font: $FONT_MEDIUM_14_20;
        text-align: center;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
        text-decoration: none;

        &:after {
            position: absolute;
            left: 0;
            bottom: 0;
            right: 0;
            z-index: $Z_INDEX_LVL_1;
            height: 3px;
            background-color: $GREEN;
            opacity: 0;
            content: "";
        }

        &--selected:after {
            opacity: 1;
        }
    }
</style>
