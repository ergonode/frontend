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
        name: 'users',
        path: '/users',
        component: Pages.Users,
        redirect: {
            name: 'users-grid',
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
                name: 'users-grid',
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
        name: 'user-id',
        path: '/users/user/:id',
        component: Pages.UserEdit,
        redirect: {
            name: 'user-id-general',
        },
        meta: {
            isMenu: false,
        },
        children: [
            {
                name: 'user-id-general',
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
                            routeName: 'users-grid',
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: 'user-id-avatar',
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
                            routeName: 'users-grid',
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: 'user-id-language-restrictions',
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
                            routeName: 'users-grid',
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
    {
        name: 'user-roles',
        path: '/user-roles',
        component: Pages.Roles,
        redirect: {
            name: 'user-roles-grid',
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
                name: 'user-roles-grid',
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
        name: 'user-role-id',
        path: '/user-roles/role/:id',
        component: Pages.RoleEdit,
        redirect: {
            name: 'user-role-id-general',
        },
        meta: {
            isMenu: false,
        },
        children: [
            {
                name: 'user-role-id-general',
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
                            routeName: 'user-roles-grid',
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: 'user-role-id-privileges',
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
                            routeName: 'user-roles-grid',
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
    {
        name: 'profile',
        path: '/profile',
        component: Pages.Profile,
        redirect: {
            name: 'profile-activity-log-grid',
        },
        meta: {
            isMenu: false,
        },
        children: [
            {
                name: 'profile-activity-log-grid',
                path: 'activity-log-grid',
                component: Tabs.UserActivityLogsGridTab,
                meta: {
                    title: 'Activity log',
                    privileges: [],
                },
            },
            {
                name: 'profile-privileges-grid',
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
