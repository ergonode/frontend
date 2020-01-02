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
export default {
    name: 'NuxtDefaultLayout',
    components: {
        DefaultLayout: () => import('@Core/layouts/default'),
    },
};
</script>
