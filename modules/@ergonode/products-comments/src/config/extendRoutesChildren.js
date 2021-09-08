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
} from '@ProductsComments/config/imports';

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
                    title: '@ProductsComments._.routes.editComments',
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
