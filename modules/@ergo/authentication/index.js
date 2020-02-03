/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export default {
    name: '@ergo/authentication',
    type: 'component',
    nuxt: {
        aliases: {
            '@Authentication': '/',
        },
    },
    store: [
        {
            directory: 'authentication',
            name: 'authentication',
        },
    ],
};
