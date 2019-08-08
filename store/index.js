/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import modulesStoreConfiguration from '@Root/modulesStore.config';
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
        dispatch('users/clearStorage');
        commit('gridDraft/clearStorage');
        commit('translations/clearStorage');
        commit('validations/clearStorage');
    },
};

// async function getModulesStore() {
//     const { store: modulesStore } = await ModuleLoader.getPagesConfiguration();
//     const newStore = {};
//     for (let i = 0; i < modulesStore.length; i += 1) {
//         const { moduleName, store } = modulesStore[i];
//         for (let j = 0; j < store.length; j += 1) {
//             const { dirName, storeName } = store[i];
//             newStore[`${storeName}<module>`] = await import(`@Modules/${moduleName}/store/${dirName}`).then(m => m.default || m); // eslint-disable-line no-await-in-loop
//         }
//     }
//     return newStore;
// }

export const modules = modulesStoreConfiguration;
