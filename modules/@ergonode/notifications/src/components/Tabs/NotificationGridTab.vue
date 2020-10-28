/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <div class="notifications-list">
                <List v-if="notifications.length">
                    <NotificationsListElement
                        v-for="notification in notifications"
                        :key="notification.id"
                        :notification="notification" />
                    <NotificationsListFooter v-if="isMoreButtonVisible">
                        <Button
                            :title="buttonTitle"
                            @click.native="onLoadMoreNotifications">
                            <template
                                v-if="isFetchingData"
                                #append="{ color }">
                                <IconSpinner :fill-color="color" />
                            </template>
                        </Button>
                    </NotificationsListFooter>
                </List>
                <ListPlaceholder
                    v-else
                    :layout-orientation="horizontalOrientation"
                    title="Nothing to see here"
                    subtitle="Here you can see important notifications of product update"
                    :bg-url="require('@UI/assets/images/placeholders/notify.svg')" />
            </div>
        </template>
    </CenterViewTemplate>
</template>

<script>
import {
    DATA_LIMIT,
} from '@Core/defaults/grid';
import {
    LAYOUT_ORIENTATION,
} from '@Core/defaults/layout';
import NotificationsListElement from '@Notifications/components/List/NotificationsListElement';
import NotificationsListFooter from '@Notifications/components/List/NotificationsListFooter';
import Button from '@UI/components/Button/Button';
import IconSpinner from '@UI/components/Icons/Feedback/IconSpinner';
import CenterViewTemplate from '@UI/components/Layout/Templates/CenterViewTemplate';
import List from '@UI/components/List/List';
import ListPlaceholder from '@UI/components/List/ListPlaceholder';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'NotificationGridTab',
    components: {
        CenterViewTemplate,
        Button,
        List,
        IconSpinner,
        ListPlaceholder,
        NotificationsListElement,
        NotificationsListFooter,
    },
    data() {
        return {
            isFetchingData: false,
        };
    },
    computed: {
        ...mapState('notification', [
            'notifications',
            'limit',
            'count',
        ]),
        horizontalOrientation() {
            return LAYOUT_ORIENTATION.HORIZONTAL;
        },
        buttonTitle() {
            const {
                length: listLength,
            } = this.notifications;
            const notificationsNumber = this.count - listLength;

            return `LOAD MORE NOTIFICATIONS (${notificationsNumber})`;
        },
        isMoreButtonVisible() {
            const {
                length: listLength,
            } = this.notifications;

            return listLength
                && listLength < this.count
                && this.count > DATA_LIMIT;
        },
    },
    methods: {
        ...mapActions('notification', [
            '__setState',
        ]),
        async onLoadMoreNotifications() {
            this.isFetchingData = true;

            this.__setState({
                key: 'limit',
                value: this.limit + DATA_LIMIT,
            });

            await this.requestForNotifications();

            this.isFetchingData = false;
        },
    },
};
</script>

<style lang="scss">
    .notifications-list {
        width: 560px;
        padding: 24px;
    }
</style>
