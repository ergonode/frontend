/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const Tabs = {
    ProductCommentsTab: () => import('@Comments/components/Tabs/Product/ProductCommentsTab').then(m => m.default || m),
};

export const Icons = {
    Product: () => import('@Core/components/Icons/Menu/IconProduct'),
};
