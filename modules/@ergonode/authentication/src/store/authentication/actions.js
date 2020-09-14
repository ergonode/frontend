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
import camelcaseKeys from 'camelcase-keys';

export default {
    authenticateUser({
        commit, dispatch,
    }, {
        data,
    }) {
        return this.app.$axios.$post('login', data, {
            withLanguage: false,
        }).then(({
            token,
        }) => {
            this.$cookies.set(JWT_KEY, token);
            commit('__SET_STATE', {
                key: 'jwt',
                value: token,
            });

            return dispatch('getUser');
        });
    },
    getUser({
        commit,
    }) {
        return this.app.$axios.$get('profile', {
            withLanguage: false,
        }).then((user) => {
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
        }).catch((e) => {
            console.error(e);
        });
    },
};
