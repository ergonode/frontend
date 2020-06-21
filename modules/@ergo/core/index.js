/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    join,
} from 'path';

import configuration from './config';

export default async function ({
    allModules,
}) {
    const {
        name,
        styleResources = {
        },
    } = configuration;

    if (!this.options.styleResources) {
        this.options.styleResources = {
        };
    }

    Object.keys(styleResources).forEach((resource) => {
        this.options.styleResources[resource] = join(
            allModules.find(m => m.name === name).path,
            styleResources[resource],
        ).replace(/\/$/g, '');
    });
}
