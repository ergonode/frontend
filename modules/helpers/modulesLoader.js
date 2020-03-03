/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { resolve, join } from 'path';
import { existsSync } from 'fs';
import recursive from 'recursive-readdir';

const DEFAULTS = {
    vendorDir: 'vendor',
    modulesDir: 'modules',
    activeModules: {},
    inactiveModules: {},
    requiredModules: [],
    isDev: false,
};

async function* moduleConfig({
    activeModules, inactiveModules, vendorDir, modulesDir,
}) {
    const _modules = { ...activeModules, ...inactiveModules };

    for (let i = 0; i < Object.keys(_modules).length; i += 1) {
        const moduleName = Object.keys(_modules)[i];
        const type = _modules[moduleName];
        const dirPrefix = type === 'npm' ? vendorDir : modulesDir;
        const path = resolve(this.options.srcDir, dirPrefix, `${moduleName}`, type === 'npm' ? 'src' : '', 'config');

        if (existsSync(path)) {
            yield recursive(path).then(
                files => files.find(file => /\/index\.js/.test(file)),
            ).then((file) => {
                if (file) {
                    const configModules = () => import(`${file}`).then(m => m.default || m);

                    return configModules().then(m => m);
                }
                return null;
            });
        }
    }
}
export default async function modulesLoader(moduleOptions) {
    const configuration = {};
    const options = { ...DEFAULTS, ...this.options.modulesLoader || moduleOptions };

    if (!Object.keys(options.activeModules).length && this.options.ergoModules) {
        options.activeModules = this.options.ergoModules;
    }

    for await (const file of moduleConfig.call(this, options)) {
        if (file) {
            configuration[file.name] = file;
        }
    }
    this.options.modulesConfiguration = configuration;

    // Aliases to inactive modules
    Object.keys(options.inactiveModules).forEach((key) => {
        const { name, type, aliases } = configuration[key];

        this.extendBuild((config) => {
            const alias = config.resolve.alias || {};

            Object.keys(aliases).forEach((a) => {
                alias[a] = (type === 'npm'
                    ? join(name, aliases[a], '/src')
                    : join(this.options.srcDir, `${options.modulesDir}/`, name, aliases[a])
                ).replace(/\/$/g, '');
            });
        });

        if (options.isDev) {
            console.info(`Module [${name}] is inactive.`);
        }
    });

    // Check required modules
    options.requiredModules.forEach((module) => {
        if (!options.activeModules || !Object.keys(options.activeModules).includes(module)) {
            throw Error(`Module [${module}] does not exist.`);
        }
    });

    // Check modules relations
    Object.keys(options.activeModules).forEach((module) => {
        if (configuration[module].relations) {
            configuration[module].relations.forEach((relation) => {
                if (relation && !Object.keys(options.activeModules).includes(relation)) {
                    throw Error(`Module [${module}] has relation with [${relation}].\n Module [${relation}] does not exist.`);
                }
            });
        }
    });
}
