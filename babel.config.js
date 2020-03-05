/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
module.exports = {
    env: {
        development: { // development environment transforms
            presets: [
                ['@nuxt/babel-preset-app', { corejs: { version: 3 } }],
            ],
        },
        production: { // development environment transforms
            presets: [
                ['@nuxt/babel-preset-app', { corejs: { version: 3 } }],
            ],
        },
        test: { // test environment transforms
            presets: ['@babel/env'],
            plugins: [
                'dynamic-import-node',
                '@babel/transform-runtime',
            ],
        },
    },
};
