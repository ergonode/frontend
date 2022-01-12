/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    name: '@ergonode/status-transitions',
    order: 150,
    relations: [
        '@ergonode/core',
        '@ergonode/product-statuses',
        '@ergonode/workflow',
    ],
    aliases: {
        '@Transitions': '/',
    },

};
