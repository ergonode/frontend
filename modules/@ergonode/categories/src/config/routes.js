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

export const ROUTE_NAMES = {
    CATEGORIES: 'categories',
    CATEGORIES_GRID: 'categories-grid',
    CATEGORY_EDIT: 'category-id',
    CATEGORY_EDIT_GENERAL: 'category-id-general',
    CATEGORY_EDIT_TRANSLATIONS: 'category-id-translations',
};

export default [
    {
        name: ROUTE_NAMES.CATEGORIES,
        path: '/categories',
        component: Pages.Categories,
        redirect: {
            name: ROUTE_NAMES.CATEGORIES_GRID,
        },
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
        },
        children: [
            {
                name: ROUTE_NAMES.CATEGORIES_GRID,
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
        name: ROUTE_NAMES.CATEGORY_EDIT,
        path: '/categories/category/:id',
        component: Pages.CategoryEdit,
        redirect: {
            name: ROUTE_NAMES.CATEGORY_EDIT_GENERAL,
        },
        meta: {
            isMenu: false,
        },
        children: [
            {
                name: ROUTE_NAMES.CATEGORY_EDIT_GENERAL,
                path: 'general',
                component: Tabs.CategoryGeneralTab,
                meta: {
                    title: 'Options',
                    breadcrumbs: [
                        {
                            title: 'Product design',
                            icon: Icons.Templates,
                        },
                        {
                            title: 'Categories',
                            routeName: ROUTE_NAMES.CATEGORIES_GRID,
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: ROUTE_NAMES.CATEGORY_EDIT_TRANSLATIONS,
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
                            routeName: ROUTE_NAMES.CATEGORIES_GRID,
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
];
