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
        name: 'attributes',
        path: '/attributes',
        component: Pages.Attributes,
        redirect: {
            name: 'attributes-grid',
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
                name: 'attributes-grid',
                path: 'grid',
                component: Tabs.AttributeGridTab,
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
        name: 'attribute-id',
        path: '/attributes/attribute/:id',
        component: Pages.AttributeEdit,
        redirect: {
            name: 'attribute-id-general',
        },
        meta: {
            isMenu: false,
        },
        children: [
            {
                name: 'attribute-id-general',
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
                            routeName: 'attributes-grid',
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: 'attribute-id-translations',
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
                            routeName: 'attributes-grid',
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
    {
        name: 'attribute-groups',
        path: '/attribute-groups',
        component: Pages.AttributeGroups,
        redirect: {
            name: 'attribute-groups-grid',
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
                name: 'attribute-groups-grid',
                path: 'grid',
                component: Tabs.AttributeGroupGridTab,
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
        name: 'attribute-group-id',
        path: '/attribute-groups/group/:id',
        component: Pages.AttributeGroupEdit,
        redirect: {
            name: 'attribute-group-id-general',
        },
        meta: {
            isMenu: false,
        },
        children: [
            {
                name: 'attribute-group-id-general',
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
                            routeName: 'attribute-groups-grid',
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: 'attribute-group-id-translations',
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
                            routeName: 'attribute-groups-grid',
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
];
