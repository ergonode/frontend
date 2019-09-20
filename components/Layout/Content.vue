/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <main class="content">
        <slot />
    </main>
</template>

<script>
export default {
    name: 'Content',
};
</script>

<style lang="scss" scoped>
    .content {
        display: flex;
        flex: 1;
        overflow: hidden;
    }
</style>
