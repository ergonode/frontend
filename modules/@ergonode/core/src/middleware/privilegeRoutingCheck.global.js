/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default ({
    route, app, error, store,
}) => {
    const {
        meta: {
            privileges = [],
        },
    } = route;

    if (store.state.authentication.jwt && store.state.authentication.user) {
        if (privileges.length
            && !app.$hasAccess(privileges)) {
            error({
                statusCode: 403,
            });
        }
    }
};
