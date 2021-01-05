/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    ROUTE_NAME as PRODUCT_ROUTE_NAME,
} from '@Products/config/routes';

import {
    Icons,
    Tabs,
} from './imports';

export const ROUTE_NAME = {
    PRODUCT_EDIT_COLLECTIONS: 'product-id-collections',
};

export default [
    {
        name: PRODUCT_ROUTE_NAME.PRODUCT_EDIT,
        children: [
            {
                name: ROUTE_NAME.PRODUCT_EDIT_COLLECTIONS,
                path: 'collections',
                component: Tabs.ProductCollectionTab,
                meta: {
                    title: 'Collections',
                    breadcrumbs: [
                        {
                            title: 'Products',
                            icon: Icons.Product,
                        },
                        {
                            title: 'Catalog',
                            routeName: PRODUCT_ROUTE_NAME.PRODUCTS_CATALOG,
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
];
