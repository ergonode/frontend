/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <span
        class="grid-header-cell-title"
        :title="hint"
        v-text="title" />
</template>

<script>
export default {
    name: 'GridTitleHeaderCell',
    props: {
        /**
         * The title of the component
         */
        title: {
            type: String,
            default: 'Header',
        },
        /**
         *  The hint is a tip for the component
         */
        hint: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid-header-cell-title {
        flex: 1;
        width: 0;
        padding: 8px 0 8px 8px;
        box-sizing: border-box;
        color: $GRAPHITE_DARK;
        font: $FONT_BOLD_12_16;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
</style>
