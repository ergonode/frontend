/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    name: '@ergonode/product-batch-actions',
    order: 220,
    relations: [
        '@ergonode/products',
        '@ergonode/attributes',
        '@ergonode/batch-actions',
    ],
    aliases: {
        '@ProductBatchActions': '/',
    },
};
