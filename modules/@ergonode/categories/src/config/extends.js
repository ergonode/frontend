/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getCategory,
    setCategory,
} from '@Categories/extends/product/methods';

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
        '@Products/store/product/action/updateProduct/__before': ({
            $this,
        }) => getCategory({
            $this,
        }),
        '@Products/store/product/action/createProduct/__before': ({
            $this,
        }) => getCategory({
            $this,
        }),
    },
};
