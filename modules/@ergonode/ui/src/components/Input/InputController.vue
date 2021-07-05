/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="input-controller">
        <slot />
    </div>
</template>

<script>

export default {
    name: 'InputController',
};
</script>

<style lang="scss" scoped>
    .input-controller {
        z-index: $Z_INDEX_LVL_2;
        display: flex;
        flex: 1;
        align-items: flex-start;
    }
</style>
