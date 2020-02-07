/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { Pages, Tabs, Components } from './config/imports';
import Privileges from './config/privileges';

export default {
    name: '@ergo/notifications',
    type: 'page',
    moduleRelations: [],
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
