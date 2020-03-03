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

export default async function registerStore(moduleOptions) {
    const store = [];
    const options = { ...DEFAULTS, ...this.options.registerRouter || moduleOptions };

    if (!Object.keys(options.modules).length && this.options.ergoModules) {
        options.modules = this.options.ergoModules;
    }

    for await (const files of findPaths.call(this, 'store', /index\.js/, options, true)) {
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
