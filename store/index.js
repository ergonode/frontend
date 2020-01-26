/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { modulesConfig } from '~/plugins/moduleLoader';
import { JWT_KEY } from '@Authentication/defaults/cookies';

export const actions = {
    async nuxtServerInit({ dispatch }) {
        const token = this.$cookies.get(JWT_KEY) || null;

        await dispatch('authentication/setAuth', token);

        if (token) {
            await dispatch('authentication/getUser');
        }
    },
    resetState({ dispatch }) {
        const { store: modulesStore } = modulesConfig;

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
    const { store: modulesStore } = modulesConfig;
    const newStore = {};
    for (let i = 0; i < modulesStore.length; i += 1) {
        const { moduleName, store, type } = modulesStore[i];
        for (let j = 0; j < store.length; j += 1) {
            const { directory, name } = store[j];
            switch (type) {
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
