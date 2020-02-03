/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    name: '@ergo/comments',
    type: 'component',
    moduleRelations: [],
    nuxt: {
        aliases: {
            '@Comments': '/',
        },
    },
    store: [
        {
            directory: 'comments',
            name: 'comments',
        },
    ],
};
