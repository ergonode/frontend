/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default ({
    route, app, error, store,
}) => {
    const { meta } = route;
    if (meta[0] && store.state.authentication.jwt && store.state.authentication.user) {
        const { privileges } = meta[0];
        if (privileges && privileges.length
            && !privileges.every((privilege) => app.$hasAccess(privilege))) {
            error({ statusCode: 403 });
        }
    }
};
