/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';

export default {
    setTitle({ commit }, value) {
        commit(types.SET_TITLE, value);
    },
    clearStorage({ commit }) {
        commit(types.CLEAR_STATE);
    },
};
