/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const Pages = {
    ProductStatuses: () => import('@Statuses/pages/product-statuses/index').then(m => m.default || m),
    ProductStatusNew: () => import('@Statuses/pages/product-statuses/_status/index').then(m => m.default || m),
    ProductStatusEdit: () => import('@Statuses/pages/product-statuses/_status/_id').then(m => m.default || m),
};

export const Tabs = {
    ProductStatusGridTab: () => import('@Statuses/components/Tabs/ProductStatusGridTab').then(m => m.default || m),
    ProductStatusBaseTab: () => import('@Statuses/components/Tabs/ProductStatusBaseTab').then(m => m.default || m),
    ProductStatusTranslationsTab: () => import('@Statuses/components/Tabs/ProductStatusTranslationsTab').then(m => m.default || m),
};

export const Icons = {
    Flow: () => import('@Core/components/Icons/Menu/IconFlow'),
};
