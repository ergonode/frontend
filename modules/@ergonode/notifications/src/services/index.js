/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const get = ({
    $axios,
    id,
}) => $axios.$get(`roles/${id}`);

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
}) => $axios.$get(`profile/notifications/${id}/mark`, {
    withLanguage: false,
});

export const check = ({
    $axios,
}) => $axios.$get('profile/notifications/check', {
    withLanguage: false,
});
