/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <NavigationBarButton>
        <IconProcessing fill-color="#fff" />
    </NavigationBarButton>
</template>

<script>
export default {
    name: 'NavigationBarSynchronizationButton',
    components: {
        NavigationBarButton: () => import('~/components/Navigation/NavigationBar/NavigationBarButton'),
        IconProcessing: () => import('~/components/Icon/Others/IconProcessing'),
    },
};
</script>
