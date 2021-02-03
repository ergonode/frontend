/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const Components = {
    ToolBarNotificationButton: () => import('@Notifications/components/ToolBar/ToolBarNotificationButton').then(m => m.default || m),
};
