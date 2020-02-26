/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { resolve } from 'path';
import recursive from 'recursive-readdir';

const DEFAULTS = {
    vendorDir: 'vendor',
    modulesDir: 'modules',
    modules: {},
};

async function* middlewarePaths({ modules, vendorDir, modulesDir }) {
    for (let i = 0; i < Object.keys(modules).length; i += 1) {
        const moduleName = Object.keys(modules)[i];
        const type = modules[moduleName];
        const dirPrefix = type === 'npm' ? vendorDir : modulesDir;
        const path = resolve(this.options.srcDir, dirPrefix, `${moduleName}`, type === 'npm' ? 'src' : '', 'middleware');

        try {
            yield recursive(path).then(files => files);
        } catch (e) {
            // console.error(e);
        }
    }
}
export default async function registerMiddleware(moduleOptions) {
    let middleware = [];
    const options = { ...DEFAULTS, ...this.options.registerRouter || moduleOptions };

    if (!Object.keys(options.modules).length && this.options.ergoModules) {
        options.modules = this.options.ergoModules;
    }

    for await (const files of middlewarePaths.call(this, options)) {
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
