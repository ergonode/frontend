/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
require('dotenv').config({path: '.env'});
const path = require('path');
const pkg = require('./package');

module.exports = {
    mode: 'universal',
    /*
  ** Headers of the page
  */
    head: {
        htmlAttrs: {
            lang: 'en',
        },
        title: pkg.name,
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: pkg.description},
        ],
    },

    /*
  ** Customize the progress-bar color
  */
    loading: {color: '#FFFFFF'},

    /*
  ** Global CSS
  */
    css: [
        '~assets/scss/plugins-config.scss',
        '~assets/scss/font-inter-ui.scss',
        '~assets/scss/theme.scss',
        '~assets/scss/typography.scss',
        '~assets/scss/icons.scss',
    ],

    /*
  ** Plugins to load before mounting the App
  */
    plugins: [
        '~plugins/inputAutoWidth',
        '~plugins/directives',
        '~plugins/axios',
        {mode: 'client', src: '~plugins/alerts'},
        {mode: 'client', src: '~plugins/vueTyper'},
    ],

    /*
  ** Nuxt.js modules
  */
    modules: [
        '@nuxtjs/router',
        '@nuxtjs/axios',
        'cookie-universal-nuxt',
        '@nuxtjs/style-resources',
        ['@nuxtjs/component-cache', {maxAge: 1000 * 60 * 60}],
    ],
    styleResources: {
        sass: '~assets/scss/main.scss'
    },
    /*
  ** Axios module configuration
  */
    axios: {
        // debug: true,
        credentials: false,
        baseURL: `${process.env.API_PROTOCOL}://${process.env.API_HOST}${process.env.API_PORT ? `:${process.env.API_PORT}` : ''}${process.env.API_PREFIX}`,
    },
    /*
  ** Build configuration
  */
    build: {
        /*
        ** You can extend webpack config here
        */
        // Enables CSS Source Map support
        parallel: true,
        cssSourceMap: false,
        extend(config, ctx) {
            // const localConfig = config;
            const alias = config.resolve.alias || {};
            alias['@Root'] = path.join(__dirname, '../');
            alias['@Vendors'] = path.join(__dirname, '../modules');
            alias['@Modules'] = path.join(__dirname, '/modules');
            alias['@NodeModules'] = path.join(__dirname, '/node_modules');
        },
    },
    env: {
        baseURL: `${process.env.API_PROTOCOL}://${process.env.API_HOST}${process.env.API_PORT ? `:${process.env.API_PORT}` : ''}${process.env.API_PREFIX}`,
    },
};
