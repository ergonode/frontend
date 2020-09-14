/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default ({
    app,
}, inject) => {
    const privilegesTypes = prefix => ({
        READ: `${prefix}_READ`,
        UPDATE: `${prefix}_UPDATE`,
        CREATE: `${prefix}_CREATE`,
        DELETE: `${prefix}_DELETE`,
    });
    const hasAccess = (privileges) => {
        const {
            user,
        } = app.store.state.authentication;
        return user && privileges.every(privilege => user.privileges[privilege]);
    };
    const isReadOnly = (prefix) => {
        const types = privilegesTypes(prefix);
        const privileges = [
            types.UPDATE,
            types.CREATE,
            types.DELETE,
        ];
        const {
            user,
        } = app.store.state.authentication;

        return hasAccess([
            types.READ,
        ])
          && !(user && privileges.some(privilege => user.privileges[privilege]));
    };

    inject('hasAccess', privileges => hasAccess(privileges));
    inject('isReadOnly', prefix => isReadOnly(prefix));
};
