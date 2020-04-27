/* eslint-disable no-param-reassign */
/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { join } from 'path';
import dotenv from 'dotenv';
import getRepoInfo from 'git-repo-info';
import { keywords, description, version } from './package';
import modulesConfig from './modules.config';

dotenv.config({ path: '.env' });

const IS_DEV = process.env.NODE_ENV !== 'production';
const BASE_URL = process.env.API_BASE_URL || 'http://localhost:8000';

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
            { hid: 'keywords', name: 'keywords', content: keywords.join(', ') },
            { hid: 'description', name: 'description', content: description },
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
    modulesDir: ['node_modules', 'modules'],
    buildModules: [
        '@ergonode/vuems',
        '@nuxtjs/router',
    ],
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/style-resources',
        ['@nuxtjs/component-cache', { maxAge: 1000 * 60 * 60 }],
        'cookie-universal-nuxt',
    ],
    vuems: {
        required: [
            '@ergo/core',
            '@ergo/authentication',
            '@ergo/users',
        ],
        modules: modulesConfig,
        isDev: process.env.NODE_ENV !== 'production',
    },
    router: {
        middleware: ['modulesMiddlewareLoader'],
    },
    axios: {
        baseURL: BASE_URL || 'http://localhost:8000',
    },
    build: {
        babel: {
            configFile: './babel.config.js',
        },
        parallel: true,
        cssSourceMap: false,
        optimizeCSS: true,
        extend(config, { isDev, isClient }) {
            const alias = config.resolve.alias || {};

            alias['@Root'] = join(__dirname, './');
            alias['@Modules'] = join(__dirname, '/modules');
            alias['@Vendor'] = join(__dirname, '/vendor');

            if (isDev) {
                config.devtool = isClient ? 'source-map' : 'inline-source-map';
            }
            config.module.rules.push(
                {
                    test: /\.ejs$/,
                    loader: 'ejs-loader',
                },
            );
            config.node = {
                fs: 'empty',
            };

            for (let i = 0; i < config.plugins.length; i += 1) {
                if (config.plugins[i].constructor.name === 'HtmlWebpackPlugin') {
                    config.plugins[i].options.chunksSortMode = 'none';
                }
            }
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
                maxSize: 200000,
            },
        },
    },
    vue: {
        config: {
            performance: true,
        },
    },
    env: {
        baseURL: BASE_URL,
        NUXT_ENV: process.env.NUXT_ENV || process.env.NODE_ENV || 'development',
        VUE_APP_VERSION: version,
        VUE_APP_GIT_INFO: getRepoInfo(),
        SHOW_RELEASE_INFO: process.env.SHOW_RELEASE_INFO || false,
    },
};
