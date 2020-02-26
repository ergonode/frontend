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
    inactiveModules: {},
    requiredModules: [],
};

async function* moduleConfig({
    modules, inactiveModules, vendorDir, modulesDir,
}) {
    const _modules = { ...modules, ...inactiveModules };

    for (let i = 0; i < Object.keys(_modules).length; i += 1) {
        const moduleName = Object.keys(_modules)[i];
        const type = _modules[moduleName];
        const dirPrefix = type === 'npm' ? vendorDir : modulesDir;
        const path = resolve(this.options.srcDir, dirPrefix, `${moduleName}`, type === 'npm' ? 'src' : '', 'config');

        try {
            yield recursive(path).then(
                files => files.find(file => /\/index\.js/.test(file)),
            ).then((file) => {
                if (file) {
                    const configModules = () => import(`${file}`).then(m => m.default || m);

                    return configModules().then(m => m);
                }
                return null;
            });
        } catch (e) {
            // console.error(e);
        }
    }
}
export default async function modulesLoader(moduleOptions) {
    const configuration = {};
    const options = { ...DEFAULTS, ...this.options.modulesLoader || moduleOptions };

    if (!Object.keys(options.modules).length && this.options.ergoModules) {
        options.modules = this.options.ergoModules;
    }

    for await (const file of moduleConfig.call(this, options)) {
        if (file) {
            configuration[file.name] = file;
        }
    }
    this.options.modulesConfiguration = configuration;

    options.requiredModules.forEach((module) => {
        if (!options.modules || !Object.keys(options.modules).includes(module)) {
            throw Error(`Module [${module}] does not exist.`);
        }
    });
    Object.keys(options.modules).forEach((module) => {
        if (configuration[module].relations) {
            configuration[module].relations.forEach((relation) => {
                if (relation && !Object.keys(options.modules).includes(relation)) {
                    throw Error(`Module [${module}] has relation with [${relation}].\n Module [${relation}] does not exist.`);
                }
            });
        }
    });
}
