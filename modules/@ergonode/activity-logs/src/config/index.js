/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    name: '@ergonode/activity-logs',
    order: 110,
    relations: [
        '@ergonode/users',
    ],
    aliases: {
        '@ActivityLogs': '/',
    },
};
