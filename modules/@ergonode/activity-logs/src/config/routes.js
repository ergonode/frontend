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

export const ROUTE_NAME = {
    ACTIVITY_LOGS: 'activity-logs',
    ACTIVITY_LOGS_GRID: 'activity-logs-grid',
};

export default [
    {
        name: ROUTE_NAME.ACTIVITY_LOGS,
        path: '/activity-logs',
        component: Pages.UsersActivityLogs,
        redirect: {
            name: ROUTE_NAME.ACTIVITY_LOGS_GRID,
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
                name: ROUTE_NAME.ACTIVITY_LOGS_GRID,
                path: 'grid',
                component: Tabs.UsersActivityLogsTab,
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
