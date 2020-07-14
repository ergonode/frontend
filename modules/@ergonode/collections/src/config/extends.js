/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Icons,
    Tabs,
} from './imports';

export default {
    extendTabs: [
        {
            name: 'product-id', // existing router name what we want extend
            children: [ // array with router to extend
                {
                    name: 'product-id-collections',
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
                                routeName: 'catalog-products',
                            },
                        ],
                        privileges: [],
                    },
                },
            ],
        },
    ],
};
