/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const actions = {
    async nuxtServerInit({ commit }) {
        const token = this.$cookies.get('jwt') || null;
        const user = this.$cookies.get('user') || null;

        commit('authentication/setAction', { key: 'jwt', value: token });
        commit('authentication/setAction', { key: 'user', value: user });
    },
    resetState({ commit }) {
        commit('attribute/clearStorage');
        commit('authentication/clearStorage');
        commit('data/clearStorage');
        commit('categories/clearStorage');
        commit('draggable/clearStorage');
        commit('grid/clearStorage');
        commit('gridDraft/clearStorage');
        commit('list/clearStorage');
        commit('productsDraft/clearStorage');
        commit('templateDesigner/clearStorage');
        commit('translations/clearStorage');
        commit('tree/clearStorage');
        commit('users/clearStorage');
        commit('validations/clearStorage');
    },
};
