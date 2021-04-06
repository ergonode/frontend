/* eslint-disable no-throw-literal */
/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    refresh,
} from '@Authentication/services';
import {
    AXIOS_CANCEL_TOKEN_DEFAULT_KEY,
} from '@Core/defaults/axios';
import {
    cacheAdapterEnhancer,
} from 'axios-extensions';

const cancelTokens = {
    [AXIOS_CANCEL_TOKEN_DEFAULT_KEY]: [],
};
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve();
        }
    });

    failedQueue = [];
};

const clearCancelTokens = (keys = []) => {
    keys.forEach((key) => {
        if (typeof cancelTokens[key] !== 'undefined') {
            cancelTokens[key].forEach((request) => {
                if (request.cancel) {
                    request.cancel();
                }
            });
        }

        cancelTokens[key] = [];
    });
};

const addCancelTokens = (
    keys = [],
    tokens = [],
) => {
    keys.forEach((key) => {
        if (typeof cancelTokens[key] === 'undefined') {
            cancelTokens[key] = [];
        }

        tokens.forEach((token) => {
            cancelTokens[key].push(token);
        });
    });
};

const removeCancelToken = (token) => {
    let tokenIndex = -1;

    const keys = Object.keys(cancelTokens);

    let i = 0;

    while (tokenIndex === -1 && i < keys.length) {
        const key = keys[i];

        tokenIndex = cancelTokens[key].findIndex(response => response.token === token);

        if (tokenIndex !== -1) {
            cancelTokens[key].splice(tokenIndex, 1);
        }

        i += 1;
    }
};

export default function ({
    $axios,
    $config,
    app,
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

            addCancelTokens(
                [
                    AXIOS_CANCEL_TOKEN_DEFAULT_KEY,
                ], [
                    source,
                ],
            );
        }

        if (configLocal.withLanguage) {
            const {
                language,
            } = store.state.authentication.user;

            configLocal.baseURL = `${$config.axios.browserBaseURL}${language}/`;
        }

        if (!config.url.includes('token/refresh')) {
            configLocal.headers.JWTAuthorization = `Bearer ${store.state.authentication.token}`;
        }

        return configLocal;
    });

    axios.onResponse((response) => {
        removeCancelToken(response.config.cancelToken);

        return Promise.resolve(response);
    });

    axios.onError(async (errorResponse) => {
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
            throw {
                data: {
                    message: app.i18n.t('core.errors.network'),
                },
            };
        }

        const {
            response: {
                data: {
                    message,
                },
                status,
                config,
            },
        } = errorResponse;

        switch (true) {
        case regExp.errors.test(status):
            msg = app.i18n.t('core.errors.internal');

            removeCancelToken(errorResponse.config.cancelToken);

            break;
        case regExp.auth.test(status): {
            if (config.url.includes('login')) {
                msg = app.i18n.t('core.errors.wrongCredentials');
                break;
            }

            msg = app.i18n.t('core.errors.nonAuthorized');

            const originalRequest = config;

            if (!originalRequest._retry) {
                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({
                            resolve,
                            reject,
                        });
                    })
                        .then(() => axios(originalRequest))
                        .catch(Promise.reject);
                }

                originalRequest._retry = true;
                isRefreshing = true;

                return new Promise((resolve, reject) => refresh({
                    $axios,
                    data: {
                        refresh_token: store.state.authentication.refreshToken,
                    },
                })
                    .then(({
                        token,
                        refresh_token: refreshToken,
                    }) => {
                        store.dispatch('authentication/setTokens', {
                            token,
                            refreshToken,
                        });
                        processQueue(null);
                        resolve(axios(originalRequest));
                    })
                    .catch((err) => {
                        processQueue(err);
                        reject(err);

                        removeCancelToken(errorResponse.config.cancelToken);

                        store.dispatch('authentication/__setState', {
                            key: 'isLogged',
                            value: false,
                        });

                        redirect('/');
                    })
                    .finally(() => { isRefreshing = false; }));
            }

            break;
        }
        case regExp.access.test(status):
            msg = app.i18n.t('core.errors.accessDenied');
            error({
                statusCode: 403,
                message: msg,
            });

            removeCancelToken(errorResponse.config.cancelToken);

            break;
        case regExp.notFound.test(status):

            removeCancelToken(errorResponse.config.cancelToken);

            if (config.url.includes('multimedia')) {
                msg = app.i18n.t('core.errors.mediaNotFound');
                break;
            }
            msg = app.i18n.t('core.errors.pageNotFound');
            error({
                statusCode: 404,
                message: msg,
            });
            break;
        default:
            removeCancelToken(errorResponse.config.cancelToken);

            msg = message || app.i18n.t('core.errors.unsupportedMessage');
        }

        store.dispatch('alert/addAlert', {
            type: 'error',
            message: msg,
        });

        if (dev) console.error(errorResponse.response);

        return Promise.reject(errorResponse.response);
    });

    inject('axios', axios);
    inject('clearCancelTokens', clearCancelTokens);
    inject('addCancelTokens', addCancelTokens);
}
