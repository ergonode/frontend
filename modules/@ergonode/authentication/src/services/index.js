/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const login = ({
    $axios,
    data,
}) => $axios.$post('login', data, {
    withLanguage: false,
});

export const refresh = ({
    $axios,
    data,
}) => $axios.$post('token/refresh', data, {
    withLanguage: false,
});

export const checkToken = ({
    $axios,
    token,
}) => $axios.$get(`accounts/token/validation?token=${token}`, {
    withLanguage: false,
});

export const generateToken = ({
    $axios,
    data,
}) => $axios.$post('accounts/token/generate', data, {
    withLanguage: false,
});

export const applyPassword = ({
    $axios,
    data,
}) => $axios.$post('accounts/token/apply', data, {
    withLanguage: false,
});

export const get = ({
    $axios,
}) => $axios.$get('profile', {
    withLanguage: false,
});
