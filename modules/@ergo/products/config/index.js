/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    name: '@ergo/products',
    type: 'local',
    relations: [
        '@ergo/product-templates',
        '@ergo/comments',
    ],
    aliases: {
        '@Products': '/',
    },
};
