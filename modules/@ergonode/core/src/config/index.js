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
            src: './plugins/core',
        },
        {
            ssr: false,
            src: './plugins/alerts',
        },
        {
            ssr: true,
            src: './plugins/asyncComputed',
        },
    ],
    css: [
        './assets/scss/reset.scss',
        './assets/scss/font-inter-ui.scss',
    ],
    styleResources: {
        scss: './assets/scss/main.scss',
    },
};
