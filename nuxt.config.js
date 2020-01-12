/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
require('dotenv').config({path: '.env'});
const { modulesConfig, inactiveModulesConfig } = require('./plugins/moduleLoader');
const path = require('path');
const pkg = require('./package');
const nuxtConfig = {
    css: modulesConfig.nuxt.css || [],
    styleResources: modulesConfig.nuxt.styleResources || {},
    plugins: modulesConfig.nuxt.plugins || [],
};

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
    loading: { color: '#00BC87', height: '3px' },
    router: {
        middleware: ['modules'],
    },
    css: nuxtConfig.css,
    plugins: nuxtConfig.plugins,
    styleResources: nuxtConfig.styleResources,
    modules: [
        '@nuxtjs/router',
        '@nuxtjs/axios',
        'cookie-universal-nuxt',
        '@nuxtjs/style-resources',
        ['@nuxtjs/component-cache', {maxAge: 1000 * 60 * 60}],
    ],
    axios: {
        credentials: false,
        baseURL: `${process.env.API_PROTOCOL}://${process.env.API_HOST}${process.env.API_PORT ? `:${process.env.API_PORT}` : ''}${process.env.API_PREFIX}`,
    },
    build: {
        parallel: true,
        cssSourceMap: false,
        extend(config, { isDev, isClient }) {
            const alias = config.resolve.alias || {};
            const { aliases = {} } = modulesConfig.nuxt;
            const { aliases: inactiveAliases = {} } = inactiveModulesConfig.nuxt;

            alias['@Root'] = path.join(__dirname, './');
            alias['@Modules'] = path.join(__dirname, '/modules');
            alias['@NodeModules'] = path.join(__dirname, '/node_modules');
            Object.keys(aliases).map((key) => {
                alias[key] = path.join(__dirname, aliases[key]);
            });
            Object.keys(inactiveAliases).map((key) => {
                alias[key] = path.join(__dirname, inactiveAliases[key]);
            });

            if(isClient && isDev) {
                config.devtool = 'source-map';
            }
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
