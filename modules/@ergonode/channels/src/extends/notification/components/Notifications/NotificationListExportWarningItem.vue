/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <!--    <NotificationListItem :item="item" />-->
    <div>
        {{ item.status }}
    </div>
</template>

<script>
import NotificationListItem from '@Notifications/components/NotificationList/Item/NotificationListItem';

// ended_at: "2021-02-03 15:16:47+01"
// errors: 0
// id: "a24642f8-313d-4f65-bf58-7fae696c52a1"
// items: 1107
// name: "test123"
// processed: 1107
// started_at: "2021-02-03 15:15:59+01"
// status: "ENDED"

export default {
    name: 'NotificationListExportSuccessItem',
    components: {
        NotificationListItem,
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
};
</script>
