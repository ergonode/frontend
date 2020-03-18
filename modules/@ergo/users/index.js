/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { resolve, join } from 'path';
import configuration from './config';

export default async function () {
    const {
        name,
        type,
        plugins = [],
    } = configuration;
    const moduleName = name.replace(/[^a-zA-Z]/g, '');

    if (!this.options.ergoModules) this.options.ergoModules = {};

    this.options.ergoModules[name] = type;

    plugins.forEach(({ ssr, src }) => {
        this.addPlugin({
            src: resolve(__dirname, `${src}.js`),
            fileName: join('modules', moduleName, `${src}.js`),
            ssr,
        });
    });
}
