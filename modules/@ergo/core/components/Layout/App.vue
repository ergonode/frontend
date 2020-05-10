/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="app">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'App',
};
</script>

<style lang="scss" scoped>
    .app {
        position: relative;
        display: flex;
        height: 100vh;
    }
</style>
