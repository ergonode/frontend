/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { Pages, Tabs, Icons } from './config/imports';
import Privileges from './config/privileges';

export default {
    name: '@ergo/products',
    type: 'page',
    moduleRelations: [
        '@ergo/product-templates',
        '@ergo/comments',
    ],
    privileges: Privileges,
    nuxt: {
        aliases: {
            '@Products': '/',
        },
    },
    router: [
        {
            name: 'catalog',
            path: '/catalog',
            component: Pages.Products,
            meta: {
                access: true,
                title: 'Catalog',
                group: {
                    title: 'Products',
                    menuPosition: 2,
                    icon: Icons.Document,
                },
                isMenu: true,
                menuPosition: 1,
                privileges: {
                    namespace: Privileges.PRODUCT.namespace,
                    read: Privileges.PRODUCT.read,
                },
                redirectTo: 'products',
            },
            children: [
                {
                    name: 'catalog-products',
                    path: 'products',
                    component: Tabs.ProductGridTab,
                    meta: {
                        title: '',
                        breadcrumbs: [
                            {
                                title: 'Products',
                                icon: Icons.Document,
                            },
                        ],
                        privileges: [],
                    },
                },
            ],
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
                                icon: Icons.Document,
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
                                icon: Icons.Document,
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
                                icon: Icons.Document,
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
                                icon: Icons.Document,
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
                    component: Tabs.ProductHistoryGridTab,
                    meta: {
                        title: 'History',
                        breadcrumbs: [
                            {
                                title: 'Products',
                                icon: Icons.Document,
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
    ],
    store: [
        {
            directory: 'productsDraft',
            name: 'productsDraft',
        },
    ],
};
