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
        name: 'activity-logs',
        path: '/activity-logs',
        component: Pages.UsersActivityLogs,
        redirect: {
            name: 'activity-logs-grid',
        },
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
