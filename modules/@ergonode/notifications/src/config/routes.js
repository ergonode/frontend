/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Pages,
    Tabs,
} from './imports';

export const ROUTE_NAME = {
    NOTIFICATIONS: 'notification',
    NOTIFICATIONS_GRID: 'notification-grid',
};

export default [
    {
        name: ROUTE_NAME.NOTIFICATIONS,
        path: '/notifications',
        component: Pages.Notifications,
        redirect: {
            name: ROUTE_NAME.NOTIFICATIONS_GRID,
        },
        meta: {
            isMenu: false,
        },
        children: [
            {
                name: ROUTE_NAME.NOTIFICATIONS_GRID,
                path: 'grid',
                component: Tabs.NotificationGridTab,
            },
        ],
    },
];
