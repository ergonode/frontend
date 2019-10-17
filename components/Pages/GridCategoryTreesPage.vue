/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <PageWrapper>
        <NavigationHeader
            :title="title"
            :buttons="buttons"
            :icon="icon"
            :is-read-only="$isReadOnly('CATEGORY_TREE')" />
        <HorizontalTabBar
            :items="tabs" />
    </PageWrapper>
</template>

<script>
export default {
    name: 'GridCategoryTreesPage',
    components: {
        HorizontalTabBar: () => import('~/components/Tab/HorizontalTabBar'),
        NavigationHeader: () => import('~/components/ReusableHeader/NavigationHeader'),
        PageWrapper: () => import('~/components/Layout/PageWrapper'),
    },
    props: {
        title: {
            type: String,
            required: true,
        },
        buttons: {
            type: Array,
            required: true,
        },
        icon: {
            type: String,
            default: null,
        },
    },
    beforeCreate() {
        this.tabs = [];
        if (this.$hasAccess('CATEGORY_TREE_READ')) {
            this.tabs.push({
                title: 'Category trees',
                route: { name: 'category-trees-grid' },
                active: true,
                isContextualMenu: false,
            });
        }
    },
    beforeDestroy() {
        delete this.tabs;
    },
};
</script>
