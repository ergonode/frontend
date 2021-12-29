/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const Components = {
    ToolBarNotificationButton: () => import('@Notifications/components/ToolBar/ToolBarNotificationButton').then(m => m.default || m),
    NotificationListItem: () => import('@Notifications/components/NotificationList/Item/NotificationListItem').then(m => m.default || m),
    NotificationsListener: () => import('@Notifications/components/NotificationsListener/NotificationsListener').then(m => m.default || m),
};
