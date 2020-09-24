/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    name: '@ergonode/categories',
    order: 60,
    aliases: {
        '@Categories': '/',
    },
    relations: [
        '@ergonode/products',
    ],
};
