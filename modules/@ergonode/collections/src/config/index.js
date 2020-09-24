/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    name: '@ergonode/collections',
    order: 130,
    relations: [
        '@ergonode/products',
        '@ergonode/segments',
    ],
    aliases: {
        '@Collections': '/',
    },
};
