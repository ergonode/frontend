/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #content>
            <VerticalFixedScroll>
                <VerticalCenteredView>
                    <div class="notifications-list">
                        <List v-if="notifications.length">
                            <NotificationsListElement
                                v-for="notification in notifications"
                                :key="notification.id"
                                :notification="notification" />
                            <NotificationsListFooter v-if="isMoreButtonVisible">
                                <Loader v-if="!$isLoaded('moreNotifications')" />
                                <Button
                                    :title="buttonTitle"
                                    @click.native="onLoadMoreNotifications" />
                            </NotificationsListFooter>
                        </List>
                        <ListPlaceholder
                            v-else
                            :layout-orientation="horizontalOrientation"
                            title="Nothing to see here"
                            subtitle="Here you can see important notifications of product update"
                            bg-url="placeholders/notify.svg" />
                    </div>
                </VerticalCenteredView>
            </VerticalFixedScroll>
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { LayoutOrientation } from '~/defaults/layout';
import { DATA_LIMIT } from '~/defaults/grid';
import ResponsiveCenteredViewTemplate from '~/core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import VerticalFixedScroll from '~/core/components/Layout/Scroll/VerticalFixedScroll';
import VerticalCenteredView from '~/core/components/Layout/VerticalCenteredView';

export default {
    name: 'AttributeGridTab',
    components: {
        VerticalCenteredView,
        VerticalFixedScroll,
        ResponsiveCenteredViewTemplate,
        Loader: () => import('~/core/components/Loader/Loader'),
        Button: () => import('~/core/components/Buttons/Button'),
        List: () => import('~/core/components/List/List'),
        NotificationsListElement: () => import('~/components/List/Notifications/NotificationsListElement'),
        NotificationsListFooter: () => import('~/components/List/Notifications/NotificationsListFooter'),
        ListPlaceholder: () => import('~/core/components/List/ListPlaceholder'),
    },
    computed: {
        ...mapState('notifications', {
            notifications: (state) => state.notifications,
            limit: (state) => state.limit,
            count: (state) => state.count,
        }),
        horizontalOrientation() {
            return LayoutOrientation.HORIZONTAL;
        },
        buttonTitle() {
            const { length: listLength } = this.notifications;
            const notificationsNumber = this.count - listLength;

            return `LOAD MORE NOTIFICATIONS (${notificationsNumber})`;
        },
        isMoreButtonVisible() {
            const { length: listLength } = this.notifications;

            return listLength
                && listLength < this.count
                && this.count > DATA_LIMIT;
        },
    },
    methods: {
        ...mapActions('notifications', [
            'setNotificationsLimit',
            'requestForNotifications',
        ]),
        onLoadMoreNotifications() {
            this.setNotificationsLimit(this.limit + DATA_LIMIT);
            this.requestForNotifications();
        },
    },
};
</script>

<style lang="scss">
    .notifications-list {
        width: 560px;

        .list {
            padding: 3px;
        }
    }
</style>
