/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <App>
        <Content>
            <nuxt />
            <FlashMessage />
        </Content>
    </App>
</template>

<script>

export default {
    middleware: ['notAuthenticated'],
    components: {
        Content: () => import('~/components/Layout/Content'),
        FlashMessage: () => import('~/components/Alerts/FlashMessage'),
        App: () => import('~/components/Layout/App'),
    },
};
</script>
