/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';
import { JWT_KEY } from '@Authentication/defaults/cookies';

const onError = () => {};

export default {
    setAuth({ commit }, token) {
        commit(types.SET_JWT_TOKEN, token);
    },
    authenticateUser({ commit, dispatch }, { data }) {
        return this.app.$axios.$post('login', data).then(({ token }) => {
            this.$cookies.set(JWT_KEY, token);
            commit(types.SET_JWT_TOKEN, token);

            return dispatch('getUser');
        }).catch(onError);
    },
    async getUser({ commit, dispatch }) {
        await this.app.$axios.$get('profile').then((user) => {
            if (user.email && user.first_name && user.last_name && user.role && user.privileges) {
                commit(types.SET_USER, user);
            } else {
                dispatch('alerts/addAlert', { type: 'error', message: 'Internal Server Error' }, { root: true });
                dispatch('logout');
            }
        }).catch(() => {
            dispatch('logout');
        });
    },
    logout({ commit }) {
        this.$cookies.removeAll();

        commit(types.SET_JWT_TOKEN, null);
        commit(types.SET_USER, null);
    },
    clearStorage({ commit }) {
        commit(types.CLEAR_STATE);
    },
};
