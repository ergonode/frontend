/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default ({
    route, app, error, store,
}) => {
    const {
        meta = [],
    } = route;

    if (meta.length) {
        if (store.state.authentication.token && store.state.authentication.user) {
            if (meta[0].privileges && meta[0].privileges.read
                && !app.$hasAccess([
                    meta[0].privileges.read,
                ])) {
                error({
                    statusCode: 403,
                });
            }
        }
    }
};
