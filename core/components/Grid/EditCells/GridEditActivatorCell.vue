/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="edit-cell">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'GridEditActivatorCell',
};
</script>

<style lang="scss" scoped>
    .edit-cell {
        position: absolute;
        z-index: $Z_INDEX_LVL_3;
        display: flex;
        justify-content: center;
    }
</style>
