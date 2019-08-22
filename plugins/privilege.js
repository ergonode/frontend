/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default ({ app }, inject) => {
    inject('canIUse', (privilege) => {
        const { user } = app.store.state.authentication;

        return user.privileges.findIndex(userPrivilege => userPrivilege === privilege) > -1;
    });
};
