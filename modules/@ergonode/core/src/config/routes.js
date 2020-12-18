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
    INDEX: 'index',
    PASSWORD_RESET: 'password-reset',
    PLACEHOLDER: 'placeholder',
    SETTINGS: 'settings',
    SETTINGS_LANGUAGES: 'settings-languages',
    SETTINGS_LANGUAGES_INHERITANCE: 'settings-languages-inheritance',
    SETTINGS_UNITS: 'settings-units',
    SETTINGS_UNIT_EDIT: 'unit-id',
    SETTINGS_UNIT_EDIT_GENERAL: 'unit-id-general',
};

export default [
    {
        name: ROUTE_NAME.INDEX,
        path: '/',
        component: Pages.Login,
        meta: {
            isMenu: false,
        },
    },
    {
        name: ROUTE_NAME.PASSWORD_RESET,
        path: '/password-reset',
        component: Pages.PasswordReset,
        meta: {
            isMenu: false,
        },
    },
    {
        name: ROUTE_NAME.PLACEHOLDER,
        path: '/placeholder/:placeholder',
        component: Pages.Placeholder,
        meta: {
            isMenu: false,
        },
    },
    {
        name: ROUTE_NAME.SETTINGS,
        path: '/settings',
        redirect: {
            name: ROUTE_NAME.SETTINGS_LANGUAGES,
        },
        component: Pages.Settings,
        meta: {
            access: true,
            title: 'Settings',
            group: {
                title: 'System',
                menuPosition: 1000,
                icon: Icons.Settings,
            },
            breadcrumbs: [
                {
                    title: 'System',
                    icon: Icons.Settings,
                },
            ],
            isMenu: true,
            menuPosition: 1000,
            privileges: {
                namespace: Privileges.SETTINGS.namespace,
                read: Privileges.SETTINGS.read,
            },
        },
        children: [
            {
                name: ROUTE_NAME.SETTINGS_LANGUAGES,
                path: 'languages',
                component: Tabs.MainSettingsTab,
                meta: {
                    title: 'Languages',
                    breadcrumbs: [
                        {
                            title: 'System',
                            icon: Icons.Settings,
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: ROUTE_NAME.SETTINGS_LANGUAGES_INHERITANCE,
                path: 'languages-inheritance',
                component: Tabs.LanguagesSettingsTab,
                meta: {
                    title: 'Languages inheritance',
                    breadcrumbs: [
                        {
                            title: 'System',
                            icon: Icons.Settings,
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: ROUTE_NAME.SETTINGS_UNITS,
                path: 'units',
                component: Tabs.UnitSettingsTab,
                meta: {
                    title: 'Units',
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
        name: ROUTE_NAME.SETTINGS_UNIT_EDIT,
        path: '/settings/units/unit/:id',
        component: Pages.UnitEdit,
        redirect: {
            name: ROUTE_NAME.SETTINGS_UNIT_EDIT_GENERAL,
        },
        meta: {
            isMenu: false,
        },
        children: [
            {
                name: ROUTE_NAME.SETTINGS_UNIT_EDIT_GENERAL,
                path: 'general',
                component: Tabs.UnitGeneralTab,
                meta: {
                    title: 'Options',
                    breadcrumbs: [
                        {
                            title: 'System',
                            icon: Icons.Settings,
                        },
                        {
                            title: 'Units',
                            routeName: ROUTE_NAME.SETTINGS_UNITS,
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
];
