/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Components,
} from './imports';

export default {
    dictionaries: [
        {
            stateProp: 'productTypes',
            dataFormat: {},
            requestPath: '/dictionary/product-type',
        },
    ],
    extendComponents: {
        '@Core/components/Grid/Layout/Table/Cells/Data': {
            PRODUCT_ATTACH: Components.GridProductAttachDataCell,
        },
    },
};
