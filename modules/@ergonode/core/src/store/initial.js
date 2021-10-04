/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    REFRESH_TOKEN_KEY,
    TOKEN_KEY,
    USER_INTERFACE_LANGUAGE_KEY,
} from '@Authentication/defaults/cookies';
import {
    DEFAULT_LANGUAGE_CODE,
} from '@Core/defaults/cookies';

export async function nuxtServerInit({
    dispatch,
}) {
    const token = this.$cookies.get(TOKEN_KEY) || null;
    const refreshToken = this.$cookies.get(REFRESH_TOKEN_KEY) || null;
    const interfaceLanguageCode = this.$cookies.get(USER_INTERFACE_LANGUAGE_KEY);

    if (!interfaceLanguageCode) {
        this.$cookies.set(USER_INTERFACE_LANGUAGE_KEY, DEFAULT_LANGUAGE_CODE);
    }

    dispatch('authentication/setTokens', {
        token,
        refreshToken,
    });

    if (token) {
        try {
            await dispatch('authentication/getUser', {});
            await dispatch('core/getLanguages', {});
            await dispatch('core/getLanguageTree', {});
        } catch (e) {
            console.error(e);
        }
    }
}
