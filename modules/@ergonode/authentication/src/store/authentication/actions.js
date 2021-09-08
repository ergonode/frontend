/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    REFRESH_TOKEN_KEY,
    TOKEN_KEY,
    USER_INTERFACE_LANGUAGE_KEY,
} from '@Authentication/defaults/cookies';
import {
    getMappedPrivileges,
} from '@Authentication/models/userMapper';
import {
    applyPassword,
    checkToken,
    generateToken,
    get,
    login,
} from '@Authentication/services/index';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import camelcaseKeys from 'camelcase-keys';

export default {
    async passwordRecoveryCheckToken({}, {
        token,
        onError = () => {},
    }) {
        try {
            await checkToken({
                $axios: this.app.$axios,
                token,
            });
        } catch (e) {
            onError({
                errors: {
                    __form: [
                        e.data.message,
                    ],
                },
            });
        }
    },
    async passwordRecovery({}, {
        data,
        scope,
        onSuccess = () => {},
        onError = () => {},
    }) {
        let isError = false;
        const errors = {};

        if (!data.email) {
            errors.email = [
                this.app.i18n.t('@Authentication.authentication.store.action.emailRequired'),
            ];
            isError = true;
        }

        if (!isError) {
            try {
                await generateToken({
                    $axios: this.app.$axios,
                    data,
                });

                onSuccess();
            } catch (e) {
                onError({
                    errors: e.data.errors,
                    scope,
                });
            }
        } else {
            onError({
                errors,
                scope,
            });
        }
    },
    async newPassword({}, {
        data,
        scope,
        onSuccess = () => {},
        onError = () => {},
    }) {
        let isError = false;
        const errors = {};
        const {
            validation, ...dataToSend
        } = data;

        if (!dataToSend.password) {
            errors.password = [
                this.app.i18n.t('@Authentication.authentication.store.action.passwordRequired'),
            ];
            isError = true;
        }
        if (!validation) {
            errors.validation = [
                this.app.i18n.t('@Authentication.authentication.store.action.passwordValidation'),
            ];
            isError = true;
        }

        if (!isError) {
            try {
                await applyPassword({
                    $axios: this.app.$axios,
                    data: dataToSend,
                });

                onSuccess();
            } catch (e) {
                onError({
                    errors: e.data.errors,
                    scope,
                });
            }
        } else {
            onError({
                errors,
                scope,
            });
        }
    },
    async authenticateUser({
        dispatch,
    }, {
        data,
        scope,
        onSuccess = () => {},
        onError = () => {},
    }) {
        let isError = false;
        const errors = {};

        if (!data.username) {
            errors.username = [
                this.app.i18n.t('@Authentication.authentication.store.action.emailRequired'),
            ];
            isError = true;
        }

        if (!data.password) {
            errors.password = [
                this.app.i18n.t('@Authentication.authentication.store.action.passwordRequired'),
            ];
            isError = true;
        }

        if (!isError) {
            try {
                const {
                    token,
                    refresh_token: refreshToken,
                } = await login({
                    $axios: this.app.$axios,
                    data,
                });

                dispatch('setTokens', {
                    token,
                    refreshToken,
                });

                await dispatch('getUser', {
                    onSuccess: (user) => {
                        this.$setInterfaceLanguage(user.language);
                        this.$cookies.set(USER_INTERFACE_LANGUAGE_KEY, user.language);
                    },
                });
                await dispatch('core/getLanguages', {}, {
                    root: true,
                });
                await dispatch('core/getLanguageTree', {}, {
                    root: true,
                });

                onSuccess();
            } catch (e) {
                onError({
                    errors: {
                        __form: [
                            e.data.message,
                        ],
                    },
                    scope,
                });
            }
        } else {
            onError({
                errors,
                scope,
            });
        }
    },
    async getUser({
        commit,
    }, {
        onSuccess = () => {},
    }) {
        try {
            // EXTENDED BEFORE METHOD
            await this.$getExtendMethod('@Authentication/store/authentication/action/getUser/__before', {
                $this: this,
            });
            // EXTENDED BEFORE METHOD

            const user = await get({
                $axios: this.app.$axios,
            });
            const transformedUserData = camelcaseKeys(user);

            transformedUserData.privileges = getMappedPrivileges(transformedUserData.privileges);

            if (Array.isArray(transformedUserData.languagePrivileges)) {
                transformedUserData.languagePrivileges = {};
            }

            commit('__SET_STATE', {
                key: 'user',
                value: transformedUserData,
            });
            commit('__SET_STATE', {
                key: 'isLogged',
                value: true,
            });

            // EXTENDED AFTER METHOD
            await this.$getExtendMethod('@Authentication/store/authentication/action/getUser/__after', {
                $this: this,
                data: transformedUserData,
            });
            // EXTENDED AFTER METHOD

            onSuccess(user);
        } catch (e) {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: this.app.i18n.t('@Authentication.authentication.store.action.getUser'),
            });
        }
    },
    setTokens({
        commit,
    }, {
        token,
        refreshToken,
    }) {
        this.$cookies.set(TOKEN_KEY, token);
        this.$cookies.set(REFRESH_TOKEN_KEY, refreshToken);

        commit('__SET_STATE', {
            key: 'token',
            value: token,
        });
        commit('__SET_STATE', {
            key: 'refreshToken',
            value: refreshToken,
        });
    },
};
