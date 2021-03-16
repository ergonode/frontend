/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="modal">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'Modal',
};
</script>

<style lang="scss" scoped>
    .modal {
        display: flex;
        flex-direction: column;
        width: 400px;
        background-color: $WHITE;
        box-shadow: $ELEVATOR_6_DP;
        max-height: 100%;
    }
</style>
