/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    name: '@ergonode/import',
    order: 180,
    relations: [
        '@ergonode/core',
        '@ergonode/notifications',
    ],
    aliases: {
        '@Import': '/',
    },
};
