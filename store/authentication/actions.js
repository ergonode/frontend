/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    authenticateUser({ commit, dispatch }, { data }) {
        return this.app.$axios.$post('login', data).then(({ token }) => {
            this.$cookies.set('jwt', token);
            commit('setAction', { key: 'jwt', value: token });
            dispatch('getUser');
        }).catch(e => console.log(e));
    },
    getUser({ commit }) {
        return this.app.$axios.$get('profile').then((user) => {
            this.$cookies.set('user', JSON.stringify(user));
            commit('setAction', { key: 'user', value: user });
        }).catch(e => console.log(e));
    },
    logout({ commit }) {
        this.$cookies.remove('jwt');
        this.$cookies.remove('user');
        commit('setAction', { key: 'jwt', value: null });
    },
};
