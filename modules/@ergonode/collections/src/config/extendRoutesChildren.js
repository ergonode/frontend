/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    GROUP,
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
                    title: '@Collections._.routes.editCollections',
                    breadcrumbs: [
                        {
                            title: GROUP.title,
                            icon: Icons.Product,
                        },
                        {
                            title: '@Products._.routes.title',
                            routeName: PRODUCT_ROUTE_NAME.PRODUCTS_CATALOG,
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
];
