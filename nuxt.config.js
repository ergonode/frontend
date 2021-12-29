/* eslint-disable no-param-reassign */
/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    join,
} from 'path';
import webpack from 'webpack';

import modulesConfig from './modules.config';
import {
    _requiredModules,
    description,
    keywords,
    version,
} from './package';

const IS_DEV = process.env.NODE_ENV !== 'production';
const PARALLEL = process.env.PARALLEL || false;

module.exports = {
    ssr: true,
    dev: IS_DEV,
    head: {
        htmlAttrs: {
            lang: 'en',
        },
        title: 'Ergonode',
        meta: [
            {
                charset: 'utf-8',
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                hid: 'keywords',
                name: 'keywords',
                content: keywords.join(', '),
            },
            {
                hid: 'description',
                name: 'description',
                content: description,
            },
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
    pageTransition: {
        name: 'page',
        mode: 'out-in',
    },
    loading: {
        color: '#00BC87',
        height: '3px',
    },
    modulesDir: [
        'node_modules',
        'modules',
    ],
    buildModules: [
        '@nuxtjs/html-validator',
        '@ergonode/vuems',
        '@nuxtjs/router',
    ],
    htmlValidator: {
        usePrettier: false,
        options: {
            extends: [
                'html-validate:document',
                'html-validate:recommended',
                'html-validate:standard',
            ],
            rules: {
                'svg-focusable': 'off',
                'no-unknown-elements': 'error',
                // Conflicts or not needed as we use prettier formatting
                'void-style': 'off',
                'no-trailing-whitespace': 'off',
                // Conflict with Nuxt defaults
                'require-sri': 'off',
                'attribute-boolean-style': 'off',
                'doctype-style': 'off',
                // Unreasonable rule
                'no-inline-style': 'off',
            },
        },
    },
    polyfill: {
        features: [
            {
                require: 'intersection-observer',
                detect: () => 'IntersectionObserver' in window,
            },
        ],
    },
    modules: [
        'nuxt-i18n',
        '@nuxtjs/style-resources',
        [
            '@nuxtjs/component-cache',
            {
                maxAge: 1000 * 60 * 60,
            },
        ],
        'cookie-universal-nuxt',
        '@nuxtjs/axios',
        'nuxt-polyfill',
    ],
    vuems: {
        required: _requiredModules,
        modules: modulesConfig,
        vuex: true,
        i18n: [
            'en_GB',
            'pl_PL',
        ],
        isDev: process.env.NODE_ENV !== 'production',
    },
    i18n: {
        locales: [
            'en_GB',
            'pl_PL',
        ],
        defaultLocale: 'en_GB',
        vueI18n: {
            fallbackLocale: 'en_GB',
        },
        parsePages: false,
        vuex: false,
        strategy: 'no_prefix',
    },
    router: {
        middleware: [
            'modulesMiddlewareLoader',
        ],
    },
    axios: {
        baseURL: 'http://localhost:8080',
    },
    alias: {
        '@Vendor': join(__dirname, '/vendor'),
    },
    build: {
        plugins: [
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        ],
        babel: {
            configFile: './babel.config.js',
        },
        parallel: PARALLEL,
        cssSourceMap: true,
        optimizeCSS: true,
        loaders: {
            vue: {
                compilerOptions: {
                    modules: [
                        {
                            preTransformNode(astEl) {
                                if (process.env.NODE_ENV === 'production' && !process.env.LEAVE_TEST_TAG_ATTRS) {
                                    const id = 'data-cy';
                                    const {
                                        attrsMap, attrsList,
                                    } = astEl;

                                    if (attrsMap[id]) {
                                        delete attrsMap[id];

                                        const index = attrsList.findIndex(
                                            x => x.name === id,
                                        );
                                        attrsList.splice(index, 1);
                                    }
                                }
                                return astEl;
                            },
                        },
                    ],
                },
            },
        },
        extend(config, {
            isDev,
            isClient,
        }) {
            if (isDev) {
                config.devtool = isClient ? 'source-map' : 'inline-source-map';
            }

            config.node = {
                fs: 'empty',
            };
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
                maxSize: 249856,
            },
        },
    },
    vue: {
        config: {
            performance: true,
        },
    },

    publicRuntimeConfig: {
        axios: {
            browserBaseURL: process.env.API_BASE_URL,
        },
        NUXT_ENV: process.env.NUXT_ENV || process.env.NODE_ENV || 'development',
        VUE_APP_VERSION: version,
        SHOW_RELEASE_INFO: process.env.SHOW_RELEASE_INFO || false,
        LEAVE_TEST_TAG_ATTRS: process.env.LEAVE_TEST_TAG_ATTRS || true,
    },

    privateRuntimeConfig: {
        axios: {
            baseURL: process.env.API_BASE_URL,
        },
    },
};
