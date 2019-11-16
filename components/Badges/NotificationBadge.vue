/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <RoundedBaseBadge class="notification-badge">
        <BadgeLabel :label="info" />
    </RoundedBaseBadge>
</template>

<script>
import RoundedBaseBadge from '~/components/Badges/RoundedBaseBadge';
import BadgeLabel from '~/components/Badges/BadgeLabel';

export default {
    name: 'NotificationBadge',
    components: {
        RoundedBaseBadge,
        BadgeLabel,
    },
    props: {
        number: {
            type: Number,
            required: true,
            validator: (value) => value > 0,
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
