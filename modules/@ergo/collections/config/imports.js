/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const Pages = {
    Collections: () => import('@Collections/pages/collections/index').then(m => m.default || m),
    CollectionEdit: () => import('@Collections/pages/collections/_collection/_id').then(m => m.default || m),
};

export const Tabs = {
    CollectionGridTab: () => import('@Collections/components/Tabs/CollectionGridTab').then(m => m.default || m),
    CollectionGeneralTab: () => import('@Collections/components/Tabs/CollectionGeneralTab').then(m => m.default || m),
    CollectionTranslationsTab: () => import('@Collections/components/Tabs/CollectionTranslationsTab').then(m => m.default || m),
    CollectionProductsTab: () => import('@Collections/components/Tabs/CollectionProductsTab').then(m => m.default || m),
};

export const Icons = {
    Product: () => import('@Core/components/Icons/Menu/IconProduct'),
};
