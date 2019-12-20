/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { GridTabs, Pages } from './router.imports';
import { routing as productsRouting } from '~/modules/products/router.config';
import { routing as productDesignRouting } from '~/modules/product-design/router.config';
import { routing as workflowRouting } from '~/modules/workflow/router.config';
import { routing as systemRouting } from '~/modules/system/router.config';

export const pages = [
    {
        name: 'index',
        path: '/',
        component: Pages.Login,
        meta: {
            isMenu: false,
        },
    },
    ...productsRouting,
    ...productDesignRouting,
    ...workflowRouting,
    ...systemRouting,
    {
        name: 'profile',
        path: '/profile',
        component: Pages.Profile,
        children: [
            {
                name: 'profile-activity-log-grid',
                path: 'activity-log-grid',
                component: GridTabs.UserActivityLogsGridTab,
            },
            {
                name: 'profile-privileges-grid',
                path: 'privileges-grid',
                component: GridTabs.UserPrivilegesGridTab,
            },
        ],
        meta: {
            isMenu: false,
            redirectTo: 'activity-log-grid',
        },
    },
    {
        name: 'notifications',
        path: '/notifications',
        component: Pages.Notifications,
        children: [
            {
                name: 'notifications-grid',
                path: 'grid',
                component: GridTabs.NotificationGridTab,
            },
        ],
        meta: {
            isMenu: false,
            redirectTo: 'grid',
        },
    },
];
