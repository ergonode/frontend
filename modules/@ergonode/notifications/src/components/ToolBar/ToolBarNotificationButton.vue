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
                    :bg-url="require('@UI/assets/images/placeholders/notify.svg')" />
            </div>
        </template>
    </ToolBarSelectButton>
</template>

<script>
import IconBell from '@Notifications/components/Icons/IconBell';
import NotificationsListElement from '@Notifications/components/List/NotificationsListElement';
import NotificationsListFooter from '@Notifications/components/List/NotificationsListFooter';
import NotificationsListPlaceholder from '@Notifications/components/List/NotificationsListPlaceholder';
import {
    ROUTE_NAME,
} from '@Notifications/config/routes';
import {
    WHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';
import NotificationBadge from '@UI/components/Badges/NotificationBadge';
import Button from '@UI/components/Button/Button';
import List from '@UI/components/List/List';
import ToolBarSelectButton from '@UI/components/ToolBar/ToolBarSelectButton';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ToolBarNotificationButton',
    components: {
        ToolBarSelectButton,
        IconBell,
        NotificationBadge,
        Button,
        List,
        NotificationsListElement,
        NotificationsListFooter,
        NotificationsListPlaceholder,
    },
    computed: {
        ...mapState('notification', {
            notifications: state => state.notifications,
            notificationsCount: state => state.count,
        }),
        whiteColor() {
            return WHITE;
        },
    },
    methods: {
        ...mapActions('notification', [
            'requestForNotifications',
        ]),
        navigateToAllNotifications() {
            this.$router.push({
                name: ROUTE_NAME.NOTIFICATIONS_GRID,
            });
        },
        onFocus(isFocused) {
            if (isFocused) {
                this.requestForNotifications({});
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
