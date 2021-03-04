/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Icons,
    Pages,
    Tabs,
} from '@Attributes/config/imports';
import Privileges from '@Attributes/config/privileges';

export const ROUTE_NAME = {
    ATTRIBUTES: 'attributes',
    ATTRIBUTES_GRID: 'attributes-grid',
    ATTRIBUTE_EDIT: 'attribute-id',
    ATTRIBUTE_EDIT_GENERAL: 'attribute-id-general',
    ATTRIBUTE_EDIT_TRANSLATIONS: 'attribute-id-translations',
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
];
