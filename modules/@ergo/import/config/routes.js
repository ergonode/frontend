/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { Pages, Icons, Tabs } from './imports';
import Privileges from './privileges';

export default [
    {
        name: 'imports',
        path: '/imports',
        component: Pages.Imports,
        meta: {
            access: true,
            title: 'Imports',
            group: {
                title: 'Sources',
                menuPosition: 4,
                icon: Icons.Export,
            },
            isMenu: true,
            menuPosition: 1,
            privileges: {
                namespace: Privileges.IMPORT.namespace,
                read: Privileges.IMPORT.read,
            },
            redirectTo: 'import-grid',
        },
        children: [
            {
                name: 'import-grid',
                path: 'grid',
                component: Tabs.ImportProfileGridTab,
                meta: {
                    title: '',
                    breadcrumbs: [
                        {
                            title: 'Sources',
                            icon: Icons.Export,
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
    {
        name: 'import-id',
        path: '/imports/import/:id',
        component: Pages.ImportProfileEdit,
        meta: {
            isMenu: false,
            redirectTo: 'import-id-general',
        },
        children: [
            {
                name: 'import-id-general',
                path: 'general',
                component: Tabs.ImportProfileBaseTab,
                meta: {
                    title: 'General',
                    breadcrumbs: [
                        {
                            title: 'Sources',
                            icon: Icons.Export,
                        },
                        {
                            title: 'Import profiles',
                            routeName: 'import-grid',
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: 'import-id-settings',
                path: 'settings',
                component: Tabs.ImportProfileSettingsTab,
                meta: {
                    title: 'Settings',
                    breadcrumbs: [
                        {
                            title: 'Sources',
                            icon: Icons.Export,
                        },
                        {
                            title: 'Import profiles',
                            routeName: 'import-grid',
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: 'import-id-history',
                path: 'history',
                component: Tabs.ImportProfileHistoryTab,
                meta: {
                    title: 'History',
                    breadcrumbs: [
                        {
                            title: 'Sources',
                            icon: Icons.Export,
                        },
                        {
                            title: 'Import profiles',
                            routeName: 'import-grid',
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
];
