/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="grid-page-selector-arrows-panel">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'GridPageArrowsPanel',
};
</script>

<style lang="scss" scoped>
    .grid-page-selector-arrows-panel {
        display: flex;
        align-items: center;
    }
</style>
