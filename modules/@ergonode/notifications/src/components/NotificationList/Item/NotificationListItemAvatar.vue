/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <NotificationListItemPrependTemplate :item="item">
        <UserFabAvatar
            :avatar-id="avatarId"
            :user-id="item.user_id"
            :name="item.author"
            :size="regularSize" />
    </NotificationListItemPrependTemplate>
</template>

<script>
import UserFabAvatar from '@Core/components/Multimedia/UserFabAvatar';
import {
    SIZE,
} from '@Core/defaults/theme';
import NotificationListItemPrependTemplate
    from '@Notifications/components/NotificationList/Item/NotificationListItemPrependTemplate';

export default {
    name: 'NotificationListItemAvatar',
    components: {
        UserFabAvatar,
        NotificationListItemPrependTemplate,
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    computed: {
        regularSize() {
            return SIZE.REGULAR;
        },
        avatarId() {
            return this.item.avatar_filename
                ? this.item.user_id
                : null;
        },
        isRead() {
            return this.item.readAt !== null;
        },
    },
};
</script>
