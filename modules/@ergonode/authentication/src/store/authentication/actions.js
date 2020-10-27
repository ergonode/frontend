/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    JWT_KEY,
} from '@Authentication/defaults/cookies';
import {
    getMappedPrivileges,
} from '@Authentication/models/userMapper';
import {
    create,
    get,
} from '@Authentication/services/index';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import camelcaseKeys from 'camelcase-keys';

export default {
    async authenticateUser({
        commit,
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
                'Email is required',
            ];
            isError = true;
        }

        if (!data.password) {
            errors.password = [
                'Password is required',
            ];
            isError = true;
        }

        if (!isError) {
            try {
                const {
                    token,
                } = await create({
                    $axios: this.app.$axios,
                    data,
                });

                this.$cookies.set(JWT_KEY, token);
                commit('__SET_STATE', {
                    key: 'jwt',
                    value: token,
                });

                await dispatch('getUser');

                onSuccess();
            } catch (e) {
                onError(e);
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
    }) {
        try {
            // EXTENDED BEFORE METHOD
            await this.$extendMethods('@Authentication/store/authentication/action/getUser/__before', {
                $this: this,
            });
            // EXTENDED BEFORE METHOD

            const user = await get({
                $axios: this.app.$axios,
            });

            const transformedUserData = camelcaseKeys(user);

            transformedUserData.privileges = getMappedPrivileges(transformedUserData.privileges);
            commit('__SET_STATE', {
                key: 'user',
                value: transformedUserData,
            });
            commit('__SET_STATE', {
                key: 'isLogged',
                value: true,
            });

            // EXTENDED AFTER METHOD
            await this.$extendMethods('@Authentication/store/authentication/action/getUser/__after', {
                $this: this,
                data: transformedUserData,
            });
            // EXTENDED AFTER METHOD
        } catch (e) {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: 'User data hasn`t been fetched properly',
            });
        }
    },
};
