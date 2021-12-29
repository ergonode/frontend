/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <RoundedBadge class="notification-badge">
        <BadgeLabel :label="info" />
    </RoundedBadge>
</template>

<script>

export default {
    name: 'NotificationBadge',
    props: {
        /**
         * Number of unread notifications
         */
        number: {
            type: Number,
            required: true,
            validator: value => value > 0,
        },
    },
    computed: {
        info() {
            return this.number > 99 ? '+99' : this.number;
        },
    },
};
</script>

<style lang="scss" scoped>
    .notification-badge {
        position: absolute;
        top: 8px;
        right: 8px;
        background-color: $RED;
        color: $WHITE;
    }
</style>
