/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    isObject,
} from '@Core/models/objectWrapper';

import {
    types,
} from './mutations';

export default {
    setAction({
        commit,
    }, payload) {
        commit(types.SET_STATE, payload);
    },
    setLanguagePrivileges({
        commit,
    }, privileges) {
        commit(types.SET_STATE, {
            key: 'languagePrivilegesCollection',
            value: isObject(privileges)
                ? {
                    ...privileges,
                }
                : privileges,
        });
    },
    setLanguagePrivilegesDrafts({
        commit,
    }, value) {
        commit(types.SET_STATE, {
            key: 'drafts',
            value,
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
            commit(types.SET_STATE, {
                key: 'id',
                value: id,
            });
            commit(types.SET_STATE, {
                key: 'avatarId',
                value: avatar_id,
            });
            commit(types.SET_STATE, {
                key: 'email',
                value: email,
            });
            commit(types.SET_STATE, {
                key: 'firstName',
                value: first_name,
            });
            commit(types.SET_STATE, {
                key: 'lastName',
                value: last_name,
            });
            commit(types.SET_STATE, {
                key: 'language',
                value: getActiveLanguageByCode(language).name,
            });
            commit(types.SET_STATE, {
                key: 'password',
                value: password,
            });
            commit(types.SET_STATE, {
                key: 'passwordRepeat',
                value: password_repeat,
            });
            commit(types.SET_STATE, {
                key: 'isActive',
                value: is_active,
            });
            commit(types.SET_STATE, {
                key: 'languagePrivilegesCollection',
                value: isObject(language_privileges_collection)
                    ? {
                        ...language_privileges_collection,
                    }
                    : language_privileges_collection,
            });
            commit(types.SET_STATE, {
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
    clearStorage({
        commit,
    }) {
        commit(types.CLEAR_STATE);
    },
};
