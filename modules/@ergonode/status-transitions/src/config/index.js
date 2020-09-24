/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    name: '@ergonode/status-transitions',
    order: 150,
    relations: [
        '@ergonode/conditions',
        '@ergonode/product-statuses',
    ],
    aliases: {
        '@Transitions': '/',
    },

};
