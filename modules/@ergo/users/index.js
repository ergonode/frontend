/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { resolve, join } from 'path';
import configuration from './config';

export default async function (moduleOptions) {
    const {
        name,
        type,
        aliases = {},
        plugins = [],
    } = configuration;
    const moduleName = name.replace(/[^a-zA-Z]/g, '');

    if (!this.options.ergoModules) this.options.ergoModules = {};

    this.options.ergoModules[name] = type;
    this.extendBuild((config) => {
        const alias = config.resolve.alias || {};

        Object.keys(aliases).forEach((key) => {
            alias[key] = (type === 'npm'
                ? join(moduleOptions.vendorDir, aliases[key], 'src')
                : join(__dirname, aliases[key])
            ).replace(/\/$/g, '');
        });
    });
    plugins.forEach(({ ssr, src }) => {
        this.addPlugin({
            src: resolve(__dirname, `${src}.js`),
            fileName: join('modules', moduleName, `${src}.js`),
            ssr,
        });
    });
}
export const config = configuration;
