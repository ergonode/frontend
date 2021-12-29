/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="notification-list-section-body">
        <slot name="body" />
    </div>
</template>

<script>
export default {
    name: 'NotificationListSectionBody',
};
</script>

<style lang="scss" scoped>
    .notification-list-section-body {
        display: flex;
        flex-direction: column;
    }
</style>
