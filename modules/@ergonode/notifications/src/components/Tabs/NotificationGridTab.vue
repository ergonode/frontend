/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <div class="notifications-list">
                <Preloader v-if="isFetchingData" />
                <NotificationList v-else-if="notifications.length" />
                <NotificationListNoDataPlaceholder v-else />
            </div>
        </template>
    </CenterViewTemplate>
</template>

<script>
import {
    DATA_LIMIT,
} from '@Core/defaults/grid';
import {
    ORIENTATION,
} from '@Core/defaults/layout';
import NotificationList from '@Notifications/components/NotificationList/NotificationList';
import NotificationListNoDataPlaceholder
    from '@Notifications/components/NotificationList/NotificationListNoDataPlaceholder';
import NotificationBadge from '@UI/components/Badges/NotificationBadge';
import CenterViewTemplate from '@UI/components/Layout/Templates/CenterViewTemplate';
import Preloader from '@UI/components/Preloader/Preloader';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'NotificationGridTab',
    components: {
        CenterViewTemplate,
        Preloader,
        NotificationList,
        NotificationListNoDataPlaceholder,
    },
    // fetch() {
    //     this.isFetchingData = true;
    //
    //     await this.getNotifications({});
    //
    //     this.isFetchingData = false;
    // },
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
            return ORIENTATION.HORIZONTAL;
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

            await this.getNotifications({
                onSuccess: this.onLoadMoreNotificationsSuccess,
                onError: this.onLoadMoreNotificationsError,
            });
        },
        onLoadMoreNotificationsSuccess() {
            this.isFetchingData = false;
        },
        onLoadMoreNotificationsError() {
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
