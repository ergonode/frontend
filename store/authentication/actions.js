/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';
import { JWT_KEY, USER_KEY } from '~/defaults/authenticate/cookies';

export default {
    setAuth({ commit }, { user, token }) {
        commit(types.SET_USER, user);
        commit(types.SET_JWT_TOKEN, token);
    },
    authenticateUser({ commit, dispatch }, { data }) {
        return this.app.$axios.$post('login', data).then(({ token }) => {
            this.$cookies.set(JWT_KEY, token);
            commit(types.SET_JWT_TOKEN, token);

            return dispatch('getUser');
        }).catch(err => console.log(err));
    },
    getUser({ commit }) {
        return this.app.$axios.$get('profile').then((user) => {
            this.$cookies.set(USER_KEY, JSON.stringify(user));
            commit(types.SET_USER, user);
        }).catch(err => console.log(err));
    },
    logout({ commit }) {
        this.$cookies.remove(JWT_KEY);
        this.$cookies.remove(USER_KEY);

        commit(types.SET_JWT_TOKEN, null);
    },
    clearStorage({ commit }) {
        commit(types.CLEAR_STATE);
    },
};
