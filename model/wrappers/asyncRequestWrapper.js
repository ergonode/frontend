/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export function asyncRequestWrapper({
    action, path, params = null, store, error,
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
        onSuccess: () => {},
        onError: (err) => {
            if (err.response && err.response.status === 404) {
                return error({ statusCode: 404, message: err.message });
            }
            return error();
        },
    });
}

export default {
    asyncRequestWrapper,
};
