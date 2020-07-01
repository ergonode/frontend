/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
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
        border: $BORDER_1_GREY;
        border-top: unset;
        padding: 12px 16px;
        box-sizing: border-box;
        background-color: $WHITE;
        box-shadow: $ELEVATOR_6_DP;
    }
</style>
