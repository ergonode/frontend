/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getMappedPrivileges,
} from '@Authentication/models/userMapper';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import userRoleService from '@Users/services/roles';

export default {
    async createUnit({
        state, rootState,
    }) {
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;
        const {
            name,
            description,
        } = state;
        const data = {
            name,
            description,
        };
        const id = await userRoleService.create({
            $axios: this.app.$axios,
            languageCode: userLanguageCode,
            data,
        });

        this.app.$addAlert({
            type: ALERT_TYPE.SUCCESS,
            message: 'User role created',
        });

        return id;
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
            commit('__SET_STATE', {
                key: 'privileges',
                value: getMappedPrivileges(privileges),
            });
        });
    },
    async updateRole(
        {
            state,
            rootState,
            commit,
        },
    ) {
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;
        const {
            id,
            name,
            description,
            drafts,
            privileges,
        } = state;
        const privilegesToUpdate = {
            ...privileges,
        };

        Object.keys(drafts).forEach((key) => {
            const [
                rowId,
                columnId,
            ] = key.split('/');

            if (drafts[key]) {
                privilegesToUpdate[`${rowId}_${columnId.toUpperCase()}`] = true;
            } else {
                delete privilegesToUpdate[`${rowId}_${columnId.toUpperCase()}`];
            }
        });
        const data = {
            name,
            description,
            privileges: Object.keys(privilegesToUpdate),
        };

        await userRoleService.update(({
            $axios: this.app.$axios,
            languageCode: userLanguageCode,
            id,
            data,
        }));
        await this.$addAlert({
            type: ALERT_TYPE.SUCCESS,
            message: 'User role updated',
        });
        commit('__SET_STATE', {
            key: 'drafts',
            value: {},
        });
        commit('__SET_STATE', {
            key: 'privileges',
            value: privilegesToUpdate,
        });
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
