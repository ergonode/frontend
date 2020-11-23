/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Pages,
    Tabs,
} from './imports';

export default [
    {
        name: 'notifications',
        path: '/notifications',
        component: Pages.Notifications,
        redirect: {
            name: 'notifications-grid',
        },
        meta: {
            isMenu: false,
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
