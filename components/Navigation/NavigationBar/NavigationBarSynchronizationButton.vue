/*
* Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
* See LICENSE for license details.
*/
<template>
    <NavigationBarButton>
        <Icon
            icon="sprite-navbar navbar-refresh"
            size="medium" />
    </NavigationBarButton>
</template>

<script>
export default {
    name: 'NavigationBarSynchronizationButton',
    components: {
        NavigationBarButton: () => import('~/components/Navigation/NavigationBar/NavigationBarButton'),
        Icon: () => import('~/components/Icon/Icon'),
    },
};
</script>
