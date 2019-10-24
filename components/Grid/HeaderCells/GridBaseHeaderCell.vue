/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template functional>
    <span
        class="header-cell"
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
        @include setFont(bold, small, regular, $GRAPHITE_DARK);

        display: flex;
        flex: 1 1 auto;
        align-items: center;
        width: min-content;
        padding: 8px;
        user-select: none;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
</style>
