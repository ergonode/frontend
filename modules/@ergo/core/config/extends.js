/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    dictionaries: [
        {
            stateProp: 'languages',
            dataFormat: {},
            requestPath: '/dictionary/languages',
        },
        {
            stateProp: 'languagesTree',
            dataFormat: {},
            requestPath: '/dictionary/languages/tree',
        },
        {
            stateProp: 'allLanguages',
            dataFormat: [],
            requestPath: '/languages',
            isGrid: true,
        },
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
