/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <button
        class="horizontal-tab-bar-item"
        type="button"
        :aria-label="item.title"
        v-text="item.title"
        @click="onSelect" />
</template>

<script>
export default {
    name: 'HorizontalTabBarItem',
    props: {
        index: {
            type: Number,
            required: true,
        },
        item: {
            type: Object,
            required: true,
        },
    },
    methods: {
        onSelect() {
            this.$emit('select', this.index);
        },
    },
};
</script>

<style lang="scss" scoped>
    .horizontal-tab-bar-item {
        outline: none;
        display: flex;
        min-width: 176px;
        justify-content: center;
        border: none;
        padding: 6px 16px 0;
        background-color: transparent;
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
