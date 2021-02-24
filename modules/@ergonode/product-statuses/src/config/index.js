/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    name: '@ergonode/product-statuses',
    order: 90,
    relations: [
        '@ergonode/core',
        '@ergonode/status-transitions',
        '@ergonode/products',
    ],
    aliases: {
        '@Statuses': '/',
    },
};
