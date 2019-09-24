/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default function ({
    $axios, redirect, store, error,
}) {
    $axios.setHeader('Content-Type', 'application/json');
    $axios.setHeader('Accept', 'application/json');
    $axios.onRequest((config) => {
        const configLocal = config;
        configLocal.headers.JWTAuthorization = `Bearer ${store.state.authentication.jwt}`;
    });

    $axios.onError((errorResponse) => {
        let msg = '';
        const dev = process.env.NODE_ENV === 'development';
        const regExp = {
            errors: /5[0-9]{2}/,
            auth: /401/,
            access: /403/,
            notFound: /404/,
        };
        const { response: { data: { message }, status } } = errorResponse;

        switch (true) {
        case regExp.errors.test(status):
            msg = 'Internal Server Error';
            break;
        case regExp.auth.test(status):
            msg = 'Authentication needed';
            store.dispatch('authentication/logout');
            redirect('/');
            break;
        case regExp.access.test(status):
            msg = 'Access denied';
            error({ statusCode: 403, message: msg });
            break;
        case regExp.notFound.test(status):
            msg = 'Page not found';
            error({ statusCode: 404, message: msg });
            break;
        default:
            if (message) msg = message;
            else msg = 'Unsupported message, please contact with support with reproduction steps';
        }

        if (process.client) {
            store.dispatch('alerts/addAlert', { type: 'error', message: dev ? message : msg });
        }
        if (dev) console.error(errorResponse.response);

        return Promise.reject(errorResponse.response);
    });
}
