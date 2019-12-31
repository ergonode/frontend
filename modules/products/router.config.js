/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

const Pages = {
    Products: () => import('~/modules/products/pages/catalog/index').then((m) => m.default || m),
    ProductNew: () => import('~/modules/products/pages/catalog/_product/index').then((m) => m.default || m),
    ProductEdit: () => import('~/modules/products/pages/catalog/_product/_id').then((m) => m.default || m),
};

const Tabs = {
    ProductBaseTab: () => import('~/modules/products/pages/catalog/_product/_tabs/ProductBaseTab').then((m) => m.default || m),
    ProductTemplateTab: () => import('~/modules/products/pages/catalog/_product/_tabs/ProductTemplateTab').then((m) => m.default || m),
    ProductCommentsTab: () => import('~/modules/products/pages/catalog/_product/_tabs/ProductCommentsTab').then((m) => m.default || m),
};

const GridTabs = {
    ProductHistoryGridTab: () => import('~/modules/products/pages/catalog/_product/_tabs/ProductHistoryGridTab').then((m) => m.default || m),
};

export const routing = [
    {
        name: 'catalog',
        path: '/catalog',
        component: Pages.Products,
        meta: {
            access: true,
            title: 'Catalog',
            group: {
                title: 'Products',
                icon: () => import('@Core/components/Icons/Menu/IconDocument'),
            },
            isMenu: true,
            privileges: {
                namespace: 'PRODUCT',
                read: 'PRODUCT_READ',
            },
        },
    },
    {
        name: 'product-new',
        path: '/catalog/product/new',
        component: Pages.ProductNew,
        children: [
            {
                name: 'product-new-general',
                path: 'general',
                component: Tabs.ProductBaseTab,
                meta: {
                    title: 'General options',
                    breadcrumbs: [
                        {
                            title: 'Products',
                            icon: () => import('@Core/components/Icons/Menu/IconDocument'),
                        },
                        {
                            title: 'Catalog',
                            routePath: '/catalog',
                        },
                    ],
                    privileges: [],
                },
            },
        ],
        meta: {
            isMenu: false,
            redirectTo: 'general',
        },
    },
    {
        name: 'product-edit-id',
        path: '/catalog/product/edit/:id',
        component: Pages.ProductEdit,
        children: [
            {
                name: 'product-edit-id-general',
                path: 'general',
                component: Tabs.ProductBaseTab,
                meta: {
                    title: 'General options',
                    breadcrumbs: [
                        {
                            title: 'Products',
                            icon: () => import('@Core/components/Icons/Menu/IconDocument'),
                        },
                        {
                            title: 'Catalog',
                            routePath: '/catalog',
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: 'product-edit-id-template',
                path: 'template',
                component: Tabs.ProductTemplateTab,
                meta: {
                    title: 'Product template',
                    breadcrumbs: [
                        {
                            title: 'Products',
                            icon: () => import('@Core/components/Icons/Menu/IconDocument'),
                        },
                        {
                            title: 'Catalog',
                            routePath: '/catalog',
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: 'product-edit-id-comments',
                path: 'comments',
                component: Tabs.ProductCommentsTab,
                meta: {
                    title: 'Comments',
                    breadcrumbs: [
                        {
                            title: 'Products',
                            icon: () => import('@Core/components/Icons/Menu/IconDocument'),
                        },
                        {
                            title: 'Catalog',
                            routePath: '/catalog',
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: 'product-edit-id-history',
                path: 'history',
                component: GridTabs.ProductHistoryGridTab,
                meta: {
                    title: 'History',
                    breadcrumbs: [
                        {
                            title: 'Products',
                            icon: () => import('@Core/components/Icons/Menu/IconDocument'),
                        },
                        {
                            title: 'Catalog',
                            routePath: '/catalog',
                        },
                    ],
                    privileges: [],
                },
            },
        ],
        meta: {
            isMenu: false,
            redirectTo: 'general',
        },
    },
];
