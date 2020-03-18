/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { JWT_KEY } from '@Authentication/defaults/cookies';
import storeModules from '~/.nuxt/store.modules';

export const actions = {
    async nuxtServerInit({ dispatch }) {
        const token = this.$cookies.get(JWT_KEY) || null;

        await dispatch('authentication/setAuth', token);

        try {
            if (token) {
                await dispatch('authentication/getUser');
            }
        } catch (e) {
            // TODO: There should be refresh token request
            console.error(e);
        }
    },
    resetState({ dispatch }) {
        Object.keys(storeModules).forEach((storeName) => {
            dispatch(`${storeName}/clearStorage`);
        });
    },
};

export const modules = storeModules;
