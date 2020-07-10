/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    name: '@ergonode/products',
    relations: [
        '@ergonode/attributes',
        '@ergonode/segments',
        '@ergonode/collections',
        '@ergonode/product-templates',
    ],
    aliases: {
        '@Products': '/',
    },
};
