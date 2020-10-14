/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ErrorLayout :error="error" />
</template>

<script>
import ErrorLayout from '@Core/layouts/error';

export default {
    name: 'NuxtErrorLayout',
    components: {
        ErrorLayout,
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
