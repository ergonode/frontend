/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="notification-list">
        <Preloader v-if="isFetchingData" />
        <template v-else-if="processingSection.length || notificationsSection.length">
            <NotificationListHeader />
            <NotificationListExpandingSection
                v-if="processingSection.length"
                :title="$t('@Notifications.notification.components.NotificationList.processingSectionTitle')">
                <template #body>
                    <template v-for="processing in processingSection">
                        <Component
                            v-for="notification in processing.notifications"
                            :is="processing.component"
                            :key="notification.id"
                            :item="notification" />
                    </template>
                </template>
            </NotificationListExpandingSection>
            <NotificationListSection
                v-if="notificationsSection.length"
                :title="$t('@Notifications.notification.components.NotificationList.notificationSectionTitle')">
                <template #body>
                    <template v-for="ended in notificationsSection">
                        <Component
                            v-for="notification in ended.notifications"
                            :is="ended.component"
                            :key="notification.id"
                            :item="notification" />
                    </template>
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
import NotificationListExpandingSection
    from '@Notifications/components/NotificationList/Section/NotificationListExpandingSection';
import NotificationListSection from '@Notifications/components/NotificationList/Section/NotificationListSection';
import {
    ACTION_CENTER_SECTIONS,
} from '@Notifications/defaults';
import IntersectionObserver from '@UI/components/Observers/IntersectionObserver';
import Preloader from '@UI/components/Preloader/Preloader';
import {
    mapActions,
    mapGetters,
    mapState,
} from 'vuex';

export default {
    name: 'NotificationList',
    components: {
        NotificationListExpandingSection,
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

            await Promise.all([
                this.getNotifications({}),
                this.getProcessingNotifications({}),
            ]);

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
        ...mapGetters('notification', [
            'notifications',
        ]),
        ...mapState('notification', {
            count: state => state.count,
            oldNotifications: state => state.notifications,
        }),
        processingSection() {
            return this.notifications[ACTION_CENTER_SECTIONS.PROCESSING];
        },
        notificationsSection() {
            return this.notifications[ACTION_CENTER_SECTIONS.NOTIFICATIONS];
        },
        isMoreNotifications() {
            const {
                length: listLength,
            } = this.oldNotifications;

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
            'getProcessingNotifications',
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
