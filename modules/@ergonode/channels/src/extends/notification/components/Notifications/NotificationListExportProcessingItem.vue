/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <NotificationListItemTemplate :item="item">
        <template #prepend>
            <CircleProgressBar
                :radius="radius"
                :progress="progress"
                :stroke="stroke" />
        </template>
    </NotificationListItemTemplate>
</template>

<script>
import NotificationListItemTemplate from '@Notifications/components/NotificationList/Item/NotificationListItemTemplate';

export default {
    name: 'NotificationListExportProcessingItem',
    components: {
        NotificationListItemTemplate,
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    computed: {
        radius() {
            return 20;
        },
        progress() {
            if (this.item.processed === 0 || this.item.items === 0) {
                return 0;
            }

            return (this.item.processed / this.item.items) * 100;
        },
        stroke() {
            return 2;
        },
    },
};
</script>
