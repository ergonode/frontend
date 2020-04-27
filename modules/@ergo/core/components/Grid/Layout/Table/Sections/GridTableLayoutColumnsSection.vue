/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="columns-section">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'GridTableLayoutColumnsSection',
};
</script>

<style lang="scss" scoped>
    .columns-section {
        position: relative;
        display: grid;
        flex: 1 1 auto;
    }
</style>
