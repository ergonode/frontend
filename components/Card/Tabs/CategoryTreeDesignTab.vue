/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridViewTemplate>
        <template #sidebar>
            <VerticalTabBar :items="verticalTabs" />
        </template>
        <template #grid>
            <CategoryTreeWrapper />
        </template>
        <template #footer>
            <Footer :button="updateButton" />
        </template>
    </GridViewTemplate>
</template>

<script>
import Footer from '~/components/ReusableFooter/Footer';
import GridViewTemplate from '~/core/components/Layout/GridViewTemplate';

export default {
    name: 'CategoryTreeDesignTab',
    components: {
        VerticalTabBar: () => import('~/core/components/Tab/VerticalTabBar'),
        CategoryTreeWrapper: () => import('~/components/CategoryTreeDesigner/CategoryTreeWrapper'),
        Footer,
        GridViewTemplate,
    },
    props: {
        updateButton: {
            type: Object,
            required: true,
        },
    },
    data: () => ({
        verticalTabs: [
            {
                title: 'Categories',
                component: () => import('~/components/Card/Lists/CategoriesListTab'),
                iconPath: 'Menu/IconCategory',
            },
        ],
    }),
};
</script>
