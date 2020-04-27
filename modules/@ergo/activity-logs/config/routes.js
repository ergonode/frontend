/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { Pages, Tabs, Icons } from './imports';
import Privileges from './privileges';

export default [
    {
        name: 'activity-logs',
        path: '/activity-logs',
        component: Pages.UsersActivityLogs,
        meta: {
            access: true,
            title: 'Activity logs',
            group: {
                title: 'System',
                menuPosition: 1000,
                icon: Icons.Settings,
            },
            isMenu: true,
            menuPosition: 3,
            privileges: {
                namespace: Privileges.USER.namespace,
                read: Privileges.USER.read,
            },
            redirectTo: 'activity-logs-grid',
        },
        children: [
            {
                name: 'activity-logs-grid',
                path: 'grid',
                component: Tabs.UsersActivityLogsGridTab,
                meta: {
                    title: '',
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
];
