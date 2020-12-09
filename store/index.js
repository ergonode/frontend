/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    REFRESH_TOKEN_KEY,
    TOKEN_KEY,
} from '@Authentication/defaults/cookies';

export const actions = {
    async nuxtServerInit({
        dispatch,
    }) {
        const token = this.$cookies.get(TOKEN_KEY) || null;
        const refreshToken = this.$cookies.get(REFRESH_TOKEN_KEY) || null;

        dispatch('authentication/setTokens', {
            token,
            refreshToken,
        });

        if (token) {
            try {
                await dispatch('authentication/getUser', {});
                await dispatch('core/getLanguages', {});
                await dispatch('core/getLanguageTree', {});
                await dispatch('core/setDefaultLanguage');
            } catch (e) {
                console.error(e);
            }
        }
    },
};
