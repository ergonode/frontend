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
                    <NotificationListElement
                        v-for="notification in notifications"
                        :key="notification.id"
                        :notification="notification" />
                    <NotificationListFooter>
                        <BaseButton
                            title="SEE ALL NOTIFICATIONS"
                            @click.native="navigateToAllNotifications" />
                    </NotificationListFooter>
                </List>
                <GridListPlaceholder
                    v-else
                    title="Nothing to see here"
                    subtitle="This is where you will see
                    important notifications for product updates"
                    bg-url="placeholders/notify.svg" />
            </div>
        </template>
    </NavigationBarSelectButton>
</template>

<script>
import { mapState } from 'vuex';
import { WHITE } from '~/assets/scss/_variables/_colors.scss';

export default {
    name: 'NavigationBarNotificationButton',
    components: {
        NavigationBarSelectButton: () => import('~/components/Navigation/NavigationBar/NavigationBarSelectButton'),
        IconBell: () => import('~/components/Icon/Menu/IconBell'),
        NotificationBadge: () => import('~/components/Badges/NotificationBadge'),
        BaseButton: () => import('~/components/Buttons/BaseButton'),
        List: () => import('~/components/List/List'),
        NotificationListElement: () => import('~/components/List/Notifications/NotificationListElement'),
        NotificationListFooter: () => import('~/components/List/Notifications/NotificationListFooter'),
        GridListPlaceholder: () => import('~/components/Placeholder/GridListPlaceholder'),
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
        height: calc(100vh - #{$toolBarHeight});
    }
</style>
