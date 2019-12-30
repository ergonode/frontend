/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { getModulesConfig } from '~/plugins/moduleLoader';
import { JWT_KEY } from '@Core/defaults/authenticate/cookies';

export const actions = {
    async nuxtServerInit({ dispatch }) {
        const token = this.$cookies.get(JWT_KEY) || null;

        await dispatch('authentication/setAuth', token);

        if (token) {
            await dispatch('authentication/getUser');
        }
    },
    resetState({ dispatch }) {
        const { store: modulesStore } = getModulesConfig;

        dispatch('data/clearStorage');
        dispatch('segments/clearStorage');
        dispatch('conditions/clearStorage');
        dispatch('productsDraft/clearStorage');
        dispatch('productStatus/clearStorage');
        dispatch('gridDraft/clearStorage');

        for (let i = 0; i < modulesStore.length; i += 1) {
            const { store } = modulesStore[i];
            for (let j = 0; j < store.length; j += 1) {
                const { name } = store[j];
                dispatch(`${name}/clearStorage`);
            }
        }
    },
};

function getModulesStore() {
    const { store: modulesStore } = getModulesConfig;
    const newStore = {};
    for (let i = 0; i < modulesStore.length; i += 1) {
        const { moduleName, store, source } = modulesStore[i];
        for (let j = 0; j < store.length; j += 1) {
            const { directory, name } = store[j];
            switch (source) {
            // TODO: uncomment when npm modules ready
            // case 'npm':
            //     newStore[name] = require(`${moduleName}/store/${directory}`).default;
            //     break;
            default:
                newStore[name] = require(`@Modules/${moduleName}/store/${directory}`).default;
                break;
            }
        }
    }
    return newStore;
}

export const modules = getModulesStore();
