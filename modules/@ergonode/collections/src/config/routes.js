/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Icons,
    Pages,
    Tabs,
} from '@Collections/config/imports';
import PRIVILEGES from '@Collections/config/privileges';

export const ROUTE_NAME = {
    COLLECTIONS: 'collections',
    COLLECTIONS_GRID: 'collections-grid',
    COLLECTION_EDIT: 'collection-id',
    COLLECTION_EDIT_GENERAL: 'collection-id-general',
    COLLECTION_EDIT_TRANSLATIONS: 'collection-id-translations',
    COLLECTION_EDIT_PRODUCTS: 'collection-id-products',
};

export default [
    {
        name: ROUTE_NAME.COLLECTIONS,
        path: '/collections',
        component: Pages.Collections,
        redirect: {
            name: ROUTE_NAME.COLLECTIONS_GRID,
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
                name: ROUTE_NAME.COLLECTIONS_GRID,
                path: 'grid',
                component: Tabs.CollectionsTab,
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
        name: ROUTE_NAME.COLLECTION_EDIT,
        path: '/collections/collection/:id',
        component: Pages.CollectionEdit,
        redirect: {
            name: ROUTE_NAME.COLLECTION_EDIT_GENERAL,
        },
        meta: {
            isMenu: false,
        },
        children: [
            {
                name: ROUTE_NAME.COLLECTION_EDIT_GENERAL,
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
                            routeName: ROUTE_NAME.COLLECTIONS_GRID,
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: ROUTE_NAME.COLLECTION_EDIT_TRANSLATIONS,
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
                            routeName: ROUTE_NAME.COLLECTIONS_GRID,
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: ROUTE_NAME.COLLECTION_EDIT_PRODUCTS,
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
                            routeName: ROUTE_NAME.COLLECTIONS_GRID,
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
];
