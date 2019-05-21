/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="tab">
        <div class="tab__options">
            <VerticalTabBar :items="verticalTabs" />
        </div>
        <div class="tab__tree">
            <CategoryTreeWrapper />
        </div>
    </div>
</template>

<script>
export default {
    name: 'CategoryTreeTab',
    components: {
        VerticalTabBar: () => import('~/components/Tab/VerticalTabBar'),
        CategoryTreeWrapper: () => import('~/components/CategoryTree/CategoryTreeWrapper'),
    },
    data: () => ({
        verticalTabs: [
            {
                title: 'Categories',
                component: () => import('~/components/Card/CategoriesListTab'),
                icon: 'sprite-menu menu-folder',
                active: true,
            },
        ],
    }),
};
</script>

<style lang="scss" scoped>
    .tab {
        display: flex;
        width: 100%;
        height: 100%;
        background-color: $white;

        &__options {
            display: flex;
            margin: 24px 12px 0 24px;
        }

        &__tree {
            display: flex;
            flex: 1;
            flex-direction: column;
            width: 0;
            margin: 24px 12px 0 0;
            overflow: auto;
        }
    }
</style>
