/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';

export default {
    setDefaultLanguage({ commit }, code) {
        commit(types.SET_DEFAULT_LANGUAGE, code);
    },
    setLoader({ commit }, key) {
        commit(types.SET_LOADER, key);
    },
    removeLoader({ commit }, key) {
        commit(types.REMOVE_LOADER, key);
    },
    clearStorage({ commit }) {
        commit(types.CLEAR_STATE);
    },
};
