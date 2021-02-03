/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="notification-list-footer">
        <Button
            :title="$t('@Notifications.notification.components.NotificationListFooter.seeAllActionsTitle')"
            @click.native="onNavigateToAllNotifications" />
    </div>
</template>

<script>
import {
    ROUTE_NAME,
} from '@Notifications/config/routes';
import Button from '@UI/components/Button/Button';

export default {
    name: 'NotificationListFooter',
    components: {
        Button,
    },
    methods: {
        onNavigateToAllNotifications() {
            this.$router.push({
                name: ROUTE_NAME.NOTIFICATIONS_GRID,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    .notification-list-footer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 8px 0;
    }
</style>
