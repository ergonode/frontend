/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ErrorLayout :error="error" />
</template>

<script>

export default {
    name: 'NuxtErrorLayout',
    components: {
        ErrorLayout: () => import('@Core/layouts/error'),
    },
    props: {
        error: {
            type: [
                Object,
                Error,
            ],
            required: true,
        },
    },
};
</script>
