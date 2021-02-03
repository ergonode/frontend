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
                title="Notifications">
                <template #body>
                    <NotificationListItem
                        v-for="notification in notifications"
                        :key="notification.id"
                        :item="notification" />
                </template>
            </NotificationListSection>
            <NotificationListFooter />
        </template>
        <NotificationListNoDataPlaceholder v-else />
    </div>
</template>

<script>
import NotificationListItem from '@Notifications/components/NotificationList/Item/NotificationListItem';
import NotificationListFooter from '@Notifications/components/NotificationList/NotificationListFooter';
import NotificationListHeader from '@Notifications/components/NotificationList/NotificationListHeader';
import NotificationListNoDataPlaceholder
    from '@Notifications/components/NotificationList/NotificationListNoDataPlaceholder';
import NotificationListSection from '@Notifications/components/NotificationList/Section/NotificationListSection';
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
        };
    },
    computed: {
        ...mapState('notification', [
            'notifications',
            'processingNotifications',
        ]),
    },
    methods: {
        ...mapActions('notification', [
            'getNotifications',
        ]),
    },
};
</script>

<style lang="scss" scoped>
    .notification-list {
        display: flex;
        flex: 1;
        flex-direction: column;
        width: 100%;
        padding: 24px 0;
        overflow: auto;
    }
</style>
