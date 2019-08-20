/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default async ({ store, error }) => {
    if (!process.server) {
        store.app.router.beforeEach((to, from, next) => {
            const { user } = store.state.authentication;

            const canIUse = user.privileges.findIndex(
                userPrivilege => userPrivilege === to.meta.permission,
            ) > -1;
            if (to.meta.permission && !canIUse) {
                next(error({ statusCode: 403 }));
            }
            next();
        });
    }
};
