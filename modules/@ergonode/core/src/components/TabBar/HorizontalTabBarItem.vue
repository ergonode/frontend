/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <button
        class="tab-bar-item"
        v-text="item.title"
        @click="onSelect" />
</template>

<script>
import tabBarItemMixin from '@Core/mixins/tabBar/tabBarItemMixin';

export default {
    name: 'HorizontalRoutingTabBarItem',
    mixins: [
        tabBarItemMixin,
    ],
    methods: {
        onSelect() {
            this.$emit('select', this.index);
        },
    },
};
</script>

<style lang="scss" scoped>
    .tab-bar-item {
        outline: none;
        display: flex;
        flex: 0 0 176px;
        justify-content: center;
        padding-top: 6px;
        border: none;
        background-color: $WHITE;
        color: $GRAPHITE_DARK;
        font: $FONT_MEDIUM_14_20;
        text-align: center;
        text-overflow: ellipsis;
        cursor: pointer;
        overflow: hidden;
        word-break: break-all;
        text-decoration: none;
    }
</style>
