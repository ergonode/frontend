/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <li
        :class="['notification-element', {
            'notification-element--unread': notification.read_at === null,
        }]"
        @click="markAsRead">
        <UserAvatar
            :image-id="notification.avatar_id"
            :name="notification.author"
            :size="regularSize" />
        <span class="notification-element__message">
            <strong>{{ notification.author }}</strong>
            {{ notification.message }}
        </span>
        <span
            class="notification-element__date"
            v-text="notification.created_at" />
    </li>
</template>

<script>
import {
    GRAPHITE,
} from '@Core/assets/scss/_js-variables/colors.scss';
import {
    SIZE,
} from '@Core/defaults/theme';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'NotificationsListElement',
    components: {
        UserAvatar: () => import('@Core/components/Multimedia/UserAvatar'),
    },
    props: {
        notification: {
            type: Object,
            required: true,
        },
    },
    computed: {
        regularSize() {
            return SIZE.REGULAR;
        },
        graphiteColor() {
            return GRAPHITE;
        },
    },
    methods: {
        ...mapActions('notifications', [
            'markNotificationAsRead',
        ]),
        markAsRead() {
            const {
                id, read_at: readAt,
            } = this.notification;

            if (readAt === null) {
                this.markNotificationAsRead({
                    id,
                });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .notification-element {
        position: relative;
        z-index: $Z_INDEX_LVL_0;
        display: grid;
        align-items: center;
        grid-template-columns: max-content auto;
        grid-template-rows: max-content;
        column-gap: 12px;
        padding: 12px 16px 12px 12px;
        cursor: pointer;

        &--unread {
            background-color: $GREEN_LIGHT;
        }

        &:hover {
            z-index: $Z_INDEX_LVL_1;
            background-color: $WHITESMOKE;
            box-shadow: $ELEVATOR_2_DP;
        }

        &__message {
            grid-area: 1 / 2 / 2 / 3;
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_14_20;
            word-break: break-word;
        }

        &__date {
            grid-area: 2 / 2 / 3 / 3;
            color: $GRAPHITE;
            font: $FONT_MEDIUM_12_16;
            margin-top: 4px;
        }

        &__message, &__date {
            text-align: left;
        }

        .user-avatar {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            grid-row: 1 / 3;
            height: 100%;
        }
    }
</style>
