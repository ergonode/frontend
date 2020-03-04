/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
const path = require("path");

module.exports = {
    module: {
        rules: [
            {
                test: /\.s?css$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader'],
                include: path.resolve(__dirname, '../')
            }
        ]
    },
    resolve: {
        alias: {
            '@': path.dirname(path.resolve(__dirname))
        }
    }
};
