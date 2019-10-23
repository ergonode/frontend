/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { GREEN } from '~/assets/scss/_variables/_colors.scss';
require('dotenv').config({path: '.env'});
const path = require('path');
const pkg = require('./package');

module.exports = {
    mode: 'universal',
    head: {
        htmlAttrs: {
            lang: 'en',
        },
        title: 'Ergonode',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: pkg.description},
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
    loading: { color: GREEN, height: '3px' },
    css: [
        '~assets/scss/plugins-config.scss',
        '~assets/scss/font-inter-ui.scss',
        '~assets/scss/theme.scss',
        '~assets/scss/typography.scss',
    ],
    router: {
        middleware: "checkBeforeMove"
    },
    plugins: [
        '~plugins/axios',
        '~plugins/register-store',
        '~plugins/privilege',
        {mode: 'client', src: '~plugins/alerts'},
    ],
    modules: [
        '@nuxtjs/router',
        '@nuxtjs/axios',
        'cookie-universal-nuxt',
        '@nuxtjs/style-resources',
        ['@nuxtjs/component-cache', {maxAge: 1000 * 60 * 60}],
    ],
    styleResources: {
        scss: '~assets/scss/main.scss'
    },
    axios: {
        credentials: false,
        baseURL: `${process.env.API_PROTOCOL}://${process.env.API_HOST}${process.env.API_PORT ? `:${process.env.API_PORT}` : ''}${process.env.API_PREFIX}`,
    },
    build: {
        parallel: true,
        cssSourceMap: false,
        extend(config, ctx) {
            const alias = config.resolve.alias || {};
            alias['@Root'] = path.join(__dirname, './');
            alias['@Modules'] = path.join(__dirname, '/modules');
            alias['@NodeModules'] = path.join(__dirname, '/node_modules');
        },
        optimization: {
            splitChunks: {
                chunks: 'all'
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
        baseURL: `${process.env.API_PROTOCOL}://${process.env.API_HOST}${process.env.API_PORT ? `:${process.env.API_PORT}` : ''}${process.env.API_PREFIX}`,
    },
};
