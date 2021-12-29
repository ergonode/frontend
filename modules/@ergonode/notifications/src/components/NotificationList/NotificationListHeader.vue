/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="notification-list-header">
        <span v-text="$t('@Notifications.notification.components.NotificationListHeader.title')" />
        <NotificationListMenu />
    </div>
</template>

<script>
import NotificationListMenu from '@Notifications/components/NotificationList/NotificationListMenu';

export default {
    name: 'NotificationListHeader',
    components: {
        NotificationListMenu,
    },
};
</script>

<style lang="scss" scoped>
    .notification-list-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 16px;
        color: $GRAPHITE_DARK;
        font: $FONT_SEMI_BOLD_24_32;
    }
</style>
