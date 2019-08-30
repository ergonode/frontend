/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';
import { JWT_KEY, USER_KEY } from '~/defaults/authenticate/cookies';
import { COLUMN_IDS } from '~/defaults/grid/cookies';

const onError = () => {};

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
        }).catch(onError);
    },
    getUser({ commit, dispatch }) {
        return this.app.$axios.$get('profile').then((user) => {
            if (user.email && user.first_name && user.last_name && user.role && user.privileges) {
                this.$cookies.set(USER_KEY, JSON.stringify(user));
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
        this.$cookies.remove(JWT_KEY);
        this.$cookies.remove(USER_KEY);
        this.$cookies.remove(COLUMN_IDS);

        commit(types.SET_JWT_TOKEN, null);
    },
    clearStorage({ commit }) {
        commit(types.CLEAR_STATE);
    },
};
