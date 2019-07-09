/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="grid-items-container">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'TemplateGridItemsContainer',
};
</script>

<style lang="scss" scoped>
    .grid-items-container {
        position: absolute;
        top: 0;
        display: grid;
        width: 100%;
        height: auto;
    }
</style>
