/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
const EXPIRED_TOKEN_MESSAGE = 'Expired JWT Token';

export default function ({
    $axios, redirect, store,
}) {
    $axios.setHeader('Content-Type', 'application/json');
    $axios.setHeader('Accept', 'application/json');

    $axios.onRequest((config) => {
        const configLocal = config;
        configLocal.headers.JWTAuthorization = `Bearer ${store.state.authentication.jwt}`;
    });

    $axios.onError((error) => {
        const { response: { data: { message }, status } } = error;
        const msg = status === 500 ? 'Internal Server Error' : message;
        if (message === EXPIRED_TOKEN_MESSAGE && store.state.authentication.jwt) {
            store.dispatch('authentication/logout');
            return redirect('/');
        }

        if (process.client) {
            store.dispatch('alerts/addAlert', { type: 'error', message: msg });
        }

        return Promise.reject(error.response);
    });
}
