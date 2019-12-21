/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <Component
            :is="errorPage"
            :error="error" />
    </Page>
</template>

<script>

export default {
    name: 'NuxtError',
    components: {
        Page: () => import('@Core/components/Layout/Page'),
    },
    props: {
        error: {
            type: [Object, Error],
            required: true,
        },
    },
    computed: {
        errorPage() {
            switch (this.error.statusCode) {
            case 403:
                return () => import('@Core/components/Layout/Errors/403');
            case 404:
                return () => import('@Core/components/Layout/Errors/404');
            default:
                return () => import('@Core/components/Layout/Errors/500');
            }
        },
    },
};
</script>
