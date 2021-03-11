/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="grid-action-column">
        <div class="grid-action-column__header">
            <slot name="header" />
        </div>
        <slot />
    </div>
</template>

<script>

export default {
    name: 'GridActionColumn',
};
</script>

<style lang="scss" scoped>
    .grid-action-column {
        flex-shrink: 0;
        display: grid;
        width: 32px;
        background-color: $WHITE;

        &__header {
            position: sticky;
            top: 0;
            z-index: $Z_INDEX_LVL_2;
            background-color: $WHITESMOKE;
        }
    }
</style>
