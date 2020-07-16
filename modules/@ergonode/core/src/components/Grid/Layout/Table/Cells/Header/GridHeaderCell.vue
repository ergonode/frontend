/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <span
        class="grid-header-cell"
        :title="hint"
        v-text="title" />
</template>

<script>
export default {
    name: 'GridHeaderCell',
    props: {
        title: {
            type: String,
            default: 'Header',
        },
        hint: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid-header-cell {
        flex: 1;
        width: 0;
        padding: 8px 0 8px 8px;
        color: $GRAPHITE_DARK;
        font: $FONT_BOLD_12_16;
        box-sizing: border-box;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
</style>
