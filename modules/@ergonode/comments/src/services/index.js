/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const get = ({
    $axios,
    id,
}) => $axios.$get(`comments/${id}`);

export const getAll = ({
    $axios,
    params,
}) => $axios.$get('comments', {
    params,
});

export const create = ({
    $axios,
    data,
}) => $axios.$post('comments', data);

export const update = ({
    $axios,
    id,
    data,
}) => $axios.$put(`comments/${id}`, data);

export const remove = ({
    $axios,
    id,
}) => $axios.$delete(`comments/${id}`);
