/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getMappedPrivileges,
} from '@Authentication/models/userMapper';

import {
    types,
} from './mutations';

export default {
    setName({
        commit,
    }, value) {
        commit(types.SET_ROLE_NAME, value);
    },
    setDescription({
        commit,
    }, value) {
        commit(types.SET_ROLE_DESCRIPTION, value);
    },
    setPrivileges({
        commit,
    }, value) {
        commit(types.SET_ROLE_PRIVILEGES, value);
    },
    setPrivilegeDrafts({
        commit,
    }, value) {
        commit(types.SET_ROLE_PRIVILEGE_DRAFTS, value);
    },
    getRoleById(
        {
            commit, rootState,
        },
        {
            roleId,
        },
    ) {
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;
        return this.app.$axios.$get(`${userLanguageCode}/roles/${roleId}`).then(({
            id,
            name = '',
            description = '',
            privileges = [],
        }) => {
            commit(types.SET_ROLE_ID, id);
            commit(types.SET_ROLE_NAME, name);
            commit(types.SET_ROLE_DESCRIPTION, description);
            commit(types.SET_ROLE_PRIVILEGES, getMappedPrivileges(privileges));
        });
    },
    async updateRole(
        {
            rootState,
        },
        {
            id,
            data,
            onSuccess,
            onError,
        },
    ) {
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;

        await this.$setLoader('footerButton');
        await this.app.$axios.$put(`${userLanguageCode}/roles/${id}`, data).then(() => onSuccess()).catch(e => onError(e.data));
        await this.$removeLoader('footerButton');
    },
    removeRole(
        {
            rootState,
        },
        {
            id,
            onSuccess,
            onError,
        },
    ) {
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;
        return this.app.$axios.$delete(`${userLanguageCode}/roles/${id}`).then(() => onSuccess()).catch(e => onError(e.data));
    },
    clearStorage({
        commit,
    }) {
        commit(types.CLEAR_STATE);
    },
};
