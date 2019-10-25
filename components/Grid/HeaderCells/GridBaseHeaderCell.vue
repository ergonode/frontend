/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template functional>
    <span
        class="header-cell font--bold-12-16"
        v-text="props.header" />
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
    .header-cell {
        display: flex;
        flex: 1 1 auto;
        align-items: center;
        width: min-content;
        padding: 8px;
        color: $GRAPHITE_DARK;
        user-select: none;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
</style>
