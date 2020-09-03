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
            commit,
        },
        {
            roleId,
        },
    ) {
        return this.app.$axios.$get(`roles/${roleId}`).then(({
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
        {},
        {
            id,
            data,
            onSuccess,
            onError,
        },
    ) {
        await this.$setLoader('footerButton');
        await this.app.$axios.$put(`roles/${id}`, data).then(() => onSuccess()).catch(e => onError(e.data));
        await this.$removeLoader('footerButton');
    },
    removeRole(
        {},
        {
            id,
            onSuccess,
            onError,
        },
    ) {
        return this.app.$axios.$delete(`roles/${id}`).then(() => onSuccess()).catch(e => onError(e.data));
    },
};
