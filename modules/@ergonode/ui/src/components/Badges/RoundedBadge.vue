/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="rounded-badge">
        <!--
            @slot default slot, anything you fit inside rounded badge
        -->
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
        flex: 0 0 auto;
        justify-content: center;
        align-items: center;
        min-width: 16px;
        height: 16px;
        padding: 0 4px;
        box-sizing: border-box;
        border-radius: 999px;
    }
</style>
