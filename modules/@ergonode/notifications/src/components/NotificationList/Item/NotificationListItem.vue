/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="classes"
        @mouseleave="onMouseLeave"
        @mouseenter="onMouseEnter">
        <NotificationListItemAvatar :item="item" />
        <div class="notification-list-item__description">
            <Paragraph
                class="notification-list-item__paragraph"
                :title="message">
                <template
                    v-for="slot in paragraphSlots"
                    #[slot.name]>
                    <strong
                        :key="slot.name"
                        v-text="slot.text" />
                </template>
            </Paragraph>
            <span
                class="notification-list-item__date"
                v-text="createdAt" />
        </div>
        <NotificationListItemMenu
            v-show="isHovered && menuItems.length"
            :items="menuItems"
            @input="onSelectMenuItem"
            @focus="onFocusMenu" />
    </div>
</template>

<script>
import {
    getSlots,
} from '@Core/models/stringWrapper';
import NotificationListItemAvatar from '@Notifications/components/NotificationList/Item/NotificationListItemAvatar';
import NotificationListItemMenu from '@Notifications/components/NotificationList/Item/NotificationListItemMenu';
import {
    GRAPHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';
import Paragraph from '@UI/components/Paragraph/Paragraph';
import {
    DEFAULT_DATE_TIME_FORMAT,
} from '@UI/models/calendar';
import {
    format as formatDate,
    parseISO,
} from 'date-fns';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'NotificationListItem',
    components: {
        NotificationListItemMenu,
        NotificationListItemAvatar,
        Paragraph,
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            isMenuFocused: false,
            isHovered: false,
        };
    },
    computed: {
        classes() {
            return [
                [
                    'notification-list-item',
                    {
                        'notification-list-item--hovered': this.isHovered,
                    },
                ],
            ];
        },
        graphiteColor() {
            return GRAPHITE;
        },
        createdAt() {
            return formatDate(parseISO(this.item.created_at), DEFAULT_DATE_TIME_FORMAT);
        },
        paragraphSlots() {
            return getSlots(this.item.message, '"');
        },
        message() {
            let {
                message,
            } = this.item;

            this.paragraphSlots.forEach((slot) => {
                message = message.replace(`"${slot.text}"`, `[[${slot.name}]]`);
            });

            return message;
        },
        markAsRead() {
            return this.$t('@Notifications.notification.components.NotificationListItem.markAsRead');
        },
        menuItems() {
            const items = [];

            if (this.item.read_at === null) {
                items.push({
                    text: this.markAsRead,
                    action: this.onMarkAsRead,
                });
            }

            return items;
        },
    },
    methods: {
        ...mapActions('notification', [
            'markNotificationAsRead',
        ]),
        onSelectMenuItem(value) {
            value.action();
        },
        onMarkAsRead() {
            this.markNotificationAsRead({
                id: this.item.id,
            });
        },
        onMouseLeave() {
            if (!this.isMenuFocused) {
                this.isHovered = false;
            }
        },
        onMouseEnter() {
            this.isHovered = true;
        },
        onFocusMenu(isFocused) {
            if (!isFocused) this.isHovered = false;

            this.isMenuFocused = isFocused;
        },
    },
};
</script>

<style lang="scss" scoped>
    .notification-list-item {
        position: relative;
        display: flex;
        padding: 12px 16px;
        cursor: pointer;

        &--hovered {
            z-index: $Z_INDEX_LVL_1;
            background: linear-gradient(90deg, $WHITE 0%, $WHITESMOKE 100%);
        }

        &__description {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-left: 12px;
        }

        &__paragraph {
            text-align: left;
        }

        &__date {
            color: $GRAPHITE;
            font: $FONT_MEDIUM_12_16;
            margin-top: 4px;
        }
    }
</style>
