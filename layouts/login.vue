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
import LoginLayout from '@Core/layouts/login';
import {
    loginLayoutMiddleware,
} from '@Core/middleware/layouts';

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
