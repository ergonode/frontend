/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <NotificationListItemPrependTemplate
        :item="item"
        :color="yellowColor">
        <div class="notification-list-item-warning-circle">
            <IconWarning :fill-color="yellowColor" />
        </div>
    </NotificationListItemPrependTemplate>
</template>

<script>
import NotificationListItemPrependTemplate
    from '@Notifications/components/NotificationList/Item/NotificationListItemPrependTemplate';
import {
    YELLOW,
} from '@UI/assets/scss/_js-variables/colors.scss';

export default {
    name: 'NotificationListItemWarning',
    components: {
        NotificationListItemPrependTemplate,
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    computed: {
        yellowColor() {
            return YELLOW;
        },
        isRead() {
            return this.item.readAt !== null;
        },
    },
};
</script>

<style lang="scss" scoped>
    .notification-list-item-warning-circle {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        background-color: $YELLOW_LIGHT;
        border-radius: 20px;
    }
</style>
