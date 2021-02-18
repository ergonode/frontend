/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    name: '@ergonode/products-batch-actions',
    order: 220,
    relations: [
        '@ergonode/products',
        '@ergonode/batch-actions',
    ],
    aliases: {
        '@ProductsBatchActions': '/',
    },
};
