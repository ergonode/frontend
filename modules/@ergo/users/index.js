/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { Pages, Tabs, Icons } from './config/imports';
import Privileges from './config/privileges';

export default {
    name: '@ergo/users',
    type: 'page',
    moduleRelations: [],
    privileges: Privileges,
    nuxt: {
        aliases: {
            '@Users': '/',
        },
        plugins: [
            '/plugins/privilege',
        ],
    },
    dictionaries: [
        {
            stateProp: 'privileges',
            dataFormat: {},
            requestPath: '/dictionary/privileges',
        },
    ],
    router: [
        {
            name: 'users',
            path: '/users',
            component: Pages.Users,
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
                redirectTo: 'users-grid',
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
            meta: {
                isMenu: false,
                redirectTo: 'user-id-general',
            },
            children: [
                {
                    name: 'user-id-general',
                    path: 'general',
                    component: Tabs.UserBaseTab,
                    meta: {
                        title: 'General options',
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
            ],
        },
        {
            name: 'user-roles',
            path: '/user-roles',
            component: Pages.Roles,
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
                redirectTo: 'user-roles-grid',
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
            meta: {
                isMenu: false,
                redirectTo: 'user-role-id-general',
            },
            children: [
                {
                    name: 'user-role-id-general',
                    path: 'general',
                    component: Tabs.RoleBaseTab,
                    meta: {
                        title: 'General options',
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
            meta: {
                isMenu: false,
                redirectTo: 'profile-activity-log-grid',
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
    ],
    store: [
        {
            directory: 'users',
            name: 'users',
        },
        {
            directory: 'roles',
            name: 'roles',
        },
    ],
    extendTabs: [
        // {
        //     name: 'settings',
        //     children: [
        //         {
        //             name: 'settings-user',
        //             path: 'user',
        //             component: Tabs.UserSettingsTab,
        //             meta: {
        //                 title: 'User settings',
        //                 privileges: [],
        //             },
        //         },
        //     ],
        // },
    ],
};
