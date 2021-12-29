/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

const path = require('path');

module.exports = {
    "stories": [
        "../stories/**/*.stories.mdx",
        "../stories/**/*.stories.@(js|jsx|ts|tsx)"
    ],
    "addons": [
        "@storybook/addon-links",
        "@storybook/addon-essentials"
    ],

    webpackFinal: async (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@Core': path.resolve(__dirname, '../modules/@ergonode/core/src'),
            '@UI': path.resolve(__dirname, '../modules/@ergonode/ui/src'),
        };

        config.module.rules.push({
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader',
                {
                    loader: 'sass-resources-loader',
                    options: {
                        resources: path.resolve(__dirname, '../modules/@ergonode/ui/src/assets/scss/main.scss'),
                    },
                },
            ],
            include: path.resolve(__dirname, '../'),
        });

        config.module.rules.push({
            test: /\.(mjs|jsx?)$/,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: path.resolve(__dirname, '../node_modules/.cache/storybook'),
                        presets: [
                            '@vue/app',
                        ],
                        babelrc: false,
                    },
                },
            ],
            exclude: [
                path.resolve(__dirname, '../node_modules'),
            ],
        });

        return config;
    },
}
