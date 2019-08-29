/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default ({ app }, inject) => {
    inject('hasAccess', (privileges) => {
        const privilegesArray = Array.isArray(privileges) ? privileges : [privileges];
        const { user } = app.store.state.authentication;
        return privilegesArray.every(privilege => user.privileges.includes(privilege));
    });
};
