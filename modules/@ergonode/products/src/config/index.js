/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    name: '@ergonode/products',
    relations: [
        '@ergonode/product-templates',
        '@ergonode/comments',
    ],
    aliases: {
        '@Products': '/',
    },
};
