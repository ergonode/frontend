/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    setCategory,
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
        '@Products/components/Forms/ProductForm': {
            __ALL: [
                {
                    component: Components.ProductFormCategory,
                    props: {},
                },
            ],
        },
    },
    extendMethods: {
        '@Products/store/product/action/getProduct/__after': ({
            $this, data,
        }) => {
            setCategory({
                $this,
                data,
            });
        },
    },
};
