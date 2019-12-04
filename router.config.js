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
    {
        name: 'dashboard',
        path: '/dashboard',
        component: Pages.Dashboard,
        meta: {
            access: true,
            title: 'Dashboard',
            icon: 'Dashboard',
            isMenu: true,
        },
    },
    ...productsRouting,
    ...productDesignRouting,
    {
        name: 'imports',
        path: '/imports',
        component: Pages.Placeholder,
        meta: {
            access: true,
            title: 'Imports',
            group: {
                title: 'Sources',
                icon: 'Export',
            },
            isMenu: true,
            privileges: {
                namespace: 'IMPORT',
                read: 'IMPORT_READ',
            },
        },
    },
    {
        name: 'exports',
        path: '/exports',
        component: Pages.Placeholder,
        meta: {
            access: true,
            title: 'Exports',
            group: {
                title: 'Channels',
                icon: 'Channels',
            },
            isMenu: true,
            privileges: {
                namespace: 'EXPORT',
                read: 'EXPORT_READ',
            },
        },
    },
    {
        name: 'media',
        path: '/media',
        component: Pages.Placeholder,
        meta: {
            access: true,
            title: 'Media',
            group: {
                title: 'Resources',
                icon: 'Media',
            },
            isMenu: true,
            privileges: {
                namespace: 'MULTIMEDIA',
                read: 'MULTIMEDIA_READ',
            },
        },
    },
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
        meta: { isMenu: false },
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
        meta: { isMenu: false },
    },
    {
        name: 'placeholder',
        path: '/placeholder/:placeholder',
        component: Pages.Placeholder,
        meta: { isMenu: false },
    },
];
