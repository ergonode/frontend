/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Icons,
    Pages,
    Tabs,
} from '@AttributeGroups/config/imports';
import Privileges from '@AttributeGroups/config/privileges';

export const GROUP = {
    id: 'product-design',
    title: '@AttributeGroups._.routes.group',
};
export const ROUTE_NAME = {
    ATTRIBUTE_GROUPS: 'attribute-groups',
    ATTRIBUTE_GROUPS_GRID: 'attribute-groups-grid',
    ATTRIBUTE_GROUPS_EDIT: 'attribute-group-id',
    ATTRIBUTE_GROUPS_EDIT_GENERAL: 'attribute-group-id-genera',
    ATTRIBUTE_GROUPS_EDIT_TRANSLATIONS: 'attribute-group-id-translations',
};

export default [
    {
        name: ROUTE_NAME.ATTRIBUTE_GROUPS,
        path: '/attribute-groups',
        component: Pages.AttributeGroups,
        redirect: {
            name: ROUTE_NAME.ATTRIBUTE_GROUPS_GRID,
        },
        meta: {
            access: true,
            title: '@AttributeGroups._.routes.title',
            group: {
                id: GROUP.id,
                title: GROUP.title,
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
                            title: GROUP.title,
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
                    title: '@AttributeGroups._.routes.editOption',
                    breadcrumbs: [
                        {
                            title: GROUP.title,
                            icon: Icons.Templates,
                        },
                        {
                            title: '@AttributeGroups._.routes.title',
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
                    title: '@AttributeGroups._.routes.editTranslation',
                    breadcrumbs: [
                        {
                            title: GROUP.title,
                            icon: Icons.Templates,
                        },
                        {
                            title: '@AttributeGroups._.routes.title',
                            routeName: ROUTE_NAME.ATTRIBUTE_GROUPS_GRID,
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
];
