/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <NotificationListItemPrependTemplate
        :item="item"
        :color="greenColor">
        <div class="notification-list-item-success-circle">
            <IconMark :fill-color="greenColor" />
        </div>
    </NotificationListItemPrependTemplate>
</template>

<script>
import NotificationListItemPrependTemplate
    from '@Notifications/components/NotificationList/Item/NotificationListItemPrependTemplate';
import {
    GREEN,
} from '@UI/assets/scss/_js-variables/colors.scss';

export default {
    name: 'NotificationListItemSuccess',
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
        greenColor() {
            return GREEN;
        },
        isRead() {
            return this.item.readAt !== null;
        },
    },
};
</script>

<style lang="scss" scoped>
    .notification-list-item-success-circle {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        background-color: $GREEN_LIGHT;
        border-radius: 20px;
    }
</style>
