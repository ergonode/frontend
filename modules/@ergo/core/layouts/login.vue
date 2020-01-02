/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <App>
        <slot />
        <FlashMessage />
    </App>
</template>

<script>

export default {
    name: 'LoginLayout',
    middleware: ['notAuthenticated'],
    components: {
        App: () => import('@Core/components/Layout/App'),
        FlashMessage: () => import('@Core/components/Alerts/FlashMessage'),
    },
};
</script>
