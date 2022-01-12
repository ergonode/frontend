/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <LoginLayout>
        <nuxt />
    </LoginLayout>
</template>

<script>
import LoginLayout from '@Authentication/layouts/login';
import {
    loginLayoutMiddleware,
} from '@Authentication/middleware/layout';

export default {
    name: 'NuxtLoginLayout',
    components: {
        LoginLayout,
    },
    middleware(ctx) {
        loginLayoutMiddleware(ctx);
    },
};
</script>
