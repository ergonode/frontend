/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const Pages = {
    ProductStatuses: () => import('@Statuses/pages/product-statuses/index').then(m => m.default || m),
    ProductStatusEdit: () => import('@Statuses/pages/product-statuses/_status/_id').then(m => m.default || m),
};

export const Tabs = {
    ProductStatusTab: () => import('@Statuses/components/Tabs/ProductStatusTab').then(m => m.default || m),
    ProductStatusGeneralTab: () => import('@Statuses/components/Tabs/ProductStatusGeneralTab').then(m => m.default || m),
    ProductStatusTranslationsTab: () => import('@Statuses/components/Tabs/ProductStatusTranslationsTab').then(m => m.default || m),
};

export const Icons = {
    Flow: () => import('@Core/components/Icons/Menu/IconFlow').then(m => m.default || m),
};
