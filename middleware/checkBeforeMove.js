/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default ({ app, error }) => {
    app.router.beforeEach((to, from, next) => {
        if (to.meta.permission && !app.$hasAccess(to.meta.permission)) {
            next(error({ statusCode: 403 }));
        }
        next();
    });
};
