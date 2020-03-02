/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    name: '@ergo/users',
    type: 'local',
    aliases: {
        '@Users': '/',
    },
    plugins: [
        { ssr: true, src: './plugins/privilege' },
    ],
};
