/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { resolve } from 'path';
import { findPaths } from '../../models/modulesHelper';

const DEFAULTS = {
    vendorDir: 'vendor',
    modulesDir: 'modules',
    modules: {},
};

export default async function registerExtends(moduleOptions) {
    const extend = [];
    const options = { ...DEFAULTS, ...this.options.registerRouter || moduleOptions };

    if (!Object.keys(options.modules).length && this.options.ergoModules) {
        options.modules = this.options.ergoModules;
    }

    for await (const file of findPaths.call(this, 'config', /extends\.js/, options)) {
        if (file) extend.push(file);
    }

    this.addTemplate({
        fileName: 'extends.modules.js',
        src: resolve(__dirname, './templates/extends.ejs'),
        options: {
            extend,
        },
    });
    this.addPlugin({
        fileName: 'modules.js',
        src: resolve(__dirname, './templates/modules.ejs'),
    });
}
