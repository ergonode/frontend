/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridCategoryTreesPage
        :title="title"
        :buttons="getButtons"
        icon="Tree" />
</template>

<script>
export default {
    name: 'CategoryTrees',
    middleware: ['tab/redirectToCategoryTrees'],
    components: {
        GridCategoryTreesPage: () => import('~/components/Pages/GridCategoryTreesPage'),
    },
    data() {
        return {
            title: 'Category trees',
        };
    },
    computed: {
        getButtons() {
            const isCategoryTreesPath = /grid/.test(this.$route.path);

            if (!isCategoryTreesPath) return [];
            return [
                {
                    title: 'CREATE TREE',
                    color: 'success',
                    action: this.addNewTree,
                    disabled: !this.$hasAccess('CATEGORY_TREE_CREATE'),
                },
            ];
        },
    },
    methods: {
        addNewTree() {
            this.$router.push('/category-trees/tree/new');
        },
    },
};
</script>
