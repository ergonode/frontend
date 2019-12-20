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
import GridViewTemplate from '~/core/components/Layout/Templates/GridViewTemplate';

export default {
    name: 'CategoryTreeDesignTab',
    components: {
        VerticalTabBar: () => import('~/core/components/Tab/VerticalTabBar'),
        CategoryTreeWrapper: () => import('~/components/CategoryTreeDesigner/CategoryTreeWrapper'),
        GridViewTemplate,
    },
    data: () => ({
        verticalTabs: [
            {
                title: 'Categories',
                component: () => import('~/components/Card/Lists/CategoriesListTab'),
                iconComponent: () => import('@Core/components/Icons/Menu/IconCategory'),
            },
        ],
    }),
};
</script>
