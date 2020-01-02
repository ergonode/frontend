/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <NavigationBarSelectButton>
        <template #input>
            <IconBell :fill-color="whiteColor" />
            <NotificationBadge
                v-if="notifications.length > 0"
                :number="notifications.length" />
        </template>
        <template #selectContent>
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
                    subtitle="This is where you will see
                    important notifications for product updates"
                    :bg-url="require('@Core/assets/images/placeholders/notify.svg')" />
            </div>
        </template>
    </NavigationBarSelectButton>
</template>

<script>
import { mapState } from 'vuex';
import { WHITE } from '@Core/assets/scss/_variables/_colors.scss';

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
            notifications: (state) => state.notifications,
        }),
        whiteColor() {
            return WHITE;
        },
    },
    methods: {
        navigateToAllNotifications() {
            this.$router.push({ name: 'notifications-grid' });
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
