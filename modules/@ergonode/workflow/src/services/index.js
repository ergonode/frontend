/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const getStatuses = ({
    $axios,
}) => $axios.$get('status', {
    params: {
        limit: 99999,
        field: 'is_default',
        order: 'DESC',
    },
});

export const getTransitions = ({
    $axios,
}) => $axios.$get('workflow/default/transitions', {
    params: {
        limit: 99999,
    },
});

export const getStatus = ({
    $axios,
    id,
}) => $axios.$get(`status/${id}`);

export const getDefaultStatus = ({
    $axios,
}) => $axios.$get('workflow/default');

export const removeStatus = ({
    $axios,
    id,
}) => $axios.$delete(`status/${id}`);

export const createStatus = ({
    $axios,
    data,
}) => $axios.$post('status', data);

export const updateStatus = ({
    $axios,
    id,
    data,
}) => $axios.$put(`status/${id}`, data);

export const updateDefaultStatus = ({
    $axios,
    id,
}) => $axios.$put(`workflow/default/status/${id}/default`);
