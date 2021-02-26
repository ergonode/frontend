/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Icons,
    Pages,
    Tabs,
} from '@Roles/config/imports';
import Privileges from '@Roles/config/privileges';

export const ROUTE_NAME = {
    USER_ROLES: 'user-roles',
    USER_ROLES_GRID: 'user-roles-grid',
    USER_ROLE_EDIT: 'user-role-id',
    USER_ROLE_EDIT_GENERAL: 'user-role-id-general',
    USER_ROLE_EDIT_PRIVILEGES: 'user-role-id-privileges',
};

export default [
    {
        name: ROUTE_NAME.USER_ROLES,
        path: '/user-roles',
        component: Pages.Roles,
        redirect: {
            name: ROUTE_NAME.USER_ROLES_GRID,
        },
        meta: {
            access: true,
            title: 'User roles',
            group: {
                title: 'System',
                menuPosition: 1000,
                icon: Icons.Settings,
            },
            isMenu: true,
            menuPosition: 2,
            privileges: {
                namespace: Privileges.USER_ROLE.namespace,
                read: Privileges.USER_ROLE.read,
            },
        },
        children: [
            {
                name: ROUTE_NAME.USER_ROLES_GRID,
                path: 'grid',
                component: Tabs.RolesTab,
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
    {
        name: ROUTE_NAME.USER_ROLE_EDIT,
        path: '/user-roles/role/:id',
        component: Pages.RoleEdit,
        redirect: {
            name: ROUTE_NAME.USER_ROLE_EDIT_GENERAL,
        },
        meta: {
            isMenu: false,
        },
        children: [
            {
                name: ROUTE_NAME.USER_ROLE_EDIT_GENERAL,
                path: 'general',
                component: Tabs.RoleGeneralTab,
                meta: {
                    title: 'Options',
                    breadcrumbs: [
                        {
                            title: 'System',
                            icon: Icons.Settings,
                        },
                        {
                            title: 'User roles',
                            routeName: ROUTE_NAME.USER_ROLES_GRID,
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: ROUTE_NAME.USER_ROLE_EDIT_PRIVILEGES,
                path: 'privileges',
                component: Tabs.RolePrivilegesTab,
                meta: {
                    title: 'Privileges',
                    breadcrumbs: [
                        {
                            title: 'System',
                            icon: Icons.Settings,
                        },
                        {
                            title: 'User roles',
                            routeName: ROUTE_NAME.USER_ROLES_GRID,
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
];
