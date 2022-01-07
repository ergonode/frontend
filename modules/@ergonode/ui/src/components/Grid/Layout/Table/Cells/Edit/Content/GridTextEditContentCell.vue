/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="grid-text-edit-content-cell">
        <slot />
    </div>
</template>

<script>
/**
 * @deprecated since 1.2.0 - replaced by GridEditContentCell
 */
export default {
    name: 'GridTextEditContentCell',
};
</script>

<style lang="scss" scoped>
    .grid-text-edit-content-cell {
        position: fixed;
        z-index: $Z_INDEX_LVL_7;
        padding: 8px;
        box-sizing: border-box;
        background-color: $WHITE;
        transform: translate(-4px, -4px);
        box-shadow: $ELEVATOR_6_DP;
    }
</style>
