/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const get = ({
    $axios,
    id,
}) => $axios.$get(`status/${id}`);

export const getWorkflowByDefaultId = ({
    $axios,
}) => $axios.$get('workflow/default');

export const getAll = ({
    $axios,
    params = {
        limit: 9999,
        offset: 0,
        view: 'list',
        field: 'name',
        order: 'ASC',
    },
}) => $axios.$get('status', params);

export const update = ({
    $axios,
    id,
    data,
}) => $axios.$put(`status/${id}`, data);

export const updateWorkflowDefaultStatus = ({
    $axios,
    id,
}) => $axios.$put(`workflow/default/status/${id}/default`);

export const create = ({
    $axios,
    data,
}) => $axios.$post('status', data);

export const remove = ({
    $axios,
    id,
}) => $axios.$delete(`status/${id}`);
