/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="rounded-badge">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'RoundedBadge',
};
</script>

<style lang="scss" scoped>
    .rounded-badge {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 16px;
        height: 16px;
        box-sizing: border-box;
        border-radius: 999px;
    }
</style>
