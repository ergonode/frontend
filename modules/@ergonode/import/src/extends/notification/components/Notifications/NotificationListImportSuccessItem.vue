/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <NotificationListItemTemplate :item="item">
        <template #prepend>
            <NotificationListItemSuccess :item="item" />
        </template>
    </NotificationListItemTemplate>
</template>

<script>

import NotificationListItemSuccess from '@Notifications/components/NotificationList/Item/NotificationListItemSuccess';
import NotificationListItemTemplate from '@Notifications/components/NotificationList/Item/NotificationListItemTemplate';

export default {
    name: 'NotificationListImportSuccessItem',
    components: {
        NotificationListItemTemplate,
        NotificationListItemSuccess,
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
};
</script>
