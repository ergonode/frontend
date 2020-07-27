/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    isObject,
} from '@Core/models/objectWrapper';

export default {
    setLanguagePrivileges({
        commit,
    }, privileges) {
        commit('__SET_STATE', {
            key: 'languagePrivilegesCollection',
            value: isObject(privileges)
                ? {
                    ...privileges,
                }
                : privileges,
        });
    },
    getUserById(
        {
            commit, rootState, rootGetters,
        },
        {
            userId, onError = () => {},
        },
    ) {
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;
        const getActiveLanguageByCode = rootGetters['core/getActiveLanguageByCode'];

        return this.app.$axios.$get(`${userLanguageCode}/accounts/${userId}`).then(({
            id,
            email = '',
            avatar_id = '',
            first_name = '',
            last_name = '',
            language = '',
            password = '',
            password_repeat = '',
            is_active = false,
            role_id,
            language_privileges_collection = null,
        }) => {
            commit('__SET_STATE', {
                key: 'id',
                value: id,
            });
            commit('__SET_STATE', {
                key: 'avatarId',
                value: avatar_id,
            });
            commit('__SET_STATE', {
                key: 'email',
                value: email,
            });
            commit('__SET_STATE', {
                key: 'firstName',
                value: first_name,
            });
            commit('__SET_STATE', {
                key: 'lastName',
                value: last_name,
            });
            commit('__SET_STATE', {
                key: 'language',
                value: getActiveLanguageByCode(language).name,
            });
            commit('__SET_STATE', {
                key: 'password',
                value: password,
            });
            commit('__SET_STATE', {
                key: 'passwordRepeat',
                value: password_repeat,
            });
            commit('__SET_STATE', {
                key: 'isActive',
                value: is_active,
            });
            commit('__SET_STATE', {
                key: 'languagePrivilegesCollection',
                value: isObject(language_privileges_collection)
                    ? {
                        ...language_privileges_collection,
                    }
                    : language_privileges_collection,
            });
            commit('__SET_STATE', {
                key: 'role',
                value: role_id,
            });
        }).catch(onError);
    },
    async updateUser(
        {
            rootState,
        },
        {
            id, data, avatarId,
        },
    ) {
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;

        await Promise.all([
            this.app.$axios.$put(`${userLanguageCode}/accounts/${id}`, data),
            this.app.$axios.$put(`${userLanguageCode}/accounts/${id}/avatar`, {
                multimedia: avatarId,
            }),
        ]);
    },
};
