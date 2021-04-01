/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Icons,
    Pages,
    Tabs,
} from '@Core/config/imports';
import Privileges from '@Core/config/privileges';

export const GROUP = {
    id: 'system',
    title: '@Core._.routes.group',
};
export const ROUTE_NAME = {
    PLACEHOLDER: 'placeholder',
    SETTINGS: 'settings',
    SETTINGS_LANGUAGES_INHERITANCE: 'settings-languages-inheritance',
    SETTINGS_UNITS: 'settings-units',
    SETTINGS_UNIT_EDIT: 'unit-id',
    SETTINGS_UNIT_EDIT_GENERAL: 'unit-id-general',
};

export default [
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
            name: ROUTE_NAME.SETTINGS_LANGUAGES_INHERITANCE,
        },
        component: Pages.Settings,
        meta: {
            access: true,
            title: '@Core._.routes.title',
            group: {
                id: GROUP.id,
                title: GROUP.title,
                menuPosition: 1000,
                icon: Icons.Settings,
            },
            breadcrumbs: [
                {
                    title: GROUP.title,
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
                name: ROUTE_NAME.SETTINGS_LANGUAGES_INHERITANCE,
                path: 'languages-inheritance',
                component: Tabs.LanguagesSettingsTab,
                meta: {
                    title: '@Core._.routes.editInheritance',
                    breadcrumbs: [
                        {
                            title: GROUP.title,
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
                    title: '@Core._.routes.editUnits',
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
                    title: '@Core._.routes.editUnitsOptions',
                    breadcrumbs: [
                        {
                            title: GROUP.title,
                            icon: Icons.Settings,
                        },
                        {
                            title: '@Core._.routes.editUnits',
                            routeName: ROUTE_NAME.SETTINGS_UNITS,
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
];
