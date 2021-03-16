/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    name: '@ergonode/users',
    order: 30,
    aliases: {
        '@Users': '/',
    },
    plugins: [
        {
            ssr: true,
            src: './plugins/privilege',
        },
    ],
};
