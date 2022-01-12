/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="notification-list">
        <Preloader v-if="isFetchingData" />
        <template v-else-if="processingNotifications.length || notifications.length">
            <NotificationListHeader />
            <NotificationListExpandingSection
                v-if="processingNotifications.length"
                :title="$t('@Notifications.notification.components.NotificationList.processingSectionTitle')"
                :notifications-count="processingNotifications.length">
                <template #body>
                    <Component
                        v-for="notification in processingNotifications"
                        :is="notification.component"
                        :key="notification.id"
                        :item="notification" />
                </template>
            </NotificationListExpandingSection>
            <NotificationListSection
                v-if="notifications.length"
                :title="$t('@Notifications.notification.components.NotificationList.notificationSectionTitle')">
                <template #body>
                    <Component
                        v-for="notification in notifications"
                        :is="notification.component"
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
import NotificationListFooter from '@Notifications/components/NotificationList/NotificationListFooter';
import NotificationListHeader from '@Notifications/components/NotificationList/NotificationListHeader';
import NotificationListNoDataPlaceholder
    from '@Notifications/components/NotificationList/NotificationListNoDataPlaceholder';
import NotificationListExpandingSection
    from '@Notifications/components/NotificationList/Section/NotificationListExpandingSection';
import NotificationListSection from '@Notifications/components/NotificationList/Section/NotificationListSection';
import {
    AXIOS_CANCEL_TOKEN_PROCESSING_NOTIFICATION_KEY,
    MIN_NOTIFICATIONS_INTERVAL,
} from '@Notifications/defaults';
import {
    mapActions,
    mapGetters,
    mapState,
} from 'vuex';

export default {
    name: 'NotificationList',
    components: {
        NotificationListExpandingSection,
        NotificationListSection,
        NotificationListHeader,
        NotificationListFooter,
        NotificationListNoDataPlaceholder,
    },
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
    },
    async fetch() {
        if (!this.notifications.length) {
            this.isFetchingData = true;

            await this.getProcessingNotifications({});

            this.isFetchingData = false;
        }
    },
    data() {
        return {
            isFetchingData: false,
            isFetchingMoreData: false,
            timeout: null,
        };
    },
    computed: {
        ...mapGetters('notification', [
            'notifications',
        ]),
        ...mapState('notification', [
            'processingNotifications',
            'notifications',
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
    watch: {
        visible: {
            immediate: true,
            async handler() {
                if (this.visible) {
                    this.isFetchingData = true;

                    this.invalidateRequestTimeout();

                    await Promise.all([
                        this.checkUnreadNotifications({}),
                        this.getNotifications({}),
                        this.requestProcessingNotifications(),
                    ]);

                    this.isFetchingData = false;
                } else {
                    this.__setState({
                        key: 'offset',
                        value: 0,
                    });
                    this.__setState({
                        key: 'notifications',
                        value: [],
                    });
                    this.__setState({
                        key: 'requestTimeInterval',
                        value: MIN_NOTIFICATIONS_INTERVAL,
                    });

                    this.$clearCancelTokens([
                        AXIOS_CANCEL_TOKEN_PROCESSING_NOTIFICATION_KEY,
                    ]);

                    clearTimeout(this.timeout);

                    this.timeout = null;

                    this.setRequestTimeout();
                }
            },
        },
    },
    methods: {
        ...mapActions('notification', [
            'setRequestTimeout',
            'invalidateRequestTimeout',
            'getNotifications',
            'getProcessingNotifications',
            'checkUnreadNotifications',
            '__setState',
        ]),
        async onIntersect(isIntersecting) {
            if (isIntersecting) {
                this.isFetchingMoreData = true;

                await this.getNotifications({});

                this.isFetchingMoreData = false;
            }
        },
        async requestProcessingNotifications() {
            this.$clearCancelTokens([
                AXIOS_CANCEL_TOKEN_PROCESSING_NOTIFICATION_KEY,
            ]);

            clearTimeout(this.timeout);

            await this.getProcessingNotifications({
                onSuccess: () => {
                    this.timeout = setTimeout(() => {
                        this.requestProcessingNotifications();
                    }, MIN_NOTIFICATIONS_INTERVAL);
                },
            });
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
