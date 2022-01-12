/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="product-collection">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'ProductCollection',
};
</script>

<style lang="scss" scoped>
    .product-collection {
        display: grid;
        grid-auto-flow: row;
        row-gap: 24px;
        width: 1008px;
    }
</style>
