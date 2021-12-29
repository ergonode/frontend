/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="footer-actions">
        <slot />
    </div>
</template>

<script>

export default {
    name: 'FooterActions',
};
</script>

<style lang="scss" scoped>
    .footer-actions {
        display: flex;
        flex: 1;
        justify-content: flex-end;
    }
</style>
