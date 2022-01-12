/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

<template>
    <div class="image-edit-content-cell">
        <slot />
    </div>
</template>

<script>
/**
 * @deprecated since 1.2.0 - replaced by GridEditContentCell
 */
export default {
    name: 'GridImageEditContentCell',
};
</script>

<style lang="scss" scoped>
    .image-edit-content-cell {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: $WHITE;
        box-shadow: $ELEVATOR_6_DP;
    }
</style>
