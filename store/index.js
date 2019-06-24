/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { JWT_KEY, USER_KEY } from '~/defaults/authenticate/cookies';

export const actions = {
    async nuxtServerInit({ dispatch, commit }) {
        const token = this.$cookies.get(JWT_KEY) || null;
        const user = this.$cookies.get(USER_KEY) || null;

        dispatch('authentication/setAuth', { user, token });
    },
    resetState({ dispatch, commit }) {
        dispatch('categories/clearStorage');
        dispatch('attribute/clearStorage');
        dispatch('authentication/clearStorage');
        dispatch('data/clearStorage');
        dispatch('grid/clearStorage');
        dispatch('draggable/clearStorage');
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
