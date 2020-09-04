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
    setPrivileges({
        commit,
    }, value) {
        commit(types.SET_ROLE_PRIVILEGES, value);
    },
    getRole(
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
            commit('__SET_STATE', {
                key: 'id',
                value: id,
            });
            commit('__SET_STATE', {
                key: 'name',
                value: name,
            });
            commit('__SET_STATE', {
                key: 'description',
                value: description,
            });
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
};
