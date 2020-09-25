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
    },
};
