/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
const Pages = {
    Users: () => import('~/modules/system/pages/users/index').then((m) => m.default || m),
    UserNew: () => import('~/modules/system/pages/users/_user/index').then((m) => m.default || m),
    UserEdit: () => import('~/modules/system/pages/users/_user/_id').then((m) => m.default || m),
    UserRoles: () => import('~/modules/system/pages/user-roles/index').then((m) => m.default || m),
    UserRoleNew: () => import('~/modules/system/pages/user-roles/_role/index').then((m) => m.default || m),
    UserRoleEdit: () => import('~/modules/system/pages/user-roles/_role/_id').then((m) => m.default || m),
    Settings: () => import('~/modules/system/pages/settings/index').then((m) => m.default || m),
};

const Tabs = {
    UserBaseTab: () => import('~/modules/system/pages/users/_user/_tabs/UserBaseTab').then((m) => m.default || m),
    UserAvatarTab: () => import('~/modules/system/pages/users/_user/_tabs/UserAvatarTab').then((m) => m.default || m),
    UserRoleBaseTab: () => import('~/modules/system/pages/user-roles/_role/_tabs/UserRoleBaseTab').then((m) => m.default || m),
    UserRolePrivilegesTab: () => import('~/modules/system/pages/user-roles/_role/_tabs/UserRolePrivilegesTab').then((m) => m.default || m),
};

export const routing = [
    {
        name: 'users',
        path: '/users',
        component: Pages.Users,
        meta: {
            access: true,
            title: 'Users',
            group: {
                title: 'System',
                icon: () => import('@Core/components/Icons/Menu/IconSettings'),
            },
            isMenu: true,
            privileges: {
                namespace: 'USER',
                read: 'USER_READ',
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
                            icon: () => import('@Core/components/Icons/Menu/IconSettings'),
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
                            icon: () => import('@Core/components/Icons/Menu/IconSettings'),
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
                            icon: () => import('@Core/components/Icons/Menu/IconSettings'),
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
        component: Pages.UserRoles,
        meta: {
            access: true,
            title: 'User roles',
            group: {
                title: 'System',
                icon: () => import('@Core/components/Icons/Menu/IconSettings'),
            },
            isMenu: true,
            privileges: {
                namespace: 'USER_ROLE',
                read: 'USER_ROLE_READ',
            },
        },
    },
    {
        name: 'user-role-new',
        path: '/user-roles/role/new',
        component: Pages.UserRoleNew,
        children: [
            {
                name: 'user-role-new-general',
                path: 'general',
                component: Tabs.UserRoleBaseTab,
                meta: {
                    title: 'General options',
                    breadcrumbs: [
                        {
                            title: 'System',
                            icon: () => import('@Core/components/Icons/Menu/IconSettings'),
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
        component: Pages.UserRoleEdit,
        children: [
            {
                name: 'user-role-edit-id-general',
                path: 'general',
                component: Tabs.UserRoleBaseTab,
                meta: {
                    title: 'General options',
                    breadcrumbs: [
                        {
                            title: 'System',
                            icon: () => import('@Core/components/Icons/Menu/IconSettings'),
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
                component: Tabs.UserRolePrivilegesTab,
                meta: {
                    title: 'Privileges',
                    breadcrumbs: [
                        {
                            title: 'System',
                            icon: () => import('@Core/components/Icons/Menu/IconSettings'),
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
        name: 'settings',
        path: '/settings',
        component: Pages.Settings,
        meta: {
            access: true,
            title: 'Settings',
            group: {
                title: 'System',
                icon: () => import('@Core/components/Icons/Menu/IconSettings'),
            },
            isMenu: true,
            privileges: {
                namespace: 'USER',
                read: 'USER_READ',
            },
        },
    },
];
