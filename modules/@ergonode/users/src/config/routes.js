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
    USERS: 'users',
    USERS_GRID: 'users-grid',
    USER_EDIT: 'user-id',
    USER_EDIT_GENERAL: 'user-id-general',
    USER_EDIT_AVATAR: 'user-id-avatar',
    USER_EDIT_LANGUAGE_RESTRICTIONS: 'user-id-language-restrictions',
    USER_ROLES: 'user-roles',
    USER_ROLES_GRID: 'user-roles-grid',
    USER_ROLE_EDIT: 'user-role-id',
    USER_ROLE_EDIT_GENERAL: 'user-role-id-general',
    USER_ROLE_EDIT_PRIVILEGES: 'user-role-id-privileges',
    USER_PROFILE: 'user-profile',
    USER_PROFILE_ACTIVITY_LOGS_GRID: 'user-profile-activity-logs-grid',
    USER_PROFILE_PRIVILEGES_GRID: 'user-profile-privileges-grid',
};

export default [
    {
        name: ROUTE_NAME.USERS,
        path: '/users',
        component: Pages.Users,
        redirect: {
            name: ROUTE_NAME.USERS_GRID,
        },
        meta: {
            access: true,
            title: 'Users',
            group: {
                title: 'System',
                menuPosition: 1000,
                icon: Icons.Settings,
            },
            isMenu: true,
            menuPosition: 1,
            privileges: {
                namespace: Privileges.USER.namespace,
                read: Privileges.USER.read,
            },
        },
        children: [
            {
                name: ROUTE_NAME.USERS_GRID,
                path: 'grid',
                component: Tabs.UsersGridTab,
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
        name: ROUTE_NAME.USER_EDIT,
        path: '/users/user/:id',
        component: Pages.UserEdit,
        redirect: {
            name: ROUTE_NAME.USER_EDIT_GENERAL,
        },
        meta: {
            isMenu: false,
        },
        children: [
            {
                name: ROUTE_NAME.USER_EDIT_GENERAL,
                path: 'general',
                component: Tabs.UserGeneralTab,
                meta: {
                    title: 'Options',
                    breadcrumbs: [
                        {
                            title: 'System',
                            icon: Icons.Settings,
                        },
                        {
                            title: 'Users',
                            routeName: ROUTE_NAME.USERS_GRID,
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: ROUTE_NAME.USER_EDIT_AVATAR,
                path: 'avatar',
                component: Tabs.UserAvatarTab,
                meta: {
                    title: 'Avatar',
                    breadcrumbs: [
                        {
                            title: 'System',
                            icon: Icons.Settings,
                        },
                        {
                            title: 'Users',
                            name: ROUTE_NAME.USERS_GRID,
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: ROUTE_NAME.USER_EDIT_LANGUAGE_RESTRICTIONS,
                path: 'language-restrictions',
                component: Tabs.UserLanguageRestrictionsTab,
                meta: {
                    title: 'Language restrictions',
                    breadcrumbs: [
                        {
                            title: 'System',
                            icon: Icons.Settings,
                        },
                        {
                            title: 'Users',
                            name: ROUTE_NAME.USERS_GRID,
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
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
                component: Tabs.RolesGridTab,
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
    {
        name: ROUTE_NAME.USER_PROFILE,
        path: '/profile',
        component: Pages.Profile,
        redirect: {
            name: ROUTE_NAME.USER_PROFILE_ACTIVITY_LOGS_GRID,
        },
        meta: {
            isMenu: false,
        },
        children: [
            {
                name: ROUTE_NAME.USER_PROFILE_ACTIVITY_LOGS_GRID,
                path: 'activity-log-grid',
                component: Tabs.UserActivityLogsGridTab,
                meta: {
                    title: 'Activity log',
                    privileges: [],
                },
            },
            {
                name: ROUTE_NAME.USER_PROFILE_PRIVILEGES_GRID,
                path: 'privileges-grid',
                component: Tabs.UserPrivilegesGridTab,
                meta: {
                    title: 'Privileges',
                    privileges: [],
                },
            },
        ],
    },
];
