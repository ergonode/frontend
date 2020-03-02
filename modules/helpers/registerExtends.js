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

async function* extendsPaths({ modules, vendorDir, modulesDir }) {
    for (let i = 0; i < Object.keys(modules).length; i += 1) {
        const moduleName = Object.keys(modules)[i];
        const type = modules[moduleName];
        const dirPrefix = type === 'npm' ? vendorDir : modulesDir;
        const path = resolve(this.options.srcDir, dirPrefix, `${moduleName}`, type === 'npm' ? 'src' : '', 'config');

        try {
            yield recursive(path).then(
                files => files.find(file => /config\/extends\.js/.test(file)),
            );
        } catch (e) {
            // console.error(e);
        }
    }
}
export default async function registerExtends(moduleOptions) {
    const extend = [];
    const options = { ...DEFAULTS, ...this.options.registerRouter || moduleOptions };

    if (!Object.keys(options.modules).length && this.options.ergoModules) {
        options.modules = this.options.ergoModules;
    }

    for await (const file of extendsPaths.call(this, options)) {
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
