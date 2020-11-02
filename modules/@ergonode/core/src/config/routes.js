/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Icons,
    Pages,
    Tabs,
} from './imports';
import Privileges from './privileges';

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
        redirect: {
            name: 'settings-languages',
        },
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
            privileges: {
                namespace: Privileges.SETTINGS.namespace,
                read: Privileges.SETTINGS.read,
            },
        },
        children: [
            {
                name: 'settings-languages',
                path: 'languages',
                component: Tabs.MainSettingsTab,
                meta: {
                    title: 'Languages',
                    breadcrumbs: [
                        {
                            title: 'System',
                            icon: Icons.Settings,
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: 'settings-languages-inheritance',
                path: 'languages-inheritance',
                component: Tabs.LanguagesSettingsTab,
                meta: {
                    title: 'Languages inheritance',
                    breadcrumbs: [
                        {
                            title: 'System',
                            icon: Icons.Settings,
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: 'settings-units',
                path: 'units',
                component: Tabs.UnitsSettingsGridTab,
                meta: {
                    title: 'Units',
                    breadcrumbs: [
                        {
                            title: 'System',
                            icon: Icons.Settings,
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
    {
        name: 'unit-id',
        path: '/settings/units/unit/:id',
        component: Pages.UnitEdit,
        redirect: {
            name: 'unit-id-general',
        },
        meta: {
            isMenu: false,
        },
        children: [
            {
                name: 'unit-id-general',
                path: 'general',
                component: Tabs.UnitGeneralTab,
                meta: {
                    title: 'Options',
                    breadcrumbs: [
                        {
                            title: 'System',
                            icon: Icons.Settings,
                        },
                        {
                            title: 'Units',
                            routeName: 'settings-units',
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
];
