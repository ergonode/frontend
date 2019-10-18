/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <PageWrapper>
        <TitleBar
            :title="title"
            :buttons="buttons"
            :icon="icon"
            :is-read-only="$isReadOnly('CATEGORY')" />
        <HorizontalTabBar
            :items="tabs" />
    </PageWrapper>
</template>

<script>
export default {
    name: 'GridCategoryPage',
    components: {
        HorizontalTabBar: () => import('~/components/Tab/HorizontalTabBar'),
        TitleBar: () => import('~/components/TitleBar/TitleBar'),
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
        if (this.$hasAccess('CATEGORY_READ')) {
            this.tabs.push({
                title: 'Categories',
                route: { name: 'categories-grid' },
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
