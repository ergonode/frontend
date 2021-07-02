/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="input-image-controller">
        <slot />
    </div>
</template>

<script>

export default {
    name: 'InputImageController',
};
</script>

<style lang="scss" scoped>
    .input-image-controller {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }
</style>
