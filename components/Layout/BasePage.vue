/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="base-page">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'BasePage',
};
</script>

<style lang="scss" scoped>
    .base-page {
        position: relative;
        display: flex;
        flex: 1;
        flex-direction: column;
        background-color: $WHITESMOKE;
        overflow: hidden;
    }
</style>
