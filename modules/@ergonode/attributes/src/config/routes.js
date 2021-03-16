/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Icons,
    Pages,
    Tabs,
} from './imports';
import Privileges from './privileges';

export const ROUTE_NAME = {
    ATTRIBUTES: 'attributes',
    ATTRIBUTES_GRID: 'attributes-grid',
    ATTRIBUTE_EDIT: 'attribute-id',
    ATTRIBUTE_EDIT_GENERAL: 'attribute-id-general',
    ATTRIBUTE_EDIT_TRANSLATIONS: 'attribute-id-translations',
    ATTRIBUTE_GROUPS: 'attribute-groups',
    ATTRIBUTE_GROUPS_GRID: 'attribute-groups-grid',
    ATTRIBUTE_GROUPS_EDIT: 'attribute-group-id',
    ATTRIBUTE_GROUPS_EDIT_GENERAL: 'attribute-group-id-genera',
    ATTRIBUTE_GROUPS_EDIT_TRANSLATIONS: 'attribute-group-id-translations',
};

export default [
    {
        name: ROUTE_NAME.ATTRIBUTES,
        path: '/attributes',
        component: Pages.Attributes,
        redirect: {
            name: ROUTE_NAME.ATTRIBUTES_GRID,
        },
        meta: {
            access: true,
            title: 'Attributes',
            group: {
                title: 'Product design',
                menuPosition: 3,
                icon: Icons.Templates,
            },
            isMenu: true,
            menuPosition: 1,
            privileges: {
                namespace: Privileges.ATTRIBUTE.namespace,
                read: Privileges.ATTRIBUTE.read,
            },
        },
        children: [
            {
                name: ROUTE_NAME.ATTRIBUTES_GRID,
                path: 'grid',
                component: Tabs.AttributesTab,
                meta: {
                    title: '',
                    breadcrumbs: [
                        {
                            title: 'Product design',
                            icon: Icons.Templates,
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
    {
        name: ROUTE_NAME.ATTRIBUTE_EDIT,
        path: '/attributes/attribute/:id',
        component: Pages.AttributeEdit,
        redirect: {
            name: ROUTE_NAME.ATTRIBUTE_EDIT_GENERAL,
        },
        meta: {
            isMenu: false,
        },
        children: [
            {
                name: ROUTE_NAME.ATTRIBUTE_EDIT_GENERAL,
                path: 'general',
                component: Tabs.AttributeGeneralTab,
                meta: {
                    title: 'Options',
                    breadcrumbs: [
                        {
                            title: 'Product design',
                            icon: Icons.Templates,
                        },
                        {
                            title: 'Attributes',
                            routeName: ROUTE_NAME.ATTRIBUTES_GRID,
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: ROUTE_NAME.ATTRIBUTE_EDIT_TRANSLATIONS,
                path: 'translations',
                component: Tabs.AttributeTranslationsTab,
                meta: {
                    title: 'Translations',
                    breadcrumbs: [
                        {
                            title: 'Product design',
                            icon: Icons.Templates,
                        },
                        {
                            title: 'Attributes',
                            routeName: ROUTE_NAME.ATTRIBUTES_GRID,
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
    {
        name: ROUTE_NAME.ATTRIBUTE_GROUPS,
        path: '/attribute-groups',
        component: Pages.AttributeGroups,
        redirect: {
            name: ROUTE_NAME.ATTRIBUTE_GROUPS_GRID,
        },
        meta: {
            access: true,
            title: 'Attribute groups',
            group: {
                title: 'Product design',
                menuPosition: 3,
                icon: Icons.Templates,
            },
            isMenu: true,
            menuPosition: 2,
            privileges: {
                namespace: Privileges.ATTRIBUTE_GROUP.namespace,
                read: Privileges.ATTRIBUTE_GROUP.read,
            },
        },
        children: [
            {
                name: ROUTE_NAME.ATTRIBUTE_GROUPS_GRID,
                path: 'grid',
                component: Tabs.AttributeGroupsTab,
                meta: {
                    title: '',
                    breadcrumbs: [
                        {
                            title: 'Product design',
                            icon: Icons.Templates,
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
    {
        name: ROUTE_NAME.ATTRIBUTE_GROUPS_EDIT,
        path: '/attribute-groups/group/:id',
        component: Pages.AttributeGroupEdit,
        redirect: {
            name: ROUTE_NAME.ATTRIBUTE_GROUPS_EDIT_GENERAL,
        },
        meta: {
            isMenu: false,
        },
        children: [
            {
                name: ROUTE_NAME.ATTRIBUTE_GROUPS_EDIT_GENERAL,
                path: 'general',
                component: Tabs.AttributeGroupGeneralTab,
                meta: {
                    title: 'Options',
                    breadcrumbs: [
                        {
                            title: 'Product design',
                            icon: Icons.Templates,
                        },
                        {
                            title: 'Attribute groups',
                            routeName: ROUTE_NAME.ATTRIBUTE_GROUPS_GRID,
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: ROUTE_NAME.ATTRIBUTE_GROUPS_EDIT_TRANSLATIONS,
                path: 'translations',
                component: Tabs.AttributeGroupTranslationsTab,
                meta: {
                    title: 'Translations',
                    breadcrumbs: [
                        {
                            title: 'Product design',
                            icon: Icons.Templates,
                        },
                        {
                            title: 'Attribute groups',
                            routeName: ROUTE_NAME.ATTRIBUTE_GROUPS_GRID,
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
];
