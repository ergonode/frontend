/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <NotificationListItemPrependTemplate
        :item="item"
        :color="redColor">
        <div class="notification-list-item-error-circle">
            <IconError :fill-color="redColor" />
        </div>
    </NotificationListItemPrependTemplate>
</template>

<script>
import NotificationListItemPrependTemplate
    from '@Notifications/components/NotificationList/Item/NotificationListItemPrependTemplate';
import {
    RED,
} from '@UI/assets/scss/_js-variables/colors.scss';

export default {
    name: 'NotificationListItemError',
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
        redColor() {
            return RED;
        },
        isRead() {
            return this.item.readAt !== null;
        },
    },
};
</script>

<style lang="scss" scoped>
    .notification-list-item-error-circle {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        background-color: $RED_LIGHT;
        border-radius: 20px;
    }
</style>
