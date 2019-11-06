/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridCategoryPage
        title="Categories"
        icon="Category" />
</template>
<script>
export default {
    name: 'Categories',
    middleware: ['tab/redirectToCategoryGrid'],
    components: {
        GridCategoryPage: () => import('~/components/Pages/GridCategoryPage'),
    },
};
</script>
