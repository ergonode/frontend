/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    setState: (state, { key, value }) => {
        state[key] = value;
    },
    clearStorage: (state) => {
        state.id = null;
        state.avatarId = null;
        state.email = '';
        state.firstName = '';
        state.lastName = '';
        state.language = '';
        state.password = '';
        state.passwordRepeat = '';
    },
};
