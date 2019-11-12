/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="base-modal-card">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'BaseModalCard',
};
</script>

<style lang="scss" scoped>
    .base-modal-card {
        display: flex;
        flex-direction: column;
        box-shadow: $ELEVATOR_2_DP;
    }
</style>
