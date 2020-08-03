/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getProductById,
} from '@Categories/extends/methods';

import {
    Components,
    Store,
} from './imports';

export default {
    extendStore: {
        product: Store.Product,
    },
    extendComponents: {
        '@Products/components/Form/ProductForm': [
            {
                component: Components.ExtendProductForm,
                props: {},
            },
        ],
    },
    extendMethods: {
        '@Products/store/product/action/getProductById': getProductById,
        '@Attributes/typeConfig': ({
            state,
        }) => ({
            DATE2: {
                params: {
                    key: 'format',
                    value: state.dictionaries.dateFormats,
                },
                icon: null,
            },
        }),
    },
};
