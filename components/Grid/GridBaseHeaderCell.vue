/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <span
        class="header"
        v-text="header" />
</template>

<script>
export default {
    name: 'GridBaseHeaderCell',
    props: {
        header: {
            type: String,
            default: 'Header',
        },
    },
};
</script>

<style lang="scss" scoped>
    .header {
        @include setFont(bold, small, regular, $graphite);

        flex: 1 1 auto;
        width: min-content;
        padding: 8px;
        user-select: none;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
</style>
