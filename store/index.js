/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { getPagesConfiguration } from '~/plugins/moduleLoader';
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
        dispatch('productStatus/clearStorage');
        dispatch('templateDesigner/clearStorage');
        dispatch('list/clearStorage');
        dispatch('roles/clearStorage');
        dispatch('users/clearStorage');
        commit('gridDraft/clearStorage');
        commit('translations/clearStorage');
        commit('validations/clearStorage');
    },
};

function getModulesStore() {
    const { store: modulesStore } = getPagesConfiguration();
    const newStore = {};
    for (let i = 0; i < modulesStore.length; i += 1) {
        const { moduleName, store } = modulesStore[i];
        for (let j = 0; j < store.length; j += 1) {
            const { directoryStoreName, storeName } = store[j];
            newStore[`module<${storeName}>`] = require(`@Modules/${moduleName}/store/${directoryStoreName}`).default;
        }
    }
    return newStore;
}

export const modules = getModulesStore();
