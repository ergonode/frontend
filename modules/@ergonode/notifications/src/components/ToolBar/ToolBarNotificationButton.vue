/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ToolBarSelectButton>
        <template #input>
            <IconBell :fill-color="whiteColor" />
            <NotificationBadge
                v-if="unread > 0"
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
import IconBell from '@Notifications/components/Icons/IconBell';
import NotificationList from '@Notifications/components/NotificationList/NotificationList';
import {
    WHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';
import NotificationBadge from '@UI/components/Badges/NotificationBadge';
import ToolBarSelectButton from '@UI/components/ToolBar/ToolBarSelectButton';
import {
    mapState,
} from 'vuex';

export default {
    name: 'ToolBarNotificationButton',
    components: {
        NotificationList,
        ToolBarSelectButton,
        IconBell,
        NotificationBadge,
    },
    computed: {
        ...mapState('notification', [
            'unread',
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
