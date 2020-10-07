/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Components,
} from './imports';

export default {
    extendComponents: {
        '@Products/components/Tabs/ProductGroupTab/addFromSegment': [
            {
                component: Components.AddProductsFromSegmentToProductGroupModalForm,
                name: 'Add from segment',
            },
        ],
        '@Collections/components/Tabs/collectionProductsTab/addFromSegment': [
            {
                component: Components.AddProductsFromSegmentToCollectioModalForm,
                name: 'Add from segment',
            },
        ],
    },
};
