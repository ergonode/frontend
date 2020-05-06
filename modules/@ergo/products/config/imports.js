/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const Pages = {
    Products: () => import('@Products/pages/catalog/index').then(m => m.default || m),
    ProductEdit: () => import('@Products/pages/catalog/_product/_id').then(m => m.default || m),
};

export const Tabs = {
    ProductCatalogTab: () => import('@Products/components/Tabs/ProductCatalogTab').then(m => m.default || m),
    ProductGeneralTab: () => import('@Products/components/Tabs/ProductGeneralTab').then(m => m.default || m),
    ProductTemplateTab: () => import('@Products/components/Tabs/ProductTemplateTab').then(m => m.default || m),
    ProductCollectionTab: () => import('@Products/components/Tabs/ProductCollectionTab').then(m => m.default || m),
    ProductVariantsTab: () => import('@Products/components/Tabs/ProductVariantsTab').then(m => m.default || m),
    ProductGroupTab: () => import('@Products/components/Tabs/ProductGroupTab').then(m => m.default || m),
    ProductCommentsTab: () => import('@Products/components/Tabs/ProductCommentsTab').then(m => m.default || m),
    ProductHistoryTab: () => import('@Products/components/Tabs/ProductHistoryTab').then(m => m.default || m),
};

export const Icons = {
    Product: () => import('@Core/components/Icons/Menu/IconProduct'),
};
