/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { COLUMN_WIDTH } from '@Core/defaults/grid';
import { Components } from './imports';

export default {
    dictionaries: [
        {
            stateProp: 'productTypes',
            dataFormat: {},
            requestPath: '/dictionary/product-type',
        },
    ],
    extendComponents: {
        GRID: {
            layout: {
                table: {
                    cells: {
                        data: [
                            {
                                type: 'ATTACHMENT',
                                component: Components.GridAttachedDataCell,
                            },
                        ],
                    },
                    columns: [
                        {
                            type: 'ATTACHMENT',
                            width: COLUMN_WIDTH.DYNAMIC,
                            component: Components.GridAttachedColumn,
                        },
                    ],
                },
            },
        },
    },
};
