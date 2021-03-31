/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Icons,
    Pages,
    Tabs,
} from '@Categories/config/imports';
import Privileges from '@Categories/config/privileges';

export const GROUP = {
    id: 'product-design',
    title: '@Categories._.routes.group',
};
export const ROUTE_NAME = {
    CATEGORIES: 'categories',
    CATEGORIES_GRID: 'categories-grid',
    CATEGORY_EDIT: 'category-id',
    CATEGORY_EDIT_GENERAL: 'category-id-general',
    CATEGORY_EDIT_TRANSLATIONS: 'category-id-translations',
};

export default [
    {
        name: ROUTE_NAME.CATEGORIES,
        path: '/categories',
        component: Pages.Categories,
        redirect: {
            name: ROUTE_NAME.CATEGORIES_GRID,
        },
        meta: {
            access: true,
            title: '@Categories._.routes.title',
            group: {
                id: GROUP.id,
                title: GROUP.title,
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
                name: ROUTE_NAME.CATEGORIES_GRID,
                path: 'grid',
                component: Tabs.CategoriesTab,
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
        name: ROUTE_NAME.CATEGORY_EDIT,
        path: '/categories/category/:id',
        component: Pages.CategoryEdit,
        redirect: {
            name: ROUTE_NAME.CATEGORY_EDIT_GENERAL,
        },
        meta: {
            isMenu: false,
        },
        children: [
            {
                name: ROUTE_NAME.CATEGORY_EDIT_GENERAL,
                path: 'general',
                component: Tabs.CategoryGeneralTab,
                meta: {
                    title: '@Categories._.routes.editOption',
                    breadcrumbs: [
                        {
                            title: GROUP.title,
                            icon: Icons.Templates,
                        },
                        {
                            title: '@Categories._.routes.title',
                            routeName: ROUTE_NAME.CATEGORIES_GRID,
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: ROUTE_NAME.CATEGORY_EDIT_TRANSLATIONS,
                path: 'translations',
                component: Tabs.CategoryTranslationsTab,
                meta: {
                    title: '@Categories._.routes.editTranslation',
                    breadcrumbs: [
                        {
                            title: GROUP.title,
                            icon: Icons.Templates,
                        },
                        {
                            title: '@Categories._.routes.title',
                            routeName: ROUTE_NAME.CATEGORIES_GRID,
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
];
