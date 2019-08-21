/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default ({
    isServer, store, error,
}) => {
    if (isServer) return;
    store.app.router.beforeEach((to, from, next) => {
        if (to.meta.permission && !store.app.$canIUse(to.meta.permission)) {
            next(error({ statusCode: 403 }));
        }
        next();
    });
};
