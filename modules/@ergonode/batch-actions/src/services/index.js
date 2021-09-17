/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const create = ({
    $axios,
    type,
    href,
    payload,
}) => $axios[type](href, payload);

export const getCount = ({
    $axios,
    payload,
}) => $axios.$post('batch-action/count', payload);

export const getAll = ({
    $axios,
    cancelToken = null,
}) => $axios.$get('profile/batch-action', {
    cancelToken,
});

export const get = ({
    $axios,
    id,
    cancelToken = null,
}) => $axios.$get(`batch-action/${id}`, {
    cancelToken,
});

export const end = ({
    $axios,
    id,
    cancelToken = null,
}) => $axios.$get(`batch-action/${id}/end`, {
    cancelToken,
});
