/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    name: '@ergo/status-transitions',
    type: 'local',
    relations: [
        '@ergo/conditions',
        '@ergo/product-statuses',
    ],
    aliases: {
        '@Transitions': '/',
    },

};
