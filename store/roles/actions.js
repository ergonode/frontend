/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';

export default {
    setRoleId({ commit }, value) {
        commit(types.SET_ROLE_ID, value);
    },
    setName({ commit }, value) {
        commit(types.SET_ROLE_NAME, value);
    },
    setDescription({ commit }, value) {
        commit(types.SET_ROLE_DESCRIPTION, value);
    },
    setPrivileges({ commit }, value) {
        commit(types.SET_ROLE_PRIVILEGES, value);
    },
    createRole(
        { commit, rootState },
        {
            data,
            onSuccess,
            onError,
        },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$post(`${userLanguageCode}/roles`, data).then(({ id }) => {
            commit('setRoleId', id);
            onSuccess(id);
        }).catch(e => onError(e.data));
    },
    clearStorage({ commit }) {
        commit(types.CLEAR_STORAGE);
    },
};
