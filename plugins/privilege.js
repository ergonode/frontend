/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default ({ app }, inject) => {
    const privilegesTypes = prefix => ({
        READ: `${prefix}_READ`,
        UPDATE: `${prefix}_UPDATE`,
        CREATE: `${prefix}_CREATE`,
        DELETE: `${prefix}_DELETE`,
    });
    const hasAccess = (privileges) => {
        const privilegesArray = Array.isArray(privileges) ? privileges : [privileges];
        const { user } = app.store.state.authentication;
        return privilegesArray.every(privilege => user.privileges.includes(privilege));
    };
    const isReadOnly = (prefix) => {
        const types = privilegesTypes(prefix);
        return hasAccess(types.READ)
          && !hasAccess(types.UPDATE)
          && !hasAccess(types.CREATE)
          && !hasAccess(types.DELETE);
    };

    inject('hasAccess', privileges => hasAccess(privileges));
    inject('isReadOnly', prefix => isReadOnly(prefix));
};
