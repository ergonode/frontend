/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { resolve } from 'path';
import recursive from 'recursive-readdir';
import {
    existsSync, ensureDirSync, removeSync, ensureSymlinkSync, chmodSync,
} from 'fs-extra';

const DEFAULTS = {
    vendorDir: 'vendor',
    searchDir: ['node_modules'],
    modulesDir: [],
};

export default function symlinksCreator(moduleOptions) {
    const options = { ...DEFAULTS, ...this.options.symlinksCreator || moduleOptions };
    const vendorDir = resolve(this.options.srcDir, options.vendorDir);
    const { searchDir } = options;
    const modulesDir = Array.isArray(options.modulesDir)
        ? options.modulesDir
        : [options.modulesDir];

    if (!modulesDir.length || !searchDir.length) return false;
    ensureDirSync(vendorDir, 0o2775); // Ensure vendor directory exists

    const modulesLinks = modulesDir.reduce((acc, module) => {
        searchDir.forEach((dir) => {
            const src = resolve(dir, module.src || module);

            if (existsSync(src)) {
                acc.push({
                    src,
                    dst: module.dst || resolve(vendorDir, module),
                });
            }
        });

        return acc;
    }, []);

    // Link vendors
    modulesLinks.forEach(({ src, dst }) => {
        removeSync(dst);
        ensureSymlinkSync(src, dst, 'junction');
    });
    // Change permissions in all linked module files
    modulesLinks.forEach(({ dst }) => {
        recursive(dst, (err, files) => {
            files.forEach(file => chmodSync(file, 0o444)); // files only to read
        });
    });

    return true;
}
