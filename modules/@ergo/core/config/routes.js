/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { Pages, Tabs, Icons } from './imports';

export default [
    {
        name: 'index',
        path: '/',
        component: Pages.Login,
        meta: {
            isMenu: false,
        },
    },
    {
        name: 'placeholder',
        path: '/placeholder/:placeholder',
        component: Pages.Placeholder,
        meta: {
            isMenu: false,
        },
    },
    {
        name: 'settings',
        path: '/settings',
        component: Pages.Settings,
        meta: {
            access: true,
            title: 'Settings',
            group: {
                title: 'System',
                menuPosition: 1000,
                icon: Icons.Settings,
            },
            breadcrumbs: [
                {
                    title: 'System',
                    icon: Icons.Settings,
                },
            ],
            isMenu: true,
            menuPosition: 1000,
            redirectTo: 'settings-main',
        },
        children: [
            {
                name: 'settings-main',
                path: 'main',
                component: Tabs.MainSettingsTab,
                meta: {
                    title: 'Main settings',
                    privileges: [],
                },
            },
        ],
    },
];
