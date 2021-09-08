/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    name: '@ergonode/products',
    order: 70,
    relations: [
        '@ergonode/core',
        '@ergonode/attributes',
        '@ergonode/product-templates',
        '@ergonode/segments',
    ],
    aliases: {
        '@Products': '/',
    },
};
