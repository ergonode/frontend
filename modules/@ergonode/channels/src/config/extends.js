/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    dictionaries: [
        {
            stateProp: 'channels',
            defaultValue: {},
            request: {
                path: '/dictionary/channels',
                config: {},
            },
            dataMapper: response => response,
        },
    ],
};
