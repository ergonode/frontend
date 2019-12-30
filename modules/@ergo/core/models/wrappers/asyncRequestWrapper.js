/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export function asyncRequestWrapper({
    action, path, params = null, store,
}) {
    const {
        token,
    } = store.state.authentication;
    const actionParams = {
        path,
        token,
    };
    if (params !== null) {
        actionParams.params = params;
    }
    return store.dispatch(action, {
        ...actionParams,
    });
}

export default {
    asyncRequestWrapper,
};
