/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <span
        class="header-cell font--bold-12-16"
        :title="hint"
        v-text="title" />
</template>

<script>
export default {
    name: 'GridPresentationHeaderCell',
    props: {
        title: {
            type: String,
            default: 'Header',
        },
        hint: {
            type: String,
            default: '',
        },
        suffix: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="scss" scoped>
    .header-cell {
        padding: 8px;
        color: $GRAPHITE_DARK;
        user-select: none;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
</style>
