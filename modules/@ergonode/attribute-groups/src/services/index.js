/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const create = ({
    $axios,
    data,
}) => $axios.$post('attributes/groups', data);

export const get = ({
    $axios,
    id,
}) => $axios.$get(`attributes/groups/${id}`);

export const getAll = ({
    $axios,
    filter = '',
}) => $axios.$get('attributes/groups', {
    params: {
        filter,
        limit: 9999,
        offset: 0,
        view: 'list',
        field: 'name',
        order: 'ASC',
    },
});

export const remove = ({
    $axios,
    id,
}) => $axios.$delete(`attributes/groups/${id}`);

export const update = ({
    $axios,
    id,
    data,
}) => $axios.$put(`attributes/groups/${id}`, data);
