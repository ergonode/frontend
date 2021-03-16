/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <NotificationListItemTemplate :item="item">
        <template #prepend>
            <NotificationListItemAvatar :item="item" />
        </template>
    </NotificationListItemTemplate>
</template>

<script>

import NotificationListItemAvatar from '@Notifications/components/NotificationList/Item/NotificationListItemAvatar';
import NotificationListItemTemplate from '@Notifications/components/NotificationList/Item/NotificationListItemTemplate';

export default {
    name: 'NotificationListItem',
    components: {
        NotificationListItemAvatar,
        NotificationListItemTemplate,
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
};
</script>
