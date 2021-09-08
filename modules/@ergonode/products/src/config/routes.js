/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Icons,
    Pages,
    Tabs,
} from '@Products/config/imports';
import PRIVILEGES from '@Products/config/privileges';

export const GROUP = {
    id: 'products',
    title: '@Products._.routes.group',
};
export const ROUTE_NAME = {
    CATALOG: 'catalog',
    PRODUCTS_CATALOG: 'catalog-products',
    PRODUCT_EDIT: 'product-id',
    PRODUCT_EDIT_GENERAL: 'product-id-general',
    PRODUCT_EDIT_TEMPLATE: 'product-id-template',
    PRODUCT_EDIT_HISTORY: 'product-id-history',
};

export default [
    {
        name: ROUTE_NAME.CATALOG,
        path: '/catalog',
        component: Pages.Products,
        redirect: {
            name: ROUTE_NAME.PRODUCTS_CATALOG,
        },
        meta: {
            access: true,
            title: '@Products._.routes.title',
            group: {
                id: GROUP.id,
                title: GROUP.title,
                menuPosition: 2,
                icon: Icons.Product,
            },
            isMenu: true,
            menuPosition: 1,
            privileges: {
                namespace: PRIVILEGES.PRODUCT.namespace,
                read: PRIVILEGES.PRODUCT.read,
            },
        },
        children: [
            {
                name: ROUTE_NAME.PRODUCTS_CATALOG,
                path: 'products',
                component: Tabs.ProductCatalogTab,
                meta: {
                    title: '',
                    breadcrumbs: [
                        {
                            title: GROUP.title,
                            icon: Icons.Product,
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
    {
        name: ROUTE_NAME.PRODUCT_EDIT,
        path: '/catalog/products/product/:id',
        component: Pages.ProductEdit,
        redirect: {
            name: ROUTE_NAME.PRODUCT_EDIT_GENERAL,
        },
        meta: {
            isMenu: false,
        },
        children: [
            {
                name: ROUTE_NAME.PRODUCT_EDIT_GENERAL,
                path: 'general',
                component: Tabs.ProductGeneralTab,
                meta: {
                    title: '@Products._.routes.editGeneral',
                    breadcrumbs: [
                        {
                            title: GROUP.title,
                            icon: Icons.Product,
                        },
                        {
                            title: '@Products._.routes.title',
                            routeName: ROUTE_NAME.PRODUCTS_CATALOG,
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: ROUTE_NAME.PRODUCT_EDIT_TEMPLATE,
                path: 'template',
                component: Tabs.ProductTemplateTab,
                meta: {
                    title: '@Products._.routes.editTemplate',
                    breadcrumbs: [
                        {
                            title: GROUP.title,
                            icon: Icons.Product,
                        },
                        {
                            title: '@Products._.routes.title',
                            routeName: ROUTE_NAME.PRODUCTS_CATALOG,
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: ROUTE_NAME.PRODUCT_EDIT_HISTORY,
                path: 'history',
                component: Tabs.ProductHistoryTab,
                meta: {
                    title: '@Products._.routes.editHistory',
                    breadcrumbs: [
                        {
                            title: GROUP.title,
                            icon: Icons.Product,
                        },
                        {
                            title: '@Products._.routes.title',
                            routeName: ROUTE_NAME.PRODUCTS_CATALOG,
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
];
