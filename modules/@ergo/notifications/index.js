/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import configuration from './config';

export default async function () {
    const {
        name,
        type,
    } = configuration;

    if (!this.options.ergoModules) this.options.ergoModules = {};

    this.options.ergoModules[name] = type;
}
