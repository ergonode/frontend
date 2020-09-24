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

export default {
    name: 'NuxtLoginLayout',
    components: {
        LoginLayout,
    },
    middleware({
        store, redirect,
    }) {
        if (store.state.authentication.isLogged) {
            return redirect('/dashboard');
        }
        return null;
    },
};
</script>
