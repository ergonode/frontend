/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
require('dotenv').config({ path: '.env' });
const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');
const FS = require('fs');
const PATH = require('path');

const PKG = require('./package');
const { modulesConfig, inactiveModulesConfig } = require('./plugins/moduleLoader');

const NUXT_CONFIG = {
    css: modulesConfig.nuxt.css || [],
    styleResources: modulesConfig.nuxt.styleResources || {},
    plugins: modulesConfig.nuxt.plugins || [],
    chunks: modulesConfig.nuxt.chunks || [],
};
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
    router: {
        middleware: ['modules'],
    },
    hooks: {
        builder: {
            async prepared(builder) {
                console.log(chalk.green(figlet.textSync('Ergonode', { horizontalLayout: 'full' })));
                console.log(chalk.yellow('Select your modules'));

                const options = Object.keys(PKG._availableModules).map(module => (PKG._requiredModules.includes(module)
                    ? { name: module, disabled: 'Required', checked: true }
                    : { name: module, checked: true }));
                const { modules } = await inquirer.prompt([
                    {
                        type: 'checkbox',
                        pageSize: 15,
                        name: 'modules',
                        message: 'Select your modules',
                        choices: options,
                    },
                ]);
                const selectedModules = PKG._requiredModules.concat(modules);
                const inactiveModules = Object.keys(PKG._availableModules).filter(
                    x => !selectedModules.includes(x),
                );
                const moduleStr = array => array.reduce((acc, module, i) => {
                    const tabs = i === 0 ? '' : '\t\t\t\t';
                    const enter = i === array.length - 1 ? '' : '\n';

                    return `${acc}${tabs}'${module}',${enter}`;
                }, '');
                const copyright = FS.readFileSync('./config/.copyright', 'utf8');
                const fileStr = `${copyright}export default {
    active: [
        ${moduleStr(selectedModules)}
    ],${inactiveModules.length ? `\n\t\tinactive: [\n\t\t\t\t${moduleStr(inactiveModules)}\n\t\t],` : ''}
};`;

                const extraFilePath = PATH.join(builder.nuxt.options.buildDir, 'modules.js');
                await FS.writeFileSync(extraFilePath, fileStr);
            },
        },
    },
    css: NUXT_CONFIG.css,
    plugins: NUXT_CONFIG.plugins,
    styleResources: NUXT_CONFIG.styleResources,
    buildModules: [
        '@bleto/ergo-import',
    ],
    modules: [
        ['@nuxtjs/router', {
            keepDefaultRouter: true,
        }],
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
    axios: {
        baseURL: BASE_URL || 'http://localhost:8000',
    },
    build: {
        // terser: {
        //     parallel: true,
        //     sourceMap: true,
        //     exclude: /\/store/,
        //     extractComments: {
        //         filename: 'LICENSES',
        //     },
        //     terserOptions: {
        //         output: {
        //             comments: /^\**!|@preserve|@license|@cc_on/,
        //         },
        //     },
        // },
        // hardSource: true, // TODO: check if it works correctly
        // extractCSS: true, //TODO: check webpack CSS plugins for optimize files
        // optimizeCSS: true,
        extend(config, { isDev, isClient }) {
            const alias = config.resolve.alias || {};
            const { aliases = {} } = modulesConfig.nuxt;
            const { aliases: inactiveAliases = {} } = inactiveModulesConfig.nuxt;

            alias['@Root'] = PATH.join(__dirname, './');
            alias['@Modules'] = PATH.join(__dirname, '/modules');
            Object.keys(aliases).map((key) => {
                alias[key] = aliases[key].type === 'npm' ? aliases[key].path : PATH.join(__dirname, aliases[key].path);
            });
            Object.keys(inactiveAliases).map((key) => {
                alias[key] = PATH.join(__dirname, inactiveAliases[key]);
            });
            if (isDev) {
                config.devtool = isClient ? 'source-map' : 'inline-source-map';
            }
            config.resolve.aliasFields = ['browser'];
            config.resolve.symlinks = false; // this prevents symlinks from breaking the build
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
