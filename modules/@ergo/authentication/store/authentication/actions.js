/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import camelcaseKeys from 'camelcase-keys';
import { JWT_KEY } from '@Authentication/defaults/cookies';
import { getMappedPrivileges } from '@Authentication/models/userMapper';
import { types } from './mutations';

export default {
    setAuth({ commit }, token) {
        commit(types.SET_JWT_TOKEN, token);
    },
    authenticateUser({ commit, dispatch }, { data }) {
        return this.app.$axios.$post('login', data).then(({ token }) => {
            this.$cookies.set(JWT_KEY, token);
            commit(types.SET_JWT_TOKEN, token);

            return dispatch('getUser');
        });
    },
    getUser({ commit }) {
        return this.app.$axios.$get('profile').then((user) => {
            const transformedUserData = camelcaseKeys(user);

            // Variable with processed privileges
            transformedUserData.privileges = getMappedPrivileges(transformedUserData.privileges);
            /**
             * The variable is set from the first active language.
             * The variable is used to specify the default language for the user according to his permissions.
            */
            transformedUserData.languagePrivilegesDefaultCode = Object
                .keys(transformedUserData.languagePrivileges)
                .find(language => transformedUserData.languagePrivileges[language].read === true);

            commit(types.SET_USER, transformedUserData);
            commit(types.SET_LOGGED_STATE, true);
        }).catch((e) => {
            console.error(e);
        });
    },
    setLoggedState({ commit }, isLogged) {
        commit(types.SET_LOGGED_STATE, isLogged);
    },
    clearStorage({ commit }) {
        this.$cookies.removeAll();
        commit(types.CLEAR_STATE);
    },
};
