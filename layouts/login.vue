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
        App: () => import('~/components/Layout/App'),
        FlashMessage: () => import('~/components/Alerts/FlashMessage'),
    },
};
</script>
