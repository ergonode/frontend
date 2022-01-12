/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const getAll = ({
    $axios,
    params,
}) => $axios.$get('profile/notifications', {
    params,
    withLanguage: false,
});

export const update = ({
    $axios,
    id,
}) => $axios.$post(`profile/notifications/${id}/mark`, {}, {
    withLanguage: false,
});

export const updateAll = ({
    $axios,
}) => $axios.$post('profile/notifications/mark-all', {}, {
    withLanguage: false,
});

export const check = ({
    $axios,
}) => $axios.$get('profile/notifications/check', {
    withLanguage: false,
});
