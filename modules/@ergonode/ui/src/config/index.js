/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    name: '@ergonode/ui',
    order: 5,
    relations: [
        '@ergonode/core',
    ],
    aliases: {
        '@UI': '/',
    },
    css: [
        './assets/scss/reset.scss',
        './assets/scss/font-inter-ui.scss',
        './assets/scss/global.scss',
    ],
    styleResources: {
        scss: './assets/scss/main.scss',
    },
    plugins: [
        {
            ssr: true,
            src: './plugins/global-component-loader',
        },
    ],
};
