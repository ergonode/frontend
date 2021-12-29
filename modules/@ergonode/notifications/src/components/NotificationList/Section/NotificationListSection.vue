/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="notification-list-section">
        <NotificationListSectionHeader :title="title">
            <template #append>
                <slot name="appendHeader" />
            </template>
        </NotificationListSectionHeader>
        <NotificationListSectionBody>
            <template #body>
                <slot name="body" />
            </template>
        </NotificationListSectionBody>
    </div>
</template>

<script>
import NotificationListSectionBody
    from '@Notifications/components/NotificationList/Section/NotificationListSectionBody';
import NotificationListSectionHeader from '@Notifications/components/NotificationList/Section/NotificationListSectionHeader';

export default {
    name: 'NotificationListSection',
    components: {
        NotificationListSectionBody,
        NotificationListSectionHeader,
    },
    props: {
        title: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="scss" scoped>
    .notification-list-section {
        display: flex;
        flex-direction: column;
    }
</style>
