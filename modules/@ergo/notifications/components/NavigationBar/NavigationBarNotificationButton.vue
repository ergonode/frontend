/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <NavigationBarSelectButton
        @focus="onFocus">
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
                <ListPlaceholder
                    v-else
                    title="Nothing to see here"
                    subtitle="Here you can see important notifications of product update"
                    :bg-url="require('@Core/assets/images/placeholders/notify.svg')" />
            </div>
        </template>
    </NavigationBarSelectButton>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { WHITE } from '@Core/assets/scss/_js-variables/colors.scss';

export default {
    name: 'NavigationBarNotificationButton',
    components: {
        NavigationBarSelectButton: () => import('@Core/components/NavigationBar/NavigationBarSelectButton'),
        IconBell: () => import('@Core/components/Icons/Menu/IconBell'),
        NotificationBadge: () => import('@Core/components/Badges/NotificationBadge'),
        Button: () => import('@Core/components/Buttons/Button'),
        List: () => import('@Core/components/List/List'),
        NotificationsListElement: () => import('@Notifications/components/List/NotificationsListElement'),
        NotificationsListFooter: () => import('@Notifications/components/List/NotificationsListFooter'),
        ListPlaceholder: () => import('@Core/components/List/ListPlaceholder'),
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
            this.$router.push({ name: 'notifications-grid' });
        },
        onFocus({ focus, isClickedInsideMenu }) {
            if (focus && !isClickedInsideMenu) {
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
