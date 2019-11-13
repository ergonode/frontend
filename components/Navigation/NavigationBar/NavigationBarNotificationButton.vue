/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <NavigationBarButton>
        <IconBell :fill-color="whiteColor" />
        <NotificationBadge
            v-show="notificationNumber > 0"
            :number="notificationNumber" />
    </NavigationBarButton>
</template>

<script>
import { WHITE } from '~/assets/scss/_variables/_colors.scss';

export default {
    name: 'NavigationBarNotificationButton',
    components: {
        NavigationBarButton: () => import('~/components/Navigation/NavigationBar/NavigationBarButton'),
        IconBell: () => import('~/components/Icon/Menu/IconBell'),
        NotificationBadge: () => import('~/components/Badges/NotificationBadge'),
    },
    data() {
        return {
            notificationNumber: 1,
        };
    },
    computed: {
        whiteColor() {
            return WHITE;
        },
    },
};
</script>
