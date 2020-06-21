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
    components: {
        LoginLayout: () => import('@Core/layouts/login'),
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
