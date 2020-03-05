/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { join } from 'path';
import dotenv from 'dotenv';
import {
    _requiredModules as REQUIRED_MODULES,
    _availableModules as AVAILABLE_MODULES,
    _vendorDir as VENDOR_DIR,
    _modulesDir as MODULES_DIR,
    keywords as KEYWORDS,
    description as DESCRIPTION,
} from './package';
import _modules from './modules.config';

dotenv.config({ path: '.env' });

const prepareModulesObject = array => array.reduce((acc, current) => {
    const newObject = acc;
    newObject[current] = AVAILABLE_MODULES[current];
    return newObject;
}, {});
const DIR_PREFIX = type => (`~/${type === 'npm' ? VENDOR_DIR : MODULES_DIR}/`);
const ACTIVE_MODULES = prepareModulesObject(_modules.active || []);
const INACTIVE_MODULES = prepareModulesObject(_modules.inactive || []);
const MODULES_TO_LOAD = _modules.active.map((name) => {
    const type = AVAILABLE_MODULES[name];

    return [`${DIR_PREFIX(type)}${name}`];
});
const NPM_MODULES = Object.keys(ACTIVE_MODULES).filter(name => ACTIVE_MODULES[name] === 'npm');
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
            { hid: 'keywords', name: 'keywords', content: KEYWORDS.join(', ') },
            { hid: 'description', name: 'description', content: DESCRIPTION },
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
        '@nuxtjs/router',
        '~/modules/helpers/symlinksCreator',
        '~/modules/helpers/modulesLoader',
        ...MODULES_TO_LOAD,
        '~/modules/helpers/registerRouter',
        '~/modules/helpers/registerExtends',
        '~/modules/helpers/registerMiddleware',
        '~/modules/helpers/registerStore',
    ],
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/style-resources',
        ['@nuxtjs/component-cache', { maxAge: 1000 * 60 * 60 }],
        'cookie-universal-nuxt',
    ],
    modulesLoader: {
        activeModules: ACTIVE_MODULES,
        inactiveModules: INACTIVE_MODULES,
        requiredModules: REQUIRED_MODULES,
        isDev: IS_DEV,
    },
    router: {
        middleware: ['modulesMiddlewareLoader'],
    },
    symlinksCreator: {
        modulesDir: NPM_MODULES,
    },
    registerRouter: {
        modules: ACTIVE_MODULES,
    },
    registerExtends: {
        modules: ACTIVE_MODULES,
    },
    registerMiddleware: {
        modules: ACTIVE_MODULES,
    },
    registerStore: {
        modules: ACTIVE_MODULES,
    },
    axios: {
        baseURL: BASE_URL || 'http://localhost:8000',
    },
    build: {
        terser: {
            parallel: true,
            sourceMap: true,
            // exclude: /\/store/,
            extractComments: {
                filename: 'LICENSES',
            },
            terserOptions: {
                output: {
                    comments: /^\**!|@preserve|@license|@cc_on/,
                },
            },
        },
        // hardSource: true, // TODO: check if it works correctly
        // extractCSS: true, //TODO: check webpack CSS plugins for optimize files
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
            // TODO: finish method to exclude test files
            // config.module.rules.forEach((rule) => {
            //     if (rule.test.toString() === '/\\.jsx?$/i') {
            //         rule.exclude = (file) => file.endsWith('test.js');
            //         // rule.test = (file) => {
            //         //     if (/[\\/](tests|__tests__|__mocks__)[\\/]/.test(file)) {
            //         //         return false;
            //         //     }

            //         //     return /\.jsx?$/i.test(file);
            //         // };
            //     }
            // });
        },
        optimization: { // TODO: remove inactive modules from chunks
            runtimeChunk: 'single',
            minimize: true,
            splitChunks: {
                // chunks: 'all',
                //     name: false,
                // maxInitialRequests: Infinity,
                // minSize: 0,
                maxSize: 200000,
            //     cacheGroups: {
            //         default: false,
            //         tests: {
            //             test(mod) {
            //                 return mod.resource && /[\\/](tests|__tests__)[\\/]/.test(mod.resource);
            //             },
            //             chunks: 'all',
            //             name: 'tests',
            //             enforce: true,
            //             priority: 30,
            //         },
            //         commons: {
            //             test: /node_modules[\\/](vue|vue-loader|vue-router|vuex|vue-meta|core-js|@babel\/runtime|axios|webpack|setimmediate|timers-browserify|process|regenerator-runtime|cookie|js-cookie|is-buffer|dotprop|nuxt\.js)[\\/]/,
            //             chunks: 'all',
            //             name: 'vueLib',
            //             priority: 10,
            //         },
            //         vendors: {
            //             test: /[\\/]node_modules[\\/]/,
            //             chunks: 'all',
            //             name: 'vendors',
            //             enforce: true,
            //         },
            //         modules: {
            //             test(mod) {
            //                 return mod.resource && mod.resource.includes('modules/@ergo');
            //             },
            //             chunks: 'all',
            //             name: 'modules',
            //             enforce: true,
            //             priority: -30,
            //         },
            //         styles: {
            //             test: /\.(css|scss|sass)$/,
            //             name: 'styles',
            //             chunks: 'all',
            //             enforce: true,
            //         },
            //         ...NUXT_CONFIG.chunks,
            //     },
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
    },
};
