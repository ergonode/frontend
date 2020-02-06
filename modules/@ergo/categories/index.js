/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { Pages, Tabs, Icons } from './config/imports';
import Privileges from './config/privileges';

export default {
    name: '@ergo/categories',
    type: 'page',
    moduleRelations: [],
    privileges: Privileges,
    nuxt: {
        aliases: {
            '@Categories': '/',
        },
    },
    router: [
        {
            name: 'categories',
            path: '/categories',
            component: Pages.Categories,
            meta: {
                access: true,
                title: 'Categories',
                group: {
                    title: 'Product design',
                    menuPosition: 3,
                    icon: Icons.Templates,
                },
                isMenu: true,
                menuPosition: 4,
                privileges: {
                    namespace: Privileges.CATEGORY.namespace,
                    read: Privileges.CATEGORY.read,
                },
                redirectTo: 'categories-grid',
            },
            children: [
                {
                    name: 'categories-grid',
                    path: 'grid',
                    component: Tabs.CategoryGridTab,
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
            name: 'category-edit-id',
            path: '/categories/category/edit/:id',
            component: Pages.CategoryEdit,
            meta: {
                isMenu: false,
                redirectTo: 'category-edit-id-general',
            },
            children: [
                {
                    name: 'category-edit-id-general',
                    path: 'general',
                    component: Tabs.CategoryBaseTab,
                    meta: {
                        title: 'General options',
                        breadcrumbs: [
                            {
                                title: 'Product design',
                                icon: Icons.Templates,
                            },
                            {
                                title: 'Categories',
                                routePath: '/categories',
                            },
                        ],
                        privileges: [],
                    },
                },
                {
                    name: 'category-edit-id-translations',
                    path: 'translations',
                    component: Tabs.CategoryTranslationsTab,
                    meta: {
                        title: 'Translations',
                        breadcrumbs: [
                            {
                                title: 'Product design',
                                icon: Icons.Templates,
                            },
                            {
                                title: 'Categories',
                                routePath: '/categories',
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
            directory: 'categories',
            name: 'categories',
        },
    ],
};
