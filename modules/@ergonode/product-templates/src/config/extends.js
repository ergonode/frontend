/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    Components,
    Store,
} from '@Templates/config/imports';
import {
    getTemplate,
    setTemplate,
} from '@Templates/extends/methods';

export default {
    extendStore: {
        product: Store.Product,
    },
    extendComponents: {
        '@Products/components/Forms/ProductForm': {
            __ALL: [
                {
                    component: Components.ProductFormTemplate,
                    props: {},
                },
            ],
        },
    },
    extendMethods: {
        '@Products/store/product/action/getProduct/__after': ({
            $this, data,
        }) => {
            setTemplate({
                $this,
                data,
            });
        },
        '@Products/store/product/action/updateProduct/__before': ({
            $this,
        }) => getTemplate({
            $this,
        }),
        '@Products/store/product/action/createProduct/__before': ({
            $this,
        }) => getTemplate({
            $this,
        }),
    },
};
