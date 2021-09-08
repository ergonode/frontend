/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Icons,
    Pages,
    Tabs,
} from '@Users/config/imports';
import Privileges from '@Users/config/privileges';

export const GROUP = {
    id: 'system',
    title: '@Users._.routes.group',
};
export const ROUTE_NAME = {
    USERS: 'users',
    USERS_GRID: 'users-grid',
    USER_EDIT: 'user-id',
    USER_EDIT_GENERAL: 'user-id-general',
    USER_EDIT_AVATAR: 'user-id-avatar',
    USER_EDIT_LANGUAGE_RESTRICTIONS: 'user-id-language-restrictions',
    USER_PROFILE: 'user-profile',
    USER_PROFILE_ACTIVITY_LOGS_GRID: 'user-profile-activity-logs-grid',
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
            title: '@Users._.routes.title',
            group: {
                id: GROUP.id,
                title: GROUP.title,
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
                component: Tabs.UsersTab,
                meta: {
                    title: '',
                    breadcrumbs: [
                        {
                            title: GROUP.title,
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
                    title: '@Users._.routes.editOption',
                    breadcrumbs: [
                        {
                            title: GROUP.title,
                            icon: Icons.Settings,
                        },
                        {
                            title: '@Users._.routes.title',
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
                    title: '@Users._.routes.editAvatar',
                    breadcrumbs: [
                        {
                            title: GROUP.title,
                            icon: Icons.Settings,
                        },
                        {
                            title: '@Users._.routes.title',
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
                    title: '@Users._.routes.editLanguage',
                    breadcrumbs: [
                        {
                            title: GROUP.title,
                            icon: Icons.Settings,
                        },
                        {
                            title: '@Users._.routes.title',
                            name: ROUTE_NAME.USERS_GRID,
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
                component: Tabs.UserActivityLogsTab,
                meta: {
                    title: '@Users._.routes.profile',
                    privileges: [],
                },
            },
        ],
    },
];
