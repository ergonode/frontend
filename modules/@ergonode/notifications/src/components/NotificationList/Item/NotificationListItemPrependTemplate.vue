/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="notification-list-item-prepend-template">
        <div
            v-if="!isRead"
            class="notification-list-item-prepend-template__not-read-badge"
            :style="badgeStyles" />
        <slot />
    </div>
</template>

<script>
import {
    GRAPHITE_DARK,
} from '@UI/assets/scss/_js-variables/colors.scss';

export default {
    name: 'NotificationListItemPrependTemplate',
    props: {
        /**
         * Notification model
         */
        item: {
            type: Object,
            required: true,
        },
        /**
         * Color of badge
         */
        color: {
            type: String,
            default: GRAPHITE_DARK,
            validator: value => /^#([A-Fa-f0-9]{6})$/.test(value),
        },
    },
    computed: {
        badgeStyles() {
            return {
                backgroundColor: this.color,
            };
        },
        isRead() {
            return this.item.readAt !== null;
        },
    },
};
</script>

<style lang="scss" scoped>
.notification-list-item-prepend-template {
    position: relative;

    &__not-read-badge {
        position: absolute;
        top: 0;
        left: 0;
        width: 8px;
        height: 8px;
        border: $BORDER_2_WHITE;
        border-radius: 8px;
    }
}
</style>
