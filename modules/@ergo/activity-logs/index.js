/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { Pages, Icons } from './config/imports';
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
                privileges: Privileges.USER,
            },
        },
    ],
};
