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
        name: 'imports',
        path: '/imports',
        component: Pages.Imports,
        redirect: {
            name: 'import-grid',
        },
        meta: {
            access: true,
            title: 'Imports',
            group: {
                title: 'Data exchange',
                menuPosition: 4,
                icon: Icons.Channels,
            },
            isMenu: true,
            menuPosition: 1,
            privileges: {
                namespace: Privileges.IMPORT.namespace,
                read: Privileges.IMPORT.read,
            },
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
                            title: 'Data exchange',
                            icon: Icons.Channels,
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
        redirect: {
            name: 'import-id-general',
        },
        meta: {
            isMenu: false,
        },
        children: [
            {
                name: 'import-id-general',
                path: 'general',
                component: Tabs.ImportProfileGeneralTab,
                meta: {
                    title: 'Options',
                    breadcrumbs: [
                        {
                            title: 'Sources',
                            icon: Icons.Channels,
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
                            icon: Icons.Channels,
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
