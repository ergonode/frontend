/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="text-edit-content-cell">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'GridTextEditContentCell',
};
</script>

<style lang="scss" scoped>
    .text-edit-content-cell {
        padding: 8px;
        box-sizing: border-box;
        background-color: $WHITE;
        transform: translate(-2px, -2px);
        box-shadow: $ELEVATOR_6_DP;
    }
</style>
