/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <NotificationListItemPrependTemplate
        :item="item"
        :color="blueColor">
        <div class="notification-list-item-info-circle">
            <IconInfo :fill-color="blueColor" />
        </div>
    </NotificationListItemPrependTemplate>
</template>

<script>
import NotificationListItemPrependTemplate
    from '@Notifications/components/NotificationList/Item/NotificationListItemPrependTemplate';
import {
    BLUE,
} from '@UI/assets/scss/_js-variables/colors.scss';

export default {
    name: 'NotificationListItemInfo',
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
        blueColor() {
            return BLUE;
        },
        isRead() {
            return this.item.readAt !== null;
        },
    },
};
</script>

<style lang="scss" scoped>
    .notification-list-item-info-circle {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        background-color: $BLUE_LIGHT;
        border-radius: 20px;
    }
</style>
