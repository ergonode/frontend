/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { resolve, join } from 'path';
import configuration from './config';

export default async function () {
    const {
        name = '',
        type,
        plugins = [],
        css = [],
        styleResources = {},
    } = configuration;
    const moduleName = name.replace(/[^a-zA-Z]/g, '');
    const modulePath = type === 'npm'
        ? `~/vendor/${name}/src`
        : `~/modules/${name}`;

    if (!this.options.styleResources) this.options.styleResources = {};
    if (!this.options.ergoModules) this.options.ergoModules = {};

    this.options.ergoModules[name] = type;

    css.forEach((style) => {
        this.options.css.push(join(modulePath, style));
    });
    Object.keys(styleResources).forEach((resource) => {
        this.options.styleResources[resource] = join(modulePath, styleResources[resource]);
    });
    plugins.forEach(({ ssr, src }) => {
        this.addPlugin({
            src: resolve(__dirname, `${src}.js`),
            fileName: join('modules', moduleName, `${src}.js`),
            ssr,
        });
    });
}
