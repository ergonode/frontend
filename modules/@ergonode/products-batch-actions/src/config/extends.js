/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    Components,
} from './imports';

export default {
    extendComponents: {
        '@Products/components/Grids/ProductsGrid/actionHeader': {
            __ALL: [
                {
                    component: Components.ProductsBatchActionsButton,
                    props: {},
                },
            ],
        },
    },
};
