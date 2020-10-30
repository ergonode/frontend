/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    name: '@ergonode/core',
    order: 10,
    aliases: {
        '@Core': '/',
    },
    relations: [
        '@ergonode/ui',
        '@ergonode/attributes',
        '@ergonode/media',
    ],
    plugins: [
        {
            ssr: true,
            src: './plugins/axios',
        },
        {
            ssr: true,
            src: './plugins/register-store',
        },
        {
            ssr: true,
            src: './plugins/route',
        },
        {
            ssr: true,
            src: './plugins/core',
        },
        {
            ssr: false,
            src: './plugins/alerts',
        },
    ],
};
