/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    isObject,
} from '@Core/models/objectWrapper';
import {
    create,
    get,
    remove,
    update,
} from '@Users/services/user/index';
import deepmerge from 'deepmerge';

export default {
    async getUser(
        {
            commit,
            rootGetters,
        },
        {
            id,
        },
    ) {
        const getActiveLanguageByCode = rootGetters['core/getActiveLanguageByCode'];
        const {
            email = '',
            avatar_filename = '',
            first_name = '',
            last_name = '',
            language = '',
            password = '',
            password_repeat = '',
            is_active = false,
            role_id,
            language_privileges_collection = null,
        } = await get({
            $axios: this.app.$axios,
            id,
        });

        commit('__SET_STATE', {
            key: 'id',
            value: id,
        });
        commit('__SET_STATE', {
            key: 'avatarId',
            value: avatar_filename ? avatar_filename.split('.')[0] : '',
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
            key: 'languageCode',
            value: language,
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
    },
    async updateUser(
        {
            state,
            commit,
            dispatch,
            rootState,
            rootGetters,
        },
        {
            onSuccess,
            onError,
        },
    ) {
        try {
            const {
                id,
                firstName,
                lastName,
                language,
                password,
                passwordRepeat,
                isActive,
                role,
                drafts,
                languagePrivilegesCollection,
            } = state;
            const getActiveLanguageByName = rootGetters['core/getActiveLanguageByName'];
            const getActiveLanguageByCode = rootGetters['core/getActiveLanguageByCode'];
            const activeLanguages = Object.keys(languagePrivilegesCollection)
                .reduce((acc, languageCode) => {
                    const languages = acc;

                    if (getActiveLanguageByCode(languageCode).name) {
                        languages[languageCode] = languagePrivilegesCollection[languageCode];
                    }
                    return languages;
                }, {});

            const mappedDrafts = {};

            Object.keys(drafts).forEach((key) => {
                const [
                    languageCode,
                    privilege,
                ] = key.split('/');

                if (typeof mappedDrafts[languageCode] === 'undefined') {
                    mappedDrafts[languageCode] = {};
                }

                mappedDrafts[languageCode][privilege] = Boolean(drafts[key]);
            });

            const data = {
                firstName,
                lastName,
                language: getActiveLanguageByName(language).code,
                password,
                passwordRepeat,
                roleId: role,
                isActive,
                languagePrivilegesCollection: deepmerge(
                    activeLanguages,
                    mappedDrafts,
                ),
            };

            await update({
                $axios: this.app.$axios,
                id,
                data,
            });

            commit('__SET_STATE', {
                key: 'languagePrivilegesCollection',
                value: data.languagePrivilegesCollection,
            });

            if (rootState.authentication.user.id === id) {
                dispatch('authentication/getUser', {
                    root: true,
                });
            }

            onSuccess();
        } catch (e) {
            onError(e.data);
        }
    },
    async createUser(
        {
            state,
            rootGetters,
        },
        {
            onSuccess,
            onError,
        },
    ) {
        try {
            const {
                email,
                firstName,
                lastName,
                password,
                passwordRepeat,
                role,
                isActive,
                language,
            } = state;
            const getActiveLanguageByName = rootGetters['core/getActiveLanguageByName'];
            const data = {
                email,
                firstName,
                lastName,
                password,
                passwordRepeat,
                language: getActiveLanguageByName(language).code,
                roleId: role,
                isActive,
            };

            await create({
                $axios: this.app.$axios,
                data,
            });

            onSuccess();
        } catch (e) {
            onError(e.data);
        }
    },
    async removeUser(
        {
            state,
        },
        {
            onSuccess,
            onError,
        },
    ) {
        const {
            id,
        } = state;

        try {
            await remove({
                $axios: this.app.$axios,
                id,
            });

            onSuccess();
        } catch (e) {
            onError(e.data);
        }
    },
};
