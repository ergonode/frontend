/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export default {
    dictionaries: [
        {
            stateProp: 'sources',
            defaultValue: {},
            request: {
                path: '/dictionary/sources',
                config: {},
            },
            dataMapper: response => response,
        },
    ],
};
