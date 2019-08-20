/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <PageWrapper>
        <component
            :is="errorPage"
            :error="error" />
    </PageWrapper>
</template>

<script>

export default {
    name: 'NuxtError',
    components: {
        PageWrapper: () => import('~/components/Layout/PageWrapper'),
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
                return () => import('~/components/Error/403');
            case 404:
                return () => import('~/components/Error/404');
            default:
                return () => import('~/components/Error/500');
            }
        },
    },
};
</script>
