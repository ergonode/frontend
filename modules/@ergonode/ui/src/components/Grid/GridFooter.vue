/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="grid-footer">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'GridFooter',
};
</script>

<style lang="scss" scoped>
    .grid-footer {
        z-index: $Z_INDEX_LVL_5;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 56px;
        padding: 8px;
        box-sizing: border-box;
        background-color: $WHITE;
        box-shadow: $ELEVATOR_6_DP;
    }
</style>
