/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    name: '@ergo/core',
    type: 'local',
    aliases: {
        '@Core': '/',
    },
    relations: [
        '@ergo/attributes',
    ],
    plugins: [
        { ssr: true, src: './plugins/axios' },
        { ssr: true, src: './plugins/register-store' },
        { ssr: true, src: './plugins/core' },
        { ssr: false, src: './plugins/alerts' },
    ],
    css: [
        './assets/scss/reset.scss',
        './assets/scss/font-inter-ui.scss',
        './assets/scss/typography.scss',
        './assets/scss/input/input.scss',
    ],
    styleResources: {
        scss: './assets/scss/main.scss',
    },
};
