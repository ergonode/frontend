/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    name: '@ergonode/ui',
    order: 5,
    aliases: {
        '@UI': '/',
    },
    plugins: [],
    css: [
        './assets/scss/reset.scss',
        './assets/scss/font-inter-ui.scss',
    ],
    styleResources: {
        scss: './assets/scss/main.scss',
    },
};
