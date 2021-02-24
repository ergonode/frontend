/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    Icons,
    Tabs,
} from '@Comments/config/imports';
import {
    ROUTE_NAME as PRODUCT_ROUTE_NAME,
} from '@Products/config/routes';

export const ROUTE_NAME = {
    PRODUCT_EDIT_COMMENTS: 'product-id-comments',
};

export default [
    {
        name: PRODUCT_ROUTE_NAME.PRODUCT_EDIT,
        children: [
            {
                name: ROUTE_NAME.PRODUCT_EDIT_COMMENTS,
                path: 'comments',
                component: Tabs.ProductCommentsTab,
                meta: {
                    title: 'Comments',
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
