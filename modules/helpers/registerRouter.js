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

async function* routerPaths({ modules, vendorDir, modulesDir }) {
    for (let i = 0; i < Object.keys(modules).length; i += 1) {
        const moduleName = Object.keys(modules)[i];
        const type = modules[moduleName];
        const dirPrefix = type === 'npm' ? vendorDir : modulesDir;
        const path = resolve(this.options.srcDir, dirPrefix, `${moduleName}`, type === 'npm' ? 'src' : '', 'config');

        try {
            yield recursive(path).then(
                files => files.find(file => /config\/routes\.js/.test(file)),
            );
        } catch (e) {
            // console.error(e);
        }
    }
}
export default async function registerRouter(moduleOptions) {
    const router = [];
    const options = { ...DEFAULTS, ...this.options.registerRouter || moduleOptions };

    if (!Object.keys(options.modules).length && this.options.ergoModules) {
        options.modules = this.options.ergoModules;
    }

    for await (const file of routerPaths.call(this, options)) {
        if (file) router.push(file);
    }

    this.addTemplate({
        fileName: 'router.modules.js',
        src: resolve(__dirname, './templates/router.ejs'),
        options: {
            router,
        },
    });
}
