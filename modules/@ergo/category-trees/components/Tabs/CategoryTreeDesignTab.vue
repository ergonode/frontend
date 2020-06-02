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
    </GridViewTemplate>
</template>

<script>
import GridViewTemplate from '@Core/components/Layout/Templates/GridViewTemplate';

export default {
    name: 'CategoryTreeDesignTab',
    components: {
        VerticalTabBar: () => import('@Core/components/TabBar/VerticalTabBar'),
        CategoryTreeWrapper: () => import('@Trees/components/CategoryTreeDesigner/CategoryTreeWrapper'),
        GridViewTemplate,
    },
    computed: {
        verticalTabs() {
            return [
                {
                    title: 'Categories',
                    component: () => import('@Trees/components/Tabs/List/CategoriesListTab'),
                    iconComponent: () => import('@Core/components/Icons/Menu/IconCategory'),
                },
            ];
        },
    },
};
</script>
