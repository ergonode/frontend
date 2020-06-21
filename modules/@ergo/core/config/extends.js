/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    dictionaries: [
        {
            stateProp: 'currencies',
            dataFormat: {},
            requestPath: '/dictionary/currencies',
        },
        {
            stateProp: 'units',
            dataFormat: [],
            requestPath: '/units',
            isGrid: true,
        },
        {
            stateProp: 'dateFormats',
            dataFormat: {},
            requestPath: '/dictionary/date_format',
        },
    ],
};
