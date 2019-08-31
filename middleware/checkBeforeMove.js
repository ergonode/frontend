/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default ({ app, error }) => {
    app.router.beforeEach((to, from, next) => {
        if (to.meta
            && to.meta.privileges && to.meta.privileges.length
            && !to.meta.privileges.every(privilege => app.$hasAccess(privilege))) {
            next(error({ statusCode: 403 }));
        }
        next();
    });
};
