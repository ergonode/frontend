/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <NavigationBarButton>
        <IconBell fill-color="#fff" />
    </NavigationBarButton>
</template>

<script>
export default {
    name: 'NavigationBarNotificationButton',
    components: {
        NavigationBarButton: () => import('~/components/Navigation/NavigationBar/NavigationBarButton'),
        IconBell: () => import('~/components/Icon/Menu/IconBell'),
    },
};
</script>
