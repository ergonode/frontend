/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="list-scrollable-container">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'ListScrollableContainer',
};
</script>

<style lang="scss" scoped>
    .list-scrollable-container {
        height: 0;

        &::after {
            position: absolute;
            width: 100%;
            height: 40px;
            content: "";
        }
    }
</style>
