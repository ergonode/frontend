/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    deepClone,
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

export default {
    async getUser(
        {
            commit,
            dispatch,
        },
        {
            id,
            onError = () => {},
        },
    ) {
        try {
            // EXTENDED BEFORE METHOD
            await this.$getExtendMethod('@Users/store/user/action/getUser/__before', {
                $this: this,
                data: {
                    id,
                },
            });
            // EXTENDED BEFORE METHOD

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
                language_privileges_collection = null,
            } = data;

            dispatch('__clearStorage');

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

            // EXTENDED AFTER METHOD
            await this.$getExtendMethod('@Users/store/user/action/getUser/__after', {
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
                languageCode,
                password,
                passwordRepeat,
                isActive,
                drafts,
                languagePrivilegesCollection,
            } = state;
            const privileges = deepClone(languagePrivilegesCollection);

            Object.keys(drafts).forEach((key) => {
                const [
                    privilegeLanguageCode,
                    privilege,
                ] = key.split('/');

                if (typeof privileges[privilegeLanguageCode] === 'undefined') {
                    privileges[privilegeLanguageCode] = {};
                }

                privileges[privilegeLanguageCode][privilege] = drafts[key];
            });

            let data = {
                firstName,
                lastName,
                language: languageCode,
                password,
                passwordRepeat,
                isActive,
                languagePrivilegesCollection: privileges,
            };
            // EXTENDED BEFORE METHOD
            const extendedData = await this.$getExtendMethod('@Users/store/user/action/updateUser/__before', {
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
            await this.$getExtendMethod('@Users/store/user/action/updateUser/__after', {
                $this: this,
                data,
            });
            // EXTENDED AFTER METHOD

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: this.app.i18n.t('@Users.user.store.action.updateCancel'),
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
                    message: this.app.i18n.t('@Users.profile.store.action.updateAvatarCancel'),
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
                isActive,
                languageCode,
            } = state;
            let data = {
                email,
                firstName,
                lastName,
                password,
                passwordRepeat,
                language: languageCode,
                isActive,
            };

            // EXTENDED BEFORE METHOD
            const extendedData = await this.$getExtendMethod('@Users/store/user/action/createUser/__before', {
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
            await this.$getExtendMethod('@Users/store/user/action/createUser/__after', {
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
                    message: this.app.i18n.t('@Users.user.store.action.createCancel'),
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
            await this.$getExtendMethod('@Users/store/user/action/createUser/__before', {
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
            await this.$getExtendMethod('@Users/store/user/action/createUser/__after', {
                $this: this,
            });
            // EXTENDED AFTER METHOD

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: this.app.i18n.t('@Users.user.store.action.deleteCancel'),
                });

                return;
            }

            onError({
                errors: e.data.errors,
            });
        }
    },
};
