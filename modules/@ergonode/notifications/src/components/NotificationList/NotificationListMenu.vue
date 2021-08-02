/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ActionFab
        :theme="secondaryPlainTheme"
        :size="smallSize"
        :options="items"
        @input="onSelectValue">
        <template #icon="{ color }">
            <IconDots :fill-color="color" />
        </template>
        <template #option="{ option }">
            <ListElementDescription>
                <ListElementTitle
                    :size="smallSize"
                    :title="option.text" />
            </ListElementDescription>
        </template>
    </ActionFab>
</template>

<script>
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'NotificationListMenu',
    computed: {
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryPlainTheme() {
            return THEME.SECONDARY;
        },
        markAllAsRead() {
            return this.$t('@Notifications.notification.components.NotificationListMenu.markAllAsRead');
        },
        items() {
            return [
                {
                    text: this.markAllAsRead,
                    action: this.onMarkAllAssRead,
                },
            ];
        },
    },
    methods: {
        ...mapActions('notification', [
            'markAllNotificationsAsRead',
            'checkUnreadNotifications',
        ]),
        async onMarkAllAssRead() {
            await this.markAllNotificationsAsRead();
            await this.checkUnreadNotifications({});
        },
        onSelectValue(value) {
            value.action();
        },
    },
};
</script>
