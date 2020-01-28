/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { getPagesConfig } from '~/plugins/moduleLoader';
import { JWT_KEY } from '~/defaults/authenticate/cookies';

export const actions = {
    async nuxtServerInit({ dispatch }) {
        const token = this.$cookies.get(JWT_KEY) || null;

        await dispatch('authentication/setAuth', token);

        try {
            await dispatch('authentication/getUser');
        } catch (e) {
            // TODO: There should be refresh token request
            console.error(e);
        }
    },
    resetState({ dispatch, commit }) {
        dispatch('categories/clearStorage');
        dispatch('attribute/clearStorage');
        dispatch('authentication/clearStorage');
        dispatch('data/clearStorage');
        dispatch('draggable/clearStorage');
        dispatch('tree/clearStorage');
        dispatch('segments/clearStorage');
        dispatch('conditions/clearStorage');
        dispatch('gridDesigner/clearStorage');
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
    const { store: modulesStore } = getPagesConfig;
    const newStore = {};
    for (let i = 0; i < modulesStore.length; i += 1) {
        const { moduleName, store, source } = modulesStore[i];
        for (let j = 0; j < store.length; j += 1) {
            const { directory, name } = store[j];
            switch (source) {
            // TODO: uncomment when npm modules ready
            // case 'npm':
            //     newStore[`module<${name}>`] = require(`@NodeModules/${moduleName}/store/${directory}`).default;
            //     break;
            default:
                newStore[`module<${name}>`] = require(`@Modules/${moduleName}/store/${directory}`).default;
                break;
            }
        }
    }
    return newStore;
}

export const modules = getModulesStore();
