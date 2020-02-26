/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { Pages, Tabs } from './imports';

export default [
    {
        name: 'notifications',
        path: '/notifications',
        component: Pages.Notifications,
        meta: {
            isMenu: false,
            redirectTo: 'notifications-grid',
        },
        children: [
            {
                name: 'notifications-grid',
                path: 'grid',
                component: Tabs.NotificationGridTab,
            },
        ],
    },
];
