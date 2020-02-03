/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { Pages, Tabs, Icons } from './config/imports';
import Privileges from './config/privileges';

export default {
    name: '@ergo/activity-logs',
    type: 'page',
    moduleRelations: [
        '@ergo/users',
    ],
    privileges: Privileges,
    nuxt: {
        aliases: {
            '@ActivityLogs': '/',
        },
    },
    router: [
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
                redirectTo: 'grid',
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
    ],
};
