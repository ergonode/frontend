/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ToolBarSelectButton>
        <template #input>
            <IconBell :fill-color="whiteColor" />
            <NotificationWarningBadge
                v-if="isWaitingForDecision"
                :floating="{ top: '8px', right: '8px'}" />
            <NotificationBadge
                v-else-if="unread > 0"
                :number="unread" />
        </template>
        <template #dropdown="{ visible }">
            <div class="notifications-dropdown">
                <NotificationList :visible="visible" />
            </div>
        </template>
    </ToolBarSelectButton>
</template>

<script>
import NotificationWarningBadge
    from '@Notifications/components/Badges/NotificationWarningBadge/NotificationWarningBadge';
import IconBell from '@Notifications/components/Icons/IconBell';
import NotificationList from '@Notifications/components/NotificationList/NotificationList';
import {
    WHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';
import {
    mapState,
} from 'vuex';

export default {
    name: 'ToolBarNotificationButton',
    components: {
        NotificationWarningBadge,
        NotificationList,
        IconBell,
    },
    computed: {
        ...mapState('notification', [
            'unread',
            'isWaitingForDecision',
        ]),
        whiteColor() {
            return WHITE;
        },
    },
};
</script>

<style lang="scss" scoped>
    .notifications-dropdown {
        display: flex;
        width: 400px;
        height: calc(100vh - 48px);
    }
</style>
