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
    name: 'GridFooter',
};
</script>

<style lang="scss" scoped>
    .footer {
        z-index: 999;
        display: flex;
        align-items: center;
        padding: 12px 24px;
        background-color: $WHITE;
        flex-shrink: 0;
        min-height: 40px;
        box-shadow: $ELEVATOR_6_DP;
    }
</style>
