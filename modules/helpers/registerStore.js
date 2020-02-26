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

async function* storePaths({ modules, vendorDir, modulesDir }) {
    for (let i = 0; i < Object.keys(modules).length; i += 1) {
        const moduleName = Object.keys(modules)[i];
        const type = modules[moduleName];
        const dirPrefix = type === 'npm' ? vendorDir : modulesDir;
        const path = resolve(this.options.srcDir, dirPrefix, `${moduleName}`, type === 'npm' ? 'src' : '', 'store');

        try {
            yield recursive(path).then(
                files => files.filter(file => /\/index\.js/.test(file)),
            );
        } catch (e) {
            // console.error(e);
        }
    }
}
export default async function registerStore(moduleOptions) {
    const store = [];
    const options = { ...DEFAULTS, ...this.options.registerRouter || moduleOptions };

    if (!Object.keys(options.modules).length && this.options.ergoModules) {
        options.modules = this.options.ergoModules;
    }

    for await (const files of storePaths.call(this, options)) {
        if (files) {
            files.forEach((file) => {
                const storeName = file.split('/');

                store.push({ name: storeName[storeName.length - 2], path: file });
            });
        }
    }

    this.addTemplate({
        fileName: 'store.modules.js',
        src: resolve(__dirname, './templates/store.ejs'),
        options: {
            store,
        },
    });
}
