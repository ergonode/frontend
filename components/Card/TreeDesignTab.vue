/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="tab">
        <div class="horizontal-wrapper">
            <div class="tab__options">
                <VerticalTabBar :items="verticalTabs" />
            </div>
            <div class="tab__grid">
                <CategoryTreeWrapper />
            </div>
        </div>
        <Footer
            slot="footer"
            :buttons="[...updateButton]" />
    </div>
</template>

<script>
export default {
    name: 'TreeDesignTab',
    components: {
        VerticalTabBar: () => import('~/components/Tab/VerticalTabBar'),
        CategoryTreeWrapper: () => import('~/components/CategoryTree/CategoryTreeWrapper'),
        Footer: () => import('~/components/ReusableFooter/Footer'),
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
                component: () => import('~/components/Card/CategoriesListTab'),
                iconPath: 'Menu/IconCategory',
                active: true,
            },
        ],
    }),
};
</script>

<style lang="scss" scoped>
    .tab {
        display: flex;
        flex: 1;
        flex-direction: column;
        background-color: $white;

        .horizontal-wrapper {
            display: flex;
            flex: 1;
        }

        &__options {
            display: flex;
            margin: 24px 12px 0 24px;
        }

        &__grid {
            display: flex;
            flex: 1;
            flex-direction: column;
            width: 0;
            margin: 24px 12px 0 0;
            overflow: hidden;
        }
    }
</style>
