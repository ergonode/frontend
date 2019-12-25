/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { Pages, Tabs } from './config/imports';
import Privileges from './config/privileges';

export default {
    name: '@ergo/profile',
    type: 'page',
    moduleRelations: [
        '@ergo/core',
        // '@ergo/users',
        // '@ergo/roles',
    ],
    privileges: Privileges,
    nuxt: {
        aliases: {
            '@Profile': '/',
        },
    },
    router: [
        {
            name: 'profile',
            path: '/profile',
            component: Pages.Profile,
            children: [
                {
                    name: 'profile-activity-log-grid',
                    path: 'activity-log-grid',
                    component: Tabs.UserActivityLogsGridTab,
                },
                {
                    name: 'profile-privileges-grid',
                    path: 'privileges-grid',
                    component: Tabs.UserPrivilegesGridTab,
                },
            ],
            meta: {
                isMenu: false,
                redirectTo: 'activity-log-grid',
            },
        },
    ],
};
