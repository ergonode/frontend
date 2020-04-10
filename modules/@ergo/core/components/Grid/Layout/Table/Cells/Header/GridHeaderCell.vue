/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <span
        class="presentation-header-cell"
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
    .presentation-header-cell {
        padding: 8px;
        color: $GRAPHITE_DARK;
        font: $FONT_BOLD_12_16;
        user-select: none;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
</style>
