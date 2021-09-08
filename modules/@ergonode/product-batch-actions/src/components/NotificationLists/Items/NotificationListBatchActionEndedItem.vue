/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <NotificationListItemTemplate
        :item="item"
        :details="true"
        @details="onShowDetails">
        <template #prepend>
            <NotificationListItemAvatar :item="item" />
            <ProductBatchActionDetailsModalGrid
                v-if="isModalVisible"
                :item="item"
                @close="onHideDetails" />
        </template>
    </NotificationListItemTemplate>
</template>

<script>

import NotificationListItemAvatar from '@Notifications/components/NotificationList/Item/NotificationListItemAvatar';
import NotificationListItemTemplate from '@Notifications/components/NotificationList/Item/NotificationListItemTemplate';

export default {
    name: 'NotificationListBatchActionEndedItem',
    components: {
        NotificationListItemAvatar,
        NotificationListItemTemplate,
        ProductBatchActionDetailsModalGrid: () => import('@ProductBatchActions/components/Modals/ProductBatchActionDetailsModalGrid'),
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            isModalVisible: false,
        };
    },
    methods: {
        onShowDetails() {
            this.isModalVisible = true;
        },
        onHideDetails() {
            this.isModalVisible = false;
        },
    },
};
</script>
