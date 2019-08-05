/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
function registerStore({ module, moduleName, store }) {
    // eslint-disable-next-line no-underscore-dangle
    const moduleIsRegistered = store._modules.root._children[moduleName] !== undefined;
    const stateExists = store.state[moduleName];
    if (!moduleIsRegistered) {
        store.registerModule(moduleName, module, { preserveState: stateExists });
    }
}

// eslint-disable-next-line no-unused-vars
export default ({ app }, inject) => {
    inject('registerStore', registerStore);
};
