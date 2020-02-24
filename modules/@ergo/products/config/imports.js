/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const Pages = {
    Products: () => import('@Products/pages/catalog/index').then(m => m.default || m),
    ProductEdit: () => import('@Products/pages/catalog/_product/_id').then(m => m.default || m),
};

export const Tabs = {
    ProductGridTab: () => import('@Products/components/Tabs/ProductGridTab').then(m => m.default || m),
    ProductBaseTab: () => import('@Products/components/Tabs/ProductBaseTab').then(m => m.default || m),
    ProductTemplateTab: () => import('@Products/components/Tabs/ProductTemplateTab').then(m => m.default || m),
    ProductCollectionTab: () => import('@Products/components/Tabs/ProductCollectionTab').then(m => m.default || m),
    ProductCommentsTab: () => import('@Products/components/Tabs/ProductCommentsTab').then(m => m.default || m),
    ProductHistoryGridTab: () => import('@Products/components/Tabs/ProductHistoryGridTab').then(m => m.default || m),
};

export const Icons = {
    Product: () => import('@Core/components/Icons/Menu/IconProduct'),
};
