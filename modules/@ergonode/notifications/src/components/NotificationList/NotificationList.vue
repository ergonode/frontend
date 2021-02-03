/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="notification-list">
        <Preloader v-if="isFetchingData" />
        <template v-else-if="notifications.length">
            <NotificationListHeader />
            <NotificationListSection
                v-if="notifications.length"
                :title="$t('@Notifications.notification.components.NotificationList.title')">
                <template #body>
                    <NotificationListItem
                        v-for="notification in notifications"
                        :key="notification.id"
                        :item="notification" />
                </template>
            </NotificationListSection>
            <IntersectionObserver
                :observe-once="!isMoreNotifications"
                @intersect="onIntersect">
                <NotificationListFooter>
                    <Preloader v-show="isFetchingMoreData" />
                </NotificationListFooter>
            </IntersectionObserver>
        </template>
        <NotificationListNoDataPlaceholder v-else />
    </div>
</template>

<script>
import {
    DATA_LIMIT,
} from '@Core/defaults/grid';
import NotificationListItem from '@Notifications/components/NotificationList/Item/NotificationListItem';
import NotificationListFooter from '@Notifications/components/NotificationList/NotificationListFooter';
import NotificationListHeader from '@Notifications/components/NotificationList/NotificationListHeader';
import NotificationListNoDataPlaceholder
    from '@Notifications/components/NotificationList/NotificationListNoDataPlaceholder';
import NotificationListSection from '@Notifications/components/NotificationList/Section/NotificationListSection';
import IntersectionObserver from '@UI/components/Observers/IntersectionObserver';
import Preloader from '@UI/components/Preloader/Preloader';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'NotificationList',
    components: {
        NotificationListItem,
        NotificationListSection,
        NotificationListHeader,
        NotificationListFooter,
        IntersectionObserver,
        Preloader,
        NotificationListNoDataPlaceholder,
    },
    async fetch() {
        if (!this.notifications.length) {
            this.isFetchingData = true;

            await this.getNotifications({});

            this.isFetchingData = false;
        }
    },
    data() {
        return {
            isFetchingData: false,
            isFetchingMoreData: false,
        };
    },
    computed: {
        ...mapState('notification', [
            'notifications',
            'processingNotifications',
            'count',
        ]),
        isMoreNotifications() {
            const {
                length: listLength,
            } = this.notifications;

            return listLength
                && listLength < this.count
                && this.count > DATA_LIMIT;
        },
    },
    beforeDestroy() {
        this.__setState({
            key: 'offset',
            value: 0,
        });
        this.__setState({
            key: 'notifications',
            value: [],
        });
    },
    methods: {
        ...mapActions('notification', [
            'getNotifications',
            '__setState',
        ]),
        async onIntersect(isIntersecting) {
            if (isIntersecting) {
                this.isFetchingMoreData = true;

                await this.getNotifications({});

                this.isFetchingMoreData = false;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .notification-list {
        display: flex;
        flex: 1;
        flex-direction: column;
        padding: 24px 0;
        overflow: auto;
    }
</style>
