/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <LoginLayout>
        <nuxt />
    </LoginLayout>
</template>

<script>

export default {
    name: 'NuxtLoginLayout',
    middleware: ['notAuthenticated'],
    components: {
        LoginLayout: () => import('@Core/layouts/login'),
    },
};
</script>
