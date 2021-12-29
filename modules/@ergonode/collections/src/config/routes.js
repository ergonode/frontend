/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Icons,
    Pages,
    Tabs,
} from '@Collections/config/imports';
import PRIVILEGES from '@Collections/config/privileges';

export const GROUP = {
    id: 'products',
    title: '@Collections._.routes.group',
};
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
            title: '@Collections._.routes.title',
            group: {
                id: GROUP.id,
                title: GROUP.title,
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
                    title: '@Collections._.routes.editGeneral',
                    breadcrumbs: [
                        {
                            title: GROUP.title,
                            icon: Icons.Product,
                        },
                        {
                            title: '@Collections._.routes.title',
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
                    title: '@Collections._.routes.editTranslation',
                    breadcrumbs: [
                        {
                            title: GROUP.title,
                            icon: Icons.Product,
                        },
                        {
                            title: '@Collections._.routes.title',
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
                    title: '@Collections._.routes.editProducts',
                    breadcrumbs: [
                        {
                            title: GROUP.title,
                            icon: Icons.Product,
                        },
                        {
                            title: '@Collections._.routes.title',
                            routeName: ROUTE_NAME.COLLECTIONS_GRID,
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
];
