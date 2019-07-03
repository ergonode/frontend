/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <NavigationBarButton>
        <NuxtLink
            :to="{ path: '/dashboard' }">
            <img
                class="part__element"
                src="~assets/images/logo.svg"
                alt="ergonode"
                title="ergonode">
        </NuxtLink>
    </NavigationBarButton>
</template>

<script>
export default {
    name: 'NavigationBarDashboardButton',
    components: {
        NavigationBarButton: () => import('~/components/Navigation/NavigationBar/NavigationBarButton'),
    },
};
</script>
