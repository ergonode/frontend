/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Tabs,
} from '@Roles/config/imports';
import {
    ROUTE_NAME as USER_ROUTE_NAME,
} from '@Users/config/routes';

export const ROUTE_NAME = {
    USER_PROFILE_PRIVILEGES_GRID: 'user-profile-privileges-grid',
};

export default [
    {
        name: USER_ROUTE_NAME.USER_PROFILE,
        children: [
            {
                name: ROUTE_NAME.USER_PROFILE_PRIVILEGES_GRID,
                path: 'privileges-grid',
                component: Tabs.UserPrivilegesTab,
                meta: {
                    title: 'Privileges',
                    privileges: [],
                },
            },
        ],
    },
];
