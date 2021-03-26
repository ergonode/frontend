/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    name: '@ergonode/roles',
    order: 35,
    relations: [
        '@ergonode/core',
        '@ergonode/users',
    ],
    aliases: {
        '@Roles': '/',
    },
};
