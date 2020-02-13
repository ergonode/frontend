/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const Pages = {
    ProductCollections: () => import('@Collections/pages/product-collections/index').then(m => m.default || m),
    ProductCollectionEdit: () => import('@Collections/pages/product-collections/_collection/_id').then(m => m.default || m),
};

export const Tabs = {
    ProductCollectionGridTab: () => import('@Collections/components/Tabs/ProductCollectionGridTab').then(m => m.default || m),
    ProductCollectionBaseTab: () => import('@Collections/components/Tabs/ProductCollectionBaseTab').then(m => m.default || m),
    ProductCollectionTranslationsTab: () => import('@Collections/components/Tabs/ProductCollectionTranslationsTab').then(m => m.default || m),
    ProductCollectionProductsTab: () => import('@Collections/components/Tabs/ProductCollectionProductsTab').then(m => m.default || m),
};

export const Icons = {
    Product: () => import('@Core/components/Icons/Menu/IconProduct'),
};
