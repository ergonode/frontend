/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ToolBarSelectButton @focus="onFocus">
        <template #input>
            <IconBell :fill-color="whiteColor" />
            <NotificationBadge
                v-if="notificationsCount > 0"
                :number="notificationsCount" />
        </template>
        <template #dropdown>
            <div class="notifications-dropdown">
                <List v-if="notifications.length">
                    <NotificationsListElement
                        v-for="notification in notifications"
                        :key="notification.id"
                        :notification="notification" />
                    <NotificationsListFooter>
                        <Button
                            title="SEE ALL NOTIFICATIONS"
                            @click.native="navigateToAllNotifications" />
                    </NotificationsListFooter>
                </List>
                <NotificationsListPlaceholder
                    v-else
                    title="Nothing to see here"
                    subtitle="Here you can see important notifications of product update"
                    :bg-url="require('@Core/assets/images/placeholders/notify.svg')" />
            </div>
        </template>
    </ToolBarSelectButton>
</template>

<script>
import {
    WHITE,
} from '@Core/assets/scss/_js-variables/colors.scss';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ToolBarNotificationButton',
    components: {
        ToolBarSelectButton: () => import('@Core/components/ToolBar/ToolBarSelectButton'),
        IconBell: () => import('@Core/components/Icons/Menu/IconBell'),
        NotificationBadge: () => import('@Core/components/Badges/NotificationBadge'),
        Button: () => import('@Core/components/Button/Button'),
        List: () => import('@Core/components/List/List'),
        NotificationsListElement: () => import('@Notifications/components/List/NotificationsListElement'),
        NotificationsListFooter: () => import('@Notifications/components/List/NotificationsListFooter'),
        NotificationsListPlaceholder: () => import('@Notifications/components/List/NotificationsListPlaceholder'),
    },
    computed: {
        ...mapState('notifications', {
            notifications: state => state.notifications,
            notificationsCount: state => state.count,
        }),
        whiteColor() {
            return WHITE;
        },
    },
    methods: {
        ...mapActions('notifications', [
            'requestForNotifications',
        ]),
        navigateToAllNotifications() {
            this.$router.push({
                name: 'notifications-grid',
            });
        },
        onFocus(isFocused) {
            if (isFocused) {
                this.requestForNotifications();
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .notifications-dropdown {
        display: flex;
        flex: 1;
        flex-direction: column;
        width: 400px;
        height: calc(100vh - 48px);
    }
</style>
