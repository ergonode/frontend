/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Icons,
    Pages,
    Tabs,
} from './imports';
import PRIVILEGES from './privileges';

export default [
    {
        name: 'collections',
        path: '/collections',
        component: Pages.Collections,
        redirect: {
            name: 'collections-grid',
        },
        meta: {
            title: 'Collections',
            group: {
                title: 'Products',
                menuPosition: 2,
                icon: Icons.Product,
            },
            isMenu: true,
            menuPosition: 3,
            privileges: {
                namespace: PRIVILEGES.PRODUCT_COLLECTION.namespace,
                read: PRIVILEGES.PRODUCT_COLLECTION.read,
            },
        },
        children: [
            {
                name: 'collections-grid',
                path: 'grid',
                component: Tabs.CollectionGridTab,
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
        name: 'collection-id',
        path: '/collections/collection/:id',
        component: Pages.CollectionEdit,
        redirect: {
            name: 'collection-id-general',
        },
        meta: {
            isMenu: false,
        },
        children: [
            {
                name: 'collection-id-general',
                path: 'general',
                component: Tabs.CollectionGeneralTab,
                meta: {
                    title: 'Options',
                    breadcrumbs: [
                        {
                            title: 'Products',
                            icon: Icons.Product,
                        },
                        {
                            title: 'Collections',
                            routeName: 'collections-grid',
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: 'collection-id-translations',
                path: 'translations',
                component: Tabs.CollectionTranslationsTab,
                meta: {
                    title: 'Translations',
                    breadcrumbs: [
                        {
                            title: 'Products',
                            icon: Icons.Product,
                        },
                        {
                            title: 'Collections',
                            routeName: 'collections-grid',
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: 'collection-id-products',
                path: 'products',
                component: Tabs.CollectionProductsTab,
                meta: {
                    title: 'Products',
                    breadcrumbs: [
                        {
                            title: 'Products',
                            icon: Icons.Product,
                        },
                        {
                            title: 'Collections',
                            routeName: 'collections-grid',
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
];
