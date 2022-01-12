/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const Components = {
    ProductsBatchActionsButton: () => import('@ProductBatchActions/components/Buttons/ProductsBatchActionsButton').then(m => m.default || m),
    NotificationListBatchActionEndedItem: () => import('@ProductBatchActions/components/NotificationLists/Items/NotificationListBatchActionEndedItem').then(m => m.default || m),
    NotificationListBatchActionsProcessingItem: () => import('@ProductBatchActions/components/NotificationLists/Items/NotificationListBatchActionsProcessingItem').then(m => m.default || m),
    AttributesVerticalTab: () => import('@ProductBatchActions/components/VerticalTabs/AttributesVerticalTab'),
};

export const Icons = {
    IconAttributes: () => import('@Attributes/components/Icons/IconAttributes').then(m => m.default || m),
};
