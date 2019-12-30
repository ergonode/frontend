/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { Pages, Tabs, Components } from './config/imports';
import Privileges from './config/privileges';

export default {
    name: '@ergo/notifications',
    type: 'page',
    moduleRelations: [
        '@ergo/core',
    ],
    privileges: Privileges,
    nuxt: {
        aliases: {
            '@Notifications': '/',
        },
    },
    router: [
        {
            name: 'notifications',
            path: '/notifications',
            component: Pages.Notifications,
            children: [
                {
                    name: 'notifications-grid',
                    path: 'grid',
                    component: Tabs.NotificationGridTab,
                },
            ],
            meta: {
                isMenu: false,
                redirectTo: 'grid',
            },
        },
    ],
    store: [
        {
            directory: 'notifications',
            name: 'notifications',
        },
    ],
    extendComponents: {
        NAVIGATION_BAR: [
            {
                component: Components.NavigationBarNotificationButton,
                props: {},
            },
        ],
    },
};
