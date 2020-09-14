/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const Pages = {
    Notifications: () => import('@Notifications/pages/notifications/index').then(m => m.default || m),
};

export const Tabs = {
    NotificationGridTab: () => import('@Notifications/components/Tabs/NotificationGridTab').then(m => m.default || m),
};

export const Components = {
    ToolBarNotificationButton: () => import('@Notifications/components/ToolBar/ToolBarNotificationButton'),
};
