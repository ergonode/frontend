/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';

export default {
    setName({ commit }, value) {
        commit(types.SET_ROLE_NAME, value);
    },
    setDescription({ commit }, value) {
        commit(types.SET_ROLE_DESCRIPTION, value);
    },
    setRolePrivileges({ commit }, privileges) {
        commit(types.SET_ROLE_PRIVILEGES, privileges);
    },
    setSelectedRolePrivileges({ commit }, selectedPrivileges) {
        commit(types.SET_SELECTED_ROLE_PRIVILEGES, selectedPrivileges);
    },
    getRoles({ commit, rootState }, params) {
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$get(`${userLanguageCode}/roles`, { params }).then(({ collection: roles }) => {
            commit(types.SET_ROLES, roles.map(({ id, name, description }) => ({
                id,
                key: id,
                value: name,
                hint: description,
            })));
        });
    },
    getRoleById(
        { commit, rootState },
        { roleId },
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
        });
    },
    async createRole(
        { commit, rootState },
        {
            data,
            onSuccess,
            onError,
        },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;

        await this.$setLoader('footerButton');
        await this.app.$axios.$post(`${userLanguageCode}/roles`, data).then(({ id }) => {
            commit(types.SET_ROLE_ID, id);
            onSuccess(id);
        }).catch((e) => onError(e.data));
        await this.$removeLoader('footerButton');
    },
    async updateRole(
        { rootState },
        {
            id,
            data,
            onSuccess,
            onError,
        },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;

        await this.$setLoader('footerButton');
        await this.app.$axios.$put(`${userLanguageCode}/roles/${id}`, data).then(() => onSuccess()).catch((e) => onError(e.data));
        await this.$removeLoader('footerButton');
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
        return this.app.$axios.$delete(`${userLanguageCode}/roles/${id}`).then(() => onSuccess()).catch((e) => onError(e.data));
    },
    clearStorage({ commit }) {
        commit(types.CLEAR_STATE);
    },
};
