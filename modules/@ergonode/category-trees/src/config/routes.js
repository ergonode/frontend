/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Icons,
    Pages,
    Tabs,
} from '@Trees/config/imports';
import Privileges from '@Trees/config/privileges';

export const GROUP = {
    id: 'product-design',
    title: '@Trees._.routes.group',
};
export const ROUTE_NAME = {
    CATEGORY_TREES: 'category-trees',
    CATEGORY_TREES_GRID: 'category-trees-grid',
    CATEGORY_TREE_EDIT: 'category-tree-id',
    CATEGORY_TREE_EDIT_GENERAL: 'category-tree-id-general',
    CATEGORY_TREE_EDIT_TRANSLATIONS: 'category-tree-id-translations',
    CATEGORY_TREE_EDIT_DESIGNER: 'category-tree-id-designer',
};

export default [
    {
        name: ROUTE_NAME.CATEGORY_TREES,
        path: '/category-trees',
        component: Pages.CategoryTrees,
        redirect: {
            name: ROUTE_NAME.CATEGORY_TREES_GRID,
        },
        meta: {
            access: true,
            title: '@Trees._.routes.title',
            group: {
                id: GROUP.id,
                title: GROUP.title,
                menuPosition: 3,
                icon: Icons.Templates,
            },
            isMenu: true,
            menuPosition: 5,
            privileges: {
                namespace: Privileges.CATEGORY_TREE.namespace,
                read: Privileges.CATEGORY_TREE.read,
            },
        },
        children: [
            {
                name: ROUTE_NAME.CATEGORY_TREES_GRID,
                path: 'grid',
                component: Tabs.CategoryTreesTab,
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
        name: ROUTE_NAME.CATEGORY_TREE_EDIT,
        path: '/category-trees/tree/:id',
        component: Pages.CategoryTreesEdit,
        redirect: {
            name: ROUTE_NAME.CATEGORY_TREE_EDIT_GENERAL,
        },
        meta: {
            isMenu: false,
        },
        children: [
            {
                name: ROUTE_NAME.CATEGORY_TREE_EDIT_GENERAL,
                path: 'general',
                component: Tabs.CategoryTreeGeneralTab,
                meta: {
                    title: '@Trees._.routes.editOption',
                    breadcrumbs: [
                        {
                            title: GROUP.title,
                            icon: Icons.Templates,
                        },
                        {
                            title: '@Trees._.routes.title',
                            routeName: ROUTE_NAME.CATEGORY_TREES_GRID,
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: ROUTE_NAME.CATEGORY_TREE_EDIT_TRANSLATIONS,
                path: 'translations',
                component: Tabs.CategoryTreeTranslationsTab,
                meta: {
                    title: '@Trees._.routes.editTranslation',
                    breadcrumbs: [
                        {
                            title: GROUP.title,
                            icon: Icons.Templates,
                        },
                        {
                            title: '@Trees._.routes.title',
                            routeName: ROUTE_NAME.CATEGORY_TREES_GRID,
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: ROUTE_NAME.CATEGORY_TREE_EDIT_DESIGNER,
                path: 'designer',
                component: Tabs.CategoryTreeDesignerTab,
                meta: {
                    title: '@Trees._.routes.editDesigner',
                    breadcrumbs: [
                        {
                            title: GROUP.title,
                            icon: Icons.Templates,
                        },
                        {
                            title: '@Trees._.routes.title',
                            routeName: ROUTE_NAME.CATEGORY_TREES_GRID,
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
];
