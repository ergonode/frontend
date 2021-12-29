/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    Icons,
    Tabs,
} from '@Products/config/imports';
import {
    GROUP,
    ROUTE_NAME as PRODUCT_ROUTE_NAME,
} from '@Products/config/routes';

export const ROUTE_NAME = {
    PRODUCT_EDIT_VARIANTS: 'product-id-variants',
    PRODUCT_EDIT_GROUPS: 'product-id-groups',
};

export default [
    {
        name: PRODUCT_ROUTE_NAME.PRODUCT_EDIT,
        children: [
            {
                name: ROUTE_NAME.PRODUCT_EDIT_VARIANTS,
                path: 'variants',
                component: Tabs.ProductVariantsTab,
                meta: {
                    title: '@Products._.routes.editVariants',
                    visible: false,
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
            {
                name: ROUTE_NAME.PRODUCT_EDIT_GROUPS,
                path: 'group',
                component: Tabs.ProductGroupTab,
                meta: {
                    title: '@Products._.routes.editGroups',
                    visible: false,
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
