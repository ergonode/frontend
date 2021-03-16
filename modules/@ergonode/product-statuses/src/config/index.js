/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    name: '@ergonode/product-statuses',
    order: 90,
    aliases: {
        '@Statuses': '/',
    },
    relations: [
        '@ergonode/products',
    ],
};
