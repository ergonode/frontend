/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
function registerStore({
    module, moduleName, store,
}) {
    const moduleIsRegistered = store._modules.root._children[moduleName] !== undefined;
    const stateExists = store.state[moduleName];
    if (!moduleIsRegistered) {
        store.registerModule(moduleName, module, {
            preserveState: stateExists,
        });
    }
}

// eslint-disable-next-line no-empty-pattern
export default ({}, inject) => {
    inject('registerStore', registerStore);
};
