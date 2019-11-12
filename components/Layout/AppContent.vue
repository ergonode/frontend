/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <main class="app-content">
        <slot />
    </main>
</template>

<script>
export default {
    name: 'AppContent',
};
</script>

<style lang="scss" scoped>
    .app-content {
        display: flex;
        flex: 1;
        overflow: hidden;
        margin-top: 48px;
    }
</style>
