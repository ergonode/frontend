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
        flex: 1 1 auto;
        width: 100%;
        height: 0;
    }
</style>
