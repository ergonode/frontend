/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BasePage>
        <Component
            :is="errorPage"
            :error="error" />
    </BasePage>
</template>

<script>

export default {
    name: 'NuxtError',
    components: {
        BasePage: () => import('~/components/Layout/BasePage'),
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
                return () => import('~/components/Errors/403');
            case 404:
                return () => import('~/components/Errors/404');
            default:
                return () => import('~/components/Errors/500');
            }
        },
    },
};
</script>
