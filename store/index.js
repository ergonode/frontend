/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { JWT_KEY, USER_KEY } from '~/defaults/authenticate/cookies';

export const actions = {
    async nuxtServerInit({ dispatch }) {
        const token = this.$cookies.get(JWT_KEY) || null;
        const user = this.$cookies.get(USER_KEY) || null;

        dispatch('authentication/setAuth', { user, token });
    },
    resetState({ dispatch, commit }) {
        dispatch('categories/clearStorage');
        dispatch('attribute/clearStorage');
        dispatch('authentication/clearStorage');
        dispatch('data/clearStorage');
        dispatch('draggable/clearStorage');
        dispatch('tree/clearStorage');
        dispatch('productsDraft/clearStorage');
        dispatch('templateDesigner/clearStorage');
        dispatch('list/clearStorage');
        dispatch('roles/clearStorage');
        commit('gridDraft/clearStorage');
        commit('translations/clearStorage');
        commit('users/clearStorage');
        commit('validations/clearStorage');
    },
};
