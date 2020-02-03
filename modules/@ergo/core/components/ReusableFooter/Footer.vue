/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="footer">
        <slot />
    </div>
</template>

<script>

export default {
    name: 'Footer',
};
</script>

<style lang="scss" scoped>
    .footer {
        z-index: $Z_INDEX_LVL_1;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 12px 24px;
        min-height: 40px;
        background-color: $WHITE;
        box-shadow: $ELEVATOR_6_DP;
    }
</style>
