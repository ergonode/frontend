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
    getRoleById(
        { commit, rootState },
        { roleId, onError },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$get(`${userLanguageCode}/roles/${roleId}`).then(({
            id,
            name = '',
            description = '',
            privileges = [],
        }) => {
            commit(types.SET_ROLE_ID, id);
            commit(types.SET_ROLE_NAME, name);
            commit(types.SET_ROLE_DESCRIPTION, description);
            commit(types.SET_ROLE_PRIVILEGES, privileges);
        }).catch(e => onError(e.data));
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
            commit(types.SET_ROLE_ID, id);
            onSuccess(id);
        }).catch(e => onError(e.data));
    },
    updateRole(
        { rootState },
        {
            id,
            data,
            onSuccess,
            onError,
        },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$put(`${userLanguageCode}/roles/${id}`, data).then(() => onSuccess()).catch(e => onError(e.data));
    },
    removeRole(
        { rootState },
        {
            id,
            onSuccess,
            onError,
        },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$delete(`${userLanguageCode}/roles/${id}`).then(() => onSuccess()).catch(e => onError(e.data));
    },
    clearStorage({ commit }) {
        commit(types.CLEAR_STORAGE);
    },
};
