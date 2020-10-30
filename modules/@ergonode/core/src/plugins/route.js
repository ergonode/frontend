/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export default ({
    app,
}) => {
    app.router.beforeEach((to, from, next) => {
        app.$clearCancelTokens();

        next();
    });
};
