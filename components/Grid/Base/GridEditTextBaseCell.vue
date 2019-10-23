/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="text-edit-cell">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'GridEditTextBaseCell',
};
</script>

<style lang="scss" scoped>
    .text-edit-cell {
        padding: 8px;
        box-sizing: border-box;
        background-color: $WHITE;
        transform: translate(-4px, -4px);
        box-shadow:
            0 2px 2px 0 rgba(0, 0, 0, 0.14),
            0 3px 1px -2px rgba(0, 0, 0, 0.12),
            0 1px 5px 0 rgba(0, 0, 0, 0.2);
    }
</style>
