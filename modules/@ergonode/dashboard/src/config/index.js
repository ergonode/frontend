/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    name: '@ergonode/dashboard',
    aliases: {
        '@Dashboard': '/',
    },
    relations: [
        '@ergonode/categories',
        '@ergonode/products',
        '@ergonode/product-templates',
    ],
};
