/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const Pages = {
    CategoryTrees: () => import('@Trees/pages/category-trees/index').then(m => m.default || m),
    CategoryTreesEdit: () => import('@Trees/pages/category-trees/_tree/_id').then(m => m.default || m),
};

export const Tabs = {
    CategoryTreesGridTab: () => import('@Trees/components/Tabs/CategoryTreesGridTab').then(m => m.default || m),
    CategoryTreeGeneralTab: () => import('@Trees/components/Tabs/CategoryTreeGeneralTab').then(m => m.default || m),
    CategoryTreeTranslationsTab: () => import('@Trees/components/Tabs/CategoryTreeTranslationsTab').then(m => m.default || m),
    CategoryTreeDesignerTab: () => import('@Trees/components/Tabs/CategoryTreeDesignerTab').then(m => m.default || m),
};

export const Icons = {
    Templates: () => import('@Core/components/Icons/Menu/IconTemplates'),
};

export const Components = {
    CategoryTreeTypeAdvancedFilter: () => import('@Trees/components/AdvancedFilters/Type/CategoryTreeTypeAdvancedFilter'),
};
