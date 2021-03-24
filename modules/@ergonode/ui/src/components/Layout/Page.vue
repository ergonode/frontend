/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="page">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'Page',
};
</script>

<style lang="scss" scoped>
    .page {
        position: relative;
        display: flex;
        flex: 1;
        flex-direction: column;
        width: 100%;
        height: 100%;
        background-color: $WHITESMOKE;
        overflow: hidden;
    }
</style>
