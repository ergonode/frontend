/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    name: '@ergonode/segments',
    order: 140,
    relations: [
        '@ergonode/conditions',
        '@ergonode/products',
        '@ergonode/collections',
    ],
    aliases: {
        '@Segments': '/',
    },

};
