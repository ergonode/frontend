/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
const path = require("path");

module.exports = {
    presets: ['@storybook/addon-docs/preset'],
    stories: ['../stories/**/*.stories.(js|mdx)'],
    addons: [
        '@storybook/addon-actions',
        '@storybook/addon-links',
        '@storybook/addon-knobs',
    ],
    webpack: async config => {
      config.resolve.alias = {
          ...config.resolve.alias,
          ['@Core']: path.resolve(__dirname, '../modules/@ergo/core'),
      };

      config.module.rules.push({
          test: /\.scss$/,
          loaders: [
              'style-loader',
              'css-loader',
              'sass-loader',
              {
                  loader: 'sass-resources-loader',
                  options: {
                      resources: path.resolve(__dirname, '../modules/@ergo/core/assets/scss/main.scss')
                  }
              }],
          include: path.resolve(__dirname, '../'),
      });

        const mdxRules = config.module.rules.filter(({ test }) => {
            return String(test) === String(/\.mdx$/) || String(test) === String(/\.(stories|story).mdx$/)
        });
        mdxRules.forEach(mdxRule => {
            const [babelLoader] = mdxRule.use.filter(({ loader }) => loader === 'babel-loader');
            babelLoader.options.presets = babelLoader.options.presets.filter(preset => !preset.includes('babel-preset-vue'))
        });

        config.module.rules.push({
            test: /\.(mjs|jsx?)$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    cacheDirectory: path.resolve(__dirname, '../node_modules/.cache/storybook'),
                    presets: ['@vue/app'],
                    babelrc: false
                }
            }],
            exclude: [path.resolve(__dirname, '../node_modules')]
        });

      return config
  },
};
