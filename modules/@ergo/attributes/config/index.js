/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    name: '@ergo/attributes',
    type: 'local',
    aliases: {
        '@Attributes': '/',
    },
    dictionaries: [
        {
            stateProp: 'currencies',
            dataFormat: {},
            requestPath: '/dictionary/currencies',
        },
        {
            stateProp: 'units',
            dataFormat: {},
            requestPath: '/dictionary/units',
        },
        {
            stateProp: 'dateFormats',
            dataFormat: {},
            requestPath: '/dictionary/date_format',
        },
        {
            stateProp: 'attrTypes',
            dataFormat: {},
            requestPath: '/dictionary/attributes/types',
        },
    ],
};
