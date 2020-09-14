/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    JWT_KEY,
} from '@Authentication/defaults/cookies';

export const actions = {
    async nuxtServerInit({
        dispatch,
    }) {
        try {
            const token = this.$cookies.get(JWT_KEY) || null;

            await dispatch('authentication/__setState', {
                key: 'jwt',
                value: token,
            });
            if (token) {
                await dispatch('authentication/getUser');
            }
        } catch (e) {
            // TODO: There should be refresh token request
            console.error(e);
        }
    },
};
