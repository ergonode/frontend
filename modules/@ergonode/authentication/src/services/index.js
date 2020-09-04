/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const create = ({
    $axios,
    data,
}) => $axios.$post('login', data, {
    withLanguage: false,
});

export const get = ({
    $axios,
}) => $axios.$get('profile', {
    withLanguage: false,
});
