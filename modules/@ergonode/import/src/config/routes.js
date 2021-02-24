/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Icons,
    Pages,
    Tabs,
} from '@Import/config/imports';
import Privileges from '@Import/config/privileges';

export const ROUTE_NAME = {
    IMPORTS: 'imports',
    IMPORTS_GRID: 'imports-grid',
    IMPORT_EDIT: 'import-id',
    IMPORT_EDIT_GENERAL: 'import-id-general',
    IMPORT_EDIT_HISTORY: 'import-id-history',
};

export default [
    {
        name: ROUTE_NAME.IMPORTS,
        path: '/imports',
        component: Pages.Imports,
        redirect: {
            name: ROUTE_NAME.IMPORTS_GRID,
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
                name: ROUTE_NAME.IMPORTS_GRID,
                path: 'grid',
                component: Tabs.ImportProfilesTab,
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
        name: ROUTE_NAME.IMPORT_EDIT,
        path: '/imports/import/:id',
        component: Pages.ImportProfileEdit,
        redirect: {
            name: ROUTE_NAME.IMPORT_EDIT_GENERAL,
        },
        meta: {
            isMenu: false,
        },
        children: [
            {
                name: ROUTE_NAME.IMPORT_EDIT_GENERAL,
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
                            routeName: ROUTE_NAME.IMPORTS_GRID,
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: ROUTE_NAME.IMPORT_EDIT_HISTORY,
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
                            routeName: ROUTE_NAME.IMPORTS_GRID,
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
];
