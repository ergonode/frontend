/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
require('dotenv').config({ path: '.env' });
const PATH = require('path');
const PKG = require('./package');

const IS_DEV = process.env.NODE_ENV !== 'production';
const BASE_URL = `${process.env.API_PROTOCOL}://${process.env.API_HOST}${process.env.API_PORT ? `:${process.env.API_PORT}` : ''}${process.env.API_PREFIX}`;

module.exports = {
    mode: 'universal',
    dev: IS_DEV,
    head: {
        htmlAttrs: {
            lang: 'en',
        },
        title: 'Ergonode',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'keywords', name: 'keywords', content: PKG.keywords.join(', ') },
            { hid: 'description', name: 'description', content: PKG.description },
        ],
        link: [
            {
                rel: 'icon',
                type: 'image/x-icon',
                sizes: '16x16',
                href: '/images/favicon-16x16.png',
            },
            {
                rel: 'icon',
                type: 'image/x-icon',
                sizes: '32x32',
                href: '/images/favicon-32x32.png',
            },
        ],
    },
    loading: { color: '#00BC87', height: '3px' },
    css: [
        '~assets/scss/plugins-config.scss',
        '~assets/scss/font-inter-ui.scss',
        '~assets/scss/theme.scss',
        '~assets/scss/typography.scss',
    ],
    router: {
        middleware: ['privilegeRoutingCheck', 'redirectToPath'],
    },
    plugins: [
        '~plugins/axios',
        '~plugins/register-store',
        '~plugins/privilege',
        '~plugins/core',
        { mode: 'client', src: '~plugins/alerts' },
    ],
    modules: [
        '@nuxtjs/router',
        '@nuxtjs/axios',
        'cookie-universal-nuxt',
        '@nuxtjs/style-resources',
        [
            '@nuxtjs/component-cache',
            {
                maxAge: 1000 * 60 * 60,
            },
        ],
    ],
    styleResources: {
        scss: '~assets/scss/main.scss',
    },
    axios: {
        baseURL: BASE_URL || 'http://localhost:8000',
    },
    build: {
        parallel: true,
        cssSourceMap: false,
        extend(config) {
            const alias = config.resolve.alias || {};
            alias['@Root'] = PATH.join(__dirname, './');
            alias['@Modules'] = PATH.join(__dirname, '/modules');
            alias['@NodeModules'] = PATH.join(__dirname, '/node_modules');
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
        },
        optimizeCSS: true,
    },
    vue: {
        config: {
            performance: true,
        },
    },
    env: {
        baseURL: BASE_URL,
    },
};
