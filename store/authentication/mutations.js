/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    setAction(state, { key, value }) {
        state[key] = value;
    },
    clearStorage: (state) => {
        state.jwt = null;
        state.user = null;
    },
};
