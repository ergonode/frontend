/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <NotificationListItemTemplate :item="item">
        <template #prepend>
            <NotificationListItemError :item="item" />
        </template>
    </NotificationListItemTemplate>
</template>

<script>

import NotificationListItemError from '@Notifications/components/NotificationList/Item/NotificationListItemError';
import NotificationListItemTemplate from '@Notifications/components/NotificationList/Item/NotificationListItemTemplate';

export default {
    name: 'NotificationListExportSuccessItem',
    components: {
        NotificationListItemTemplate,
        NotificationListItemError,
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
};
</script>
