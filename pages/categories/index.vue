/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridCategoryPage
        :title="title"
        :buttons="getButtons"
        icon="Category" />
</template>
<script>
export default {
    name: 'Categories',
    middleware: ['tab/redirectToCategoryGrid'],
    components: {
        GridCategoryPage: () => import('~/components/Pages/GridCategoryPage'),
    },
    data() {
        return {
            title: 'Categories',
        };
    },
    computed: {
        getButtons() {
            const isCategoryPath = /grid/.test(this.$route.path);

            if (!isCategoryPath) return [];
            return [
                {
                    title: 'CREATE CATEGORY',
                    color: 'success',
                    action: this.addNewCategory,
                    disabled: !this.$hasAccess('CATEGORY_CREATE'),
                },
            ];
        },
    },
    methods: {
        addNewCategory() {
            this.$router.push('/categories/new');
        },
    },
};
</script>
