/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="title-bar-actions">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'TitleBarActions',
};
</script>

<style lang="scss" scoped>
    .title-bar-actions {
        display: grid;
        grid-auto-flow: column;
        grid-column-gap: 16px;
        align-items: center;
    }
</style>
