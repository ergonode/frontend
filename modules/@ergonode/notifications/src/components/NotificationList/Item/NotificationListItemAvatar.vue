/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="notification-list-item-avatar">
        <div
            v-if="!isRead"
            class="notification-list-item-avatar__not-read-badge" />
        <UserFabAvatar
            :avatar-id="avatarId"
            :user-id="item.user_id"
            :name="item.author"
            :size="regularSize" />
    </div>
</template>

<script>
import UserFabAvatar from '@Core/components/Multimedia/UserFabAvatar';
import {
    SIZE,
} from '@Core/defaults/theme';

export default {
    name: 'NotificationListItemAvatar',
    components: {
        UserFabAvatar,
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
            return this.item.read_at !== null;
        },
    },
};
</script>

<style lang="scss" scoped>
    .notification-list-item-avatar {
        position: relative;

        &__not-read-badge {
            position: absolute;
            top: 0;
            left: 0;
            width: 8px;
            height: 8px;
            border: $BORDER_2_WHITE;
            border-radius: 8px;
            background-color: $GRAPHITE_DARK;
        }
    }
</style>
