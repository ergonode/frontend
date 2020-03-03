/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import { resolve } from 'path';
import { existsSync } from 'fs';
import recursive from 'recursive-readdir';

export async function* findPaths(
    dirName,
    regExp,
    { modules, vendorDir, modulesDir },
    filter = false,
) {
    for (let i = 0; i < Object.keys(modules).length; i += 1) {
        const moduleName = Object.keys(modules)[i];
        const type = modules[moduleName];
        const dirPrefix = type === 'npm' ? vendorDir : modulesDir;
        const path = resolve(this.options.srcDir, dirPrefix, `${moduleName}`, type === 'npm' ? 'src' : '', dirName);

        if (existsSync(path)) {
            yield recursive(path).then(
                (files) => {
                    if (filter) {
                        return files.filter(file => regExp.test(file));
                    }
                    return files.find(file => regExp.test(file));
                },
            );
        }
    }
}
