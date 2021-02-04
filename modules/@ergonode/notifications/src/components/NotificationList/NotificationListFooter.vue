/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="notification-list-footer">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'NotificationListFooter',
};
</script>

<style lang="scss" scoped>
    .notification-list-footer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-bottom: 8px;
    }
</style>
