/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Components,
} from './imports';

export default {
    extendComponents: {
        PRODUCT_GROUP_ADD_PRODUCTS: [
            {
                component: Components.AddProductsFromSegmentToProductGroupModalForm,
                name: 'Add from segment',
            },
        ],
        COLLECTIONS_ADD_PRODUCTS: [
            {
                component: Components.AddProductsFromSegmentToCollectioModalForm,
                name: 'Add from segment',
            },
        ],
    },
};
