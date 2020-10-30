/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    cacheAdapterEnhancer,
} from 'axios-extensions';

let cancelTokens = [];

const clearCancelTokens = () => {
    cancelTokens.forEach((request) => {
        if (request.cancel) {
            request.cancel();
        }
    });

    cancelTokens = [];
};

export default function ({
    $axios,
    store,
    error,
    redirect,
}, inject) {
    const axios = $axios.create({
        headers: {
            common: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        },
        adapter: cacheAdapterEnhancer($axios.defaults.adapter, {
            enabledByDefault: false,
            cacheFlag: 'useCache',
        }),
        withLanguage: true,
    });

    axios.onRequest((config) => {
        const configLocal = config;

        if (!configLocal.cancelToken) {
            const source = $axios.CancelToken.source();

            configLocal.cancelToken = source.token;

            cancelTokens.push(source);
        }

        if (configLocal.withLanguage) {
            const {
                language,
            } = store.state.authentication.user;

            configLocal.baseURL = `${process.env.baseURL}${language}/`;
        }

        configLocal.headers.JWTAuthorization = `Bearer ${store.state.authentication.jwt}`;

        return configLocal;
    });

    axios.onError((errorResponse) => {
        let msg = '';
        const dev = process.env.NODE_ENV === 'development';
        const regExp = {
            errors: /5[0-9]{2}/,
            auth: /401/,
            access: /403/,
            notFound: /404/,
        };

        if ($axios.isCancel(errorResponse)) {
            return Promise.reject(errorResponse);
        }

        if (!errorResponse || !errorResponse.response) {
            return Promise.reject(new Error('Network Error'));
        }
        const {
            response: {
                data: {
                    message,
                }, status, config,
            },
        } = errorResponse;

        switch (true) {
        case regExp.errors.test(status):
            msg = 'Internal Server Error';
            break;
        case regExp.auth.test(status):
            msg = 'Authentication needed';
            if (store.state.authentication.isLogged) {
                store.dispatch('authentication/__setState', {
                    key: 'isLogged',
                    value: false,
                });
                redirect('/');
            }
            break;
        case regExp.access.test(status):
            msg = 'Access denied';
            error({
                statusCode: 403,
                message: msg,
            });
            break;
        case regExp.notFound.test(status):
            if (config.url.includes('multimedia')) {
                msg = 'Media not found';
                break;
            }
            msg = 'Page not found';
            error({
                statusCode: 404,
                message: msg,
            });
            break;
        default:
            msg = message || 'Unsupported message, please contact support with reproduction steps';
        }

        if (process.client) {
            store.dispatch('alert/addAlert', {
                type: 'error',
                message: msg,
            });
        }
        if (dev) console.error(errorResponse.response);

        return Promise.reject(errorResponse.response);
    });

    inject('axios', axios);
    inject('clearCancelTokens', clearCancelTokens);
}
