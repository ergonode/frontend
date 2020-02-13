/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import { Pages, Tabs, Icons } from './config/imports';
import Privileges from './config/privileges';

export default {
    name: '@ergo/product-collections',
    type: 'page',
    moduleRelations: [
        '@ergo/products',
    ],
    nuxt: {
        aliases: {
            '@Collections': '/',
        },
    },
    router: [
        {
            name: 'product-collections',
            path: '/product-collections',
            component: Pages.ProductCollections,
            meta: {
                title: 'Product collections',
                group: {
                    title: 'Products',
                    menuPosition: 2,
                    icon: Icons.Product,
                },
                isMenu: true,
                menuPosition: 3,
                privileges: {
                    namespace: Privileges.PRODUCT_COLLECTION.namespace,
                    read: Privileges.PRODUCT_COLLECTION.read,
                },
                redirectTo: 'product-collections-grid',
            },
            children: [
                {
                    name: 'product-collections-grid',
                    path: 'grid',
                    component: Tabs.ProductCollectionGridTab,
                    meta: {
                        title: '',
                        breadcrumbs: [
                            {
                                title: 'Products',
                                icon: Icons.Product,
                            },
                        ],
                        privileges: [],
                    },
                },
            ],
        },
        {
            name: 'product-collection-id',
            path: '/product-collections/collection/:id',
            component: Pages.ProductCollectionEdit,
            meta: {
                isMenu: false,
                redirectTo: 'product-collection-id-general',
            },
            children: [
                {
                    name: 'product-collection-id-general',
                    path: 'general',
                    component: Tabs.ProductCollectionBaseTab,
                    meta: {
                        title: 'General options',
                        breadcrumbs: [
                            {
                                title: 'Products',
                                icon: Icons.Product,
                            },
                            {
                                title: 'Product collections',
                                routeName: 'product-collections-grid',
                            },
                        ],
                        privileges: [],
                    },
                },
                {
                    name: 'product-collection-id-translations',
                    path: 'translations',
                    component: Tabs.ProductCollectionTranslationsTab,
                    meta: {
                        title: 'Translations',
                        breadcrumbs: [
                            {
                                title: 'Products',
                                icon: Icons.Product,
                            },
                            {
                                title: 'Product collections',
                                routeName: 'product-collections-grid',
                            },
                        ],
                        privileges: [],
                    },
                },
                {
                    name: 'product-collection-id-products',
                    path: 'products',
                    component: Tabs.ProductCollectionProductsTab,
                    meta: {
                        title: 'Products',
                        breadcrumbs: [
                            {
                                title: 'Products',
                                icon: Icons.Product,
                            },
                            {
                                title: 'Product collections',
                                routeName: 'product-collections-grid',
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
            directory: 'productCollection',
            name: 'productCollection',
        },
    ],
};
