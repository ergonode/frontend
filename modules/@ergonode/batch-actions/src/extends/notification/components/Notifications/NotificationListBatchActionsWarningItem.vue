/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <NotificationListItemTemplate :item="item">
        <template #prepend>
            <NotificationListItemWarning :item="item" />
        </template>
    </NotificationListItemTemplate>
</template>

<script>

import NotificationListItemTemplate from '@Notifications/components/NotificationList/Item/NotificationListItemTemplate';
import NotificationListItemWarning from '@Notifications/components/NotificationList/Item/NotificationListItemWarning';

export default {
    name: 'NotificationListBatchActionsWarningItem',
    components: {
        NotificationListItemTemplate,
        NotificationListItemWarning,
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
};
</script>
