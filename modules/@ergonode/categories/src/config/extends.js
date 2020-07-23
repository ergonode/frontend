/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Components,
    Store,
} from './imports';

export default {
    extendStore: {
        product: Store.Product,
    },
    extendComponents: {
        PRODUCT_FORM: [
            {
                component: Components.ExtendProductForm,
                storeStateNames: 'categories',
                props: {},
            },
        ],
    },
};
