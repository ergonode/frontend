/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <NavigationBarButton>
        <IconBell :fill-color="whiteColor" />
    </NavigationBarButton>
</template>

<script>
import { WHITE } from '~/assets/scss/_variables/_colors.scss';

export default {
    name: 'NavigationBarNotificationButton',
    components: {
        NavigationBarButton: () => import('~/components/Navigation/NavigationBar/NavigationBarButton'),
        IconBell: () => import('~/components/Icon/Menu/IconBell'),
    },
    computed: {
        whiteColor() {
            return WHITE;
        },
    },
};
</script>
