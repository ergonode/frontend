/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <main class="app-main">
        <slot />
    </main>
</template>

<script>
export default {
    name: 'AppMain',
};
</script>

<style lang="scss" scoped>
    .app-main {
        width: 100%;
        height: 100vh;
        padding: 48px 0 0;
        box-sizing: border-box;
    }
</style>
