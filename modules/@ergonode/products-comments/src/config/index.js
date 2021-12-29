/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    name: '@ergonode/products-comments',
    order: 220,
    relations: [
        '@ergonode/core',
        '@ergonode/products',
        '@ergonode/comments',
    ],
    aliases: {
        '@ProductsComments': '/',
    },
};
