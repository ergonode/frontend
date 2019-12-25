/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { Pages, Tabs, Icons } from './config/imports';
import Privileges from './config/privileges';

export default {
    name: '@ergo/users',
    type: 'page',
    moduleRelations: [
        '@ergo/core',
    ],
    privileges: Privileges,
    nuxt: {
        aliases: {
            '@Users': '/',
        },
    },
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
                    icon: Icons.Settings,
                },
                isMenu: true,
                privileges: {
                    namespace: Privileges.USER.namespace,
                    read: Privileges.USER.read,
                },
            },
        },
        {
            name: 'user-new',
            path: '/users/user/new',
            component: Pages.UserNew,
            children: [
                {
                    name: 'user-new-general',
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
                                routePath: '/users',
                            },
                        ],
                        privileges: [],
                    },
                },
            ],
            meta: {
                isMenu: false,
                redirectTo: 'general',
            },
        },
        {
            name: 'user-edit-id',
            path: '/users/user/edit/:id',
            component: Pages.UserEdit,
            children: [
                {
                    name: 'user-edit-id-general',
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
                                routePath: '/users',
                            },
                        ],
                        privileges: [],
                    },
                },
                {
                    name: 'user-edit-id-avatar',
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
                                routePath: '/users',
                            },
                        ],
                        privileges: [],
                    },
                },
            ],
            meta: {
                isMenu: false,
                redirectTo: 'general',
            },
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
                    icon: Icons.Settings,
                },
                isMenu: true,
                privileges: {
                    namespace: Privileges.USER_ROLE.namespace,
                    read: Privileges.USER_ROLE.read,
                },
            },
        },
        {
            name: 'user-role-new',
            path: '/user-roles/role/new',
            component: Pages.RoleNew,
            children: [
                {
                    name: 'user-role-new-general',
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
                                routePath: '/user-roles',
                            },
                        ],
                        privileges: [],
                    },
                },
            ],
            meta: {
                isMenu: false,
                redirectTo: 'general',
            },
        },
        {
            name: 'user-role-edit-id',
            path: '/user-roles/role/edit/:id',
            component: Pages.RoleEdit,
            children: [
                {
                    name: 'user-role-edit-id-general',
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
                                routePath: '/user-roles',
                            },
                        ],
                        privileges: [],
                    },
                },
                {
                    name: 'user-role-edit-id-privileges',
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
                                routePath: '/user-roles',
                            },
                        ],
                        privileges: [],
                    },
                },
            ],
            meta: {
                isMenu: false,
                redirectTo: 'general',
            },
        },
    ],
    store: [
        {
            directory: 'authentication',
            name: 'authentication',
        },
        {
            directory: 'users',
            name: 'users',
        },
        {
            directory: 'roles',
            name: 'roles',
        },
    ],
};
