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

export default async function registerMiddleware(moduleOptions) {
    let middleware = [];
    const options = { ...DEFAULTS, ...this.options.registerRouter || moduleOptions };

    if (!Object.keys(options.modules).length && this.options.ergoModules) {
        options.modules = this.options.ergoModules;
    }

    for await (const files of findPaths.call(this, 'middleware', /\.global\.js/, options, true)) {
        if (files) middleware = middleware.concat(files);
    }

    this.addTemplate({
        fileName: 'middleware.modules.js',
        src: resolve(__dirname, './templates/middleware.ejs'),
        options: {
            middleware,
        },
    });
}
