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

export default async function registerRouter(moduleOptions) {
    const router = [];
    const options = { ...DEFAULTS, ...this.options.registerRouter || moduleOptions };

    if (!Object.keys(options.modules).length && this.options.ergoModules) {
        options.modules = this.options.ergoModules;
    }

    for await (const file of findPaths.call(this, 'config', /routes\.js/, options)) {
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
