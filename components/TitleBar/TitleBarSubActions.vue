/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="title-bar-sub-actions">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'TitleBarSubActions',
};
</script>

<style lang="scss" scoped>
    .title-bar-sub-actions {
        display: grid;
        grid-auto-flow: column;
        grid-column-gap: 8px;
        align-items: center;
    }
</style>
