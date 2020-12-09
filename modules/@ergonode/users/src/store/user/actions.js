/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    isObject,
} from '@Core/models/objectWrapper';
import {
    create,
    get,
    remove,
    removeAvatar,
    update,
    uploadAvatar,
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
            onError = () => {},
        },
    ) {
        try {
            // EXTENDED BEFORE METHOD
            await this.$extendMethods('@Users/store/user/action/getUser/__before', {
                $this: this,
                data: {
                    id,
                },
            });
            // EXTENDED BEFORE METHOD

            const getActiveLanguageByCode = rootGetters['core/getActiveLanguageByCode'];
            const data = await get({
                $axios: this.app.$axios,
                id,
            });
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
            } = data;

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

            // EXTENDED AFTER METHOD
            await this.$extendMethods('@Users/store/user/action/getUser/__after', {
                $this: this,
                data,
            });
            // EXTENDED AFTER METHOD
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                return;
            }

            onError(e);
        }
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
            scope,
            onSuccess = () => {},
            onError = () => {},
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

            let data = {
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
            // EXTENDED BEFORE METHOD
            const extendedData = await this.$extendMethods('@Users/store/user/action/updateUser/__before', {
                $this: this,
                data: {
                    id,
                    ...data,
                },
            });
            extendedData.forEach((extend) => {
                data = {
                    ...data,
                    ...extend,
                };
            });
            // EXTENDED BEFORE METHOD

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
                await dispatch('authentication/getUser', {}, {
                    root: true,
                });
            }

            // EXTENDED AFTER METHOD
            await this.$extendMethods('@Users/store/user/action/updateUser/__after', {
                $this: this,
                data,
            });
            // EXTENDED AFTER METHOD

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: this.app.i18n.t('user.messages.updateCancel'),
                });

                return;
            }

            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
    async updateUserAvatar(
        {
            state,
            commit,
        },
        {
            scope,
            onSuccess = () => {},
            onError = () => {},
        },
    ) {
        try {
            const {
                id,
                avatarFile,
            } = state;

            if (avatarFile) {
                const {
                    name,
                } = avatarFile;

                const data = new FormData();
                data.append('upload', avatarFile, name);

                await uploadAvatar({
                    $axios: this.app.$axios,
                    id,
                    data,
                });

                commit('__SET_STATE', {
                    key: 'avatarId',
                    value: id,
                });
            } else {
                await removeAvatar({
                    $axios: this.app.$axios,
                    id,
                });
            }

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: this.app.i18n.t('user.messages.updateAvatarCancel'),
                });
            }

            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
    async createUser(
        {
            state,
            rootGetters,
        },
        {
            scope,
            onSuccess = () => {},
            onError = () => {},
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
            let data = {
                email,
                firstName,
                lastName,
                password,
                passwordRepeat,
                language: getActiveLanguageByName(language).code,
                roleId: role,
                isActive,
            };

            // EXTENDED BEFORE METHOD
            const extendedData = await this.$extendMethods('@Users/store/user/action/createUser/__before', {
                $this: this,
                data,
            });
            extendedData.forEach((extended) => {
                data = {
                    ...data,
                    ...extended,
                };
            });
            // EXTENDED BEFORE METHOD

            const {
                id,
            } = await create({
                $axios: this.app.$axios,
                data,
            });

            // EXTENDED AFTER METHOD
            await this.$extendMethods('@Users/store/user/action/createUser/__after', {
                $this: this,
                data: {
                    id,
                    ...data,
                },
            });
            // EXTENDED AFTER METHOD

            onSuccess(id);
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: this.app.i18n.t('user.messages.createCancel'),
                });

                return;
            }

            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
    async removeUser(
        {
            state,
        },
        {
            onSuccess = () => {},
            onError = () => {},
        },
    ) {
        try {
            const {
                id,
            } = state;

            // EXTENDED BEFORE METHOD
            await this.$extendMethods('@Users/store/user/action/createUser/__before', {
                $this: this,
                data: {
                    id,
                },
            });
            // EXTENDED BEFORE METHOD

            await remove({
                $axios: this.app.$axios,
                id,
            });

            // EXTENDED AFTER METHOD
            await this.$extendMethods('@Users/store/user/action/createUser/__after', {
                $this: this,
            });
            // EXTENDED AFTER METHOD

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: this.app.i18n.t('user.messages.deleteCancel'),
                });

                return;
            }

            onError({
                errors: e.data.errors,
            });
        }
    },
};
