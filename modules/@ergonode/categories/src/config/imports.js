/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const Pages = {
    Categories: () => import('@Categories/pages/categories/index').then(m => m.default || m),
    CategoryEdit: () => import('@Categories/pages/categories/_category/_id').then(m => m.default || m),
};

export const Tabs = {
    CategoriesTab: () => import('@Categories/components/Tabs/CategoriesTab').then(m => m.default || m),
    CategoryGeneralTab: () => import('@Categories/components/Tabs/CategoryGeneralTab').then(m => m.default || m),
    CategoryTranslationsTab: () => import('@Categories/components/Tabs/CategoryTranslationsTab').then(m => m.default || m),
};

export const Icons = {
    Templates: () => import('@Core/components/Icons/Menu/IconTemplates').then(m => m.default || m),
    IconTree: () => import('@Categories/components/Icons/IconTree').then(m => m.default || m),
};

// Extends

export const Components = {
    ProductFormCategory: () => import('@Categories/extends/product/components/Forms/ProductFormCategory').then(m => m.default || m),
    CategoriesVerticalTab: () => import('@Categories/extends/categoryTree/components/VerticalTabs/CategoriesVerticalTab').then(m => m.default || m),
};

export const Store = {
    Product: () => import('@Categories/extends/product/store').then(m => m.default || m),
};
