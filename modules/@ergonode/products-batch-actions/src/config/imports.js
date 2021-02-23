/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const Components = {
    ProductsBatchActionsButton: () => import('@ProductsBatchActions/components/Buttons/ProductsBatchActionsButton').then(m => m.default || m),
    AttributesVerticalTab: () => import('@ProductsBatchActions/components/VerticalTabs/AttributesVerticalTab'),
};

export const Icons = {
    IconAttributes: () => import('@Attributes/components/Icons/IconAttributes'),
};
