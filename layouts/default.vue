/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <DefaultLayout>
        <nuxt />
    </DefaultLayout>
</template>

<script>
import DefaultLayout from '@Core/layouts/default';

export default {
    name: 'NuxtDefaultLayout',
    components: {
        DefaultLayout,
    },
    async middleware({
        store,
        redirect,
    }) {
        const {
            authentication,
        } = store.state;

        if (!authentication.isLogged) {
            return redirect('/');
        }

        return null;
    },
};
</script>
