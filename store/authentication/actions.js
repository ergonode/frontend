/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';
import { JWT_KEY } from '~/defaults/authenticate/cookies';

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
            commit(types.SET_USER, user);
            commit(types.SET_LOGGED_STATE, true);
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
