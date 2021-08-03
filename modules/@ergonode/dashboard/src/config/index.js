/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    name: '@ergonode/dashboard',
    order: 200,
    aliases: {
        '@Dashboard': '/',
    },
    relations: [
        '@ergonode/categories',
        '@ergonode/attributes',
        '@ergonode/products',
        '@ergonode/product-templates',
    ],
};
