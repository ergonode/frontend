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
        name: 'category-trees',
        path: '/category-trees',
        component: Pages.CategoryTrees,
        meta: {
            access: true,
            title: 'Category trees',
            group: {
                title: 'Product design',
                menuPosition: 3,
                icon: Icons.Templates,
            },
            isMenu: true,
            menuPosition: 5,
            privileges: {
                namespace: Privileges.CATEGORY_TREE.namespace,
                read: Privileges.CATEGORY_TREE.read,
            },
            redirectTo: 'category-trees-grid',
        },
        children: [
            {
                name: 'category-trees-grid',
                path: 'grid',
                component: Tabs.CategoryTreesGridTab,
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
        name: 'category-tree-id',
        path: '/category-trees/tree/:id',
        component: Pages.CategoryTreesEdit,
        meta: {
            isMenu: false,
            redirectTo: 'category-tree-id-general',
        },
        children: [
            {
                name: 'category-tree-id-general',
                path: 'general',
                component: Tabs.CategoryTreeGeneralTab,
                meta: {
                    title: 'Options',
                    breadcrumbs: [
                        {
                            title: 'Product design',
                            icon: Icons.Templates,
                        },
                        {
                            title: 'Category trees',
                            routeName: 'category-trees-grid',
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: 'category-tree-id-translations',
                path: 'translations',
                component: Tabs.CategoryTreeTranslationsTab,
                meta: {
                    title: 'Translations',
                    breadcrumbs: [
                        {
                            title: 'Product design',
                            icon: Icons.Templates,
                        },
                        {
                            title: 'Category trees',
                            routeName: 'category-trees-grid',
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: 'category-tree-id-designer',
                path: 'designer',
                component: Tabs.CategoryTreeDesignerTab,
                meta: {
                    title: 'Designer',
                    breadcrumbs: [
                        {
                            title: 'Product design',
                            icon: Icons.Templates,
                        },
                        {
                            title: 'Category trees',
                            routeName: 'category-trees-grid',
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
];
