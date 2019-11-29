/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <App>
        <nuxt />
        <FlashMessage />
    </App>
</template>

<script>

export default {
    middleware: ['notAuthenticated'],
    components: {
        App: () => import('~/core/components/Layout/App'),
        FlashMessage: () => import('~/core/components/Alerts/FlashMessage'),
    },
};
</script>
