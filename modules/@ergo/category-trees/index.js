/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { Pages, Tabs, Icons } from './config/imports';
import Privileges from './config/privileges';

export default {
    name: '@ergo/category-trees',
    type: 'page',
    moduleRelations: [
        '@ergo/categories',
    ],
    privileges: Privileges,
    nuxt: {
        aliases: {
            '@Trees': '/',
        },
    },
    router: [
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
            name: 'category-tree-edit-id',
            path: '/category-trees/tree/edit/:id',
            component: Pages.CategoryTreesEdit,
            meta: {
                isMenu: false,
                redirectTo: 'category-tree-edit-id-general',
            },
            children: [
                {
                    name: 'category-tree-edit-id-general',
                    path: 'general',
                    component: Tabs.CategoryTreeBaseTab,
                    meta: {
                        title: 'General options',
                        breadcrumbs: [
                            {
                                title: 'Product design',
                                icon: Icons.Templates,
                            },
                            {
                                title: 'Category trees',
                                routePath: '/category-trees',
                            },
                        ],
                        privileges: [],
                    },
                },
                {
                    name: 'category-tree-edit-id-translations',
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
                                routePath: '/category-trees',
                            },
                        ],
                        privileges: [],
                    },
                },
                {
                    name: 'category-tree-edit-id-designer',
                    path: 'designer',
                    component: Tabs.CategoryTreeDesignTab,
                    meta: {
                        title: 'Designer',
                        breadcrumbs: [
                            {
                                title: 'Product design',
                                icon: Icons.Templates,
                            },
                            {
                                title: 'Category trees',
                                routePath: '/category-trees',
                            },
                        ],
                        privileges: [],
                    },
                },
            ],
        },
    ],
    store: [
        {
            directory: 'tree',
            name: 'tree',
        },
    ],
};
