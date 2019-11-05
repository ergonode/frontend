/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridCategoryTreesPage
        title="Category trees"
        icon="Tree" />
</template>

<script>
export default {
    name: 'CategoryTrees',
    middleware: ['tab/redirectToCategoryTrees'],
    components: {
        GridCategoryTreesPage: () => import('~/components/Pages/GridCategoryTreesPage'),
    },
};
</script>
