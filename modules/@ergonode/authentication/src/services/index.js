/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
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

export const checkHash = ({
    $axios,
    hash,
}) => $axios.$post('/', hash, {
    withLanguage: false,
});

export const get = ({
    $axios,
}) => $axios.$get('profile', {
    withLanguage: false,
});
