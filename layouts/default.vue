/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <DefaultLayout>
        <nuxt />
    </DefaultLayout>
</template>

<script>
import DefaultLayout from '@Core/layouts/default';
import {
    defaultLayoutMiddleware,
} from '@Core/middleware/layout';

export default {
    name: 'NuxtDefaultLayout',
    components: {
        DefaultLayout,
    },
    async middleware(ctx) {
        await defaultLayoutMiddleware(ctx);
    },
};
</script>
