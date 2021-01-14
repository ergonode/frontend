/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="action-column">
        <slot />
    </div>
</template>

<script>

export default {
    name: 'GridActionColumn',
};
</script>

<style lang="scss" scoped>
    .action-column {
        flex-shrink: 0;
        display: grid;
        width: 32px;
        background-color: $WHITE;

        & > .grid-table-cell:nth-child(1) {
            position: sticky;
            top: 0;
            z-index: $Z_INDEX_LVL_2;
            background-color: $WHITESMOKE;
        }
    }
</style>
