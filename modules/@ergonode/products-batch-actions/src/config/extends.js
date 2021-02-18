/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    Components,
} from './imports';

export default {
    extendComponents: {
        '@Products/components/Grids/ProductsGrid/actionHeader': [
            {
                component: Components.ProductsBatchActionsButton,
                props: {},
            },
        ],
    },
};
