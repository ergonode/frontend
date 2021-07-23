/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <Component
            v-if="error.status !== 401"
            :is="errorPage"
            :error="error" />
    </Page>
</template>

<script>

export default {
    name: 'ErrorLayout',
    props: {
        /**
         * Validation error
         */
        error: {
            type: [
                Object,
                Error,
            ],
            required: true,
        },
    },
    computed: {
        errorPage() {
            switch (this.error.statusCode) {
            case 403:
                return () => import('@UI/components/Layout/Errors/403');
            case 404:
                return () => import('@UI/components/Layout/Errors/404');
            default:
                return () => import('@UI/components/Layout/Errors/500');
            }
        },
    },
    created() {
        if (this.error.status === 401) {
            this.$router.push('/');
        }
    },
};
</script>
