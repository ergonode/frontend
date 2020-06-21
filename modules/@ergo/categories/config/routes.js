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
                    privileges: [
                    ],
                },
            },
        ],
    },
    {
        name: 'category-id',
        path: '/categories/category/:id',
        component: Pages.CategoryEdit,
        meta: {
            isMenu: false,
            redirectTo: 'category-id-general',
        },
        children: [
            {
                name: 'category-id-general',
                path: 'general',
                component: Tabs.CategoryBaseTab,
                meta: {
                    title: 'General',
                    breadcrumbs: [
                        {
                            title: 'Product design',
                            icon: Icons.Templates,
                        },
                        {
                            title: 'Categories',
                            routeName: 'categories-grid',
                        },
                    ],
                    privileges: [
                    ],
                },
            },
            {
                name: 'category-id-translations',
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
                            routeName: 'categories-grid',
                        },
                    ],
                    privileges: [
                    ],
                },
            },
        ],
    },
];
