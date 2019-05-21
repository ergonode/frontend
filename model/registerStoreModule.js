/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
/* eslint-disable no-underscore-dangle */
export default function ({ module, moduleName, store }) {
    const moduleIsRegistered = store._modules.root._children[moduleName] !== undefined;
    const stateExists = store.state[moduleName];
    if (!moduleIsRegistered) {
        store.registerModule(moduleName, module, { preserveState: stateExists });
    }
}
