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
    params = {
        limit: 9999,
        offset: 0,
        view: 'list',
        order: 'ASC',
        field: 'name',
        columns: 'id,description,name',
    },
}) => $axios.$get('roles', {
    params,
});

export const update = ({
    $axios,
    id,
    data,
}) => $axios.$put(`roles/${id}`, data);

export const create = ({
    $axios,
    data,
}) => $axios.$post('roles', data);

export const remove = ({
    $axios,
    id,
}) => $axios.$delete(`roles/${id}`);
