/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const Components = {
    NotificationListBatchActionsSuccessItem: () => import('@BatchActions/extends/notification/components/Notifications/NotificationListBatchActionsSuccessItem').then(m => m.default || m),
    NotificationListBatchActionsWarningItem: () => import('@BatchActions/extends/notification/components/Notifications/NotificationListBatchActionsWarningItem').then(m => m.default || m),
    NotificationListBatchActionsProcessingItem: () => import('@BatchActions/extends/notification/components/Notifications/NotificationListBatchActionsProcessingItem').then(m => m.default || m),
};
