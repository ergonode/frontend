/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const create = ({
    $axios,
    data,
}) => $axios.$post('attributes', data);

export const createOption = ({
    $axios,
    id,
    data,
}) => $axios.$post(`attributes/${id}/options`, data);

export const get = ({
    $axios,
    id,
}) => $axios.$get(`attributes/${id}`);

export const getAll = ({
    $axios,
    params = {
        limit: 9999,
        offset: 0,
        view: 'list',
        field: 'name',
        order: 'ASC',
    },
}) => $axios.$get('attributes', {
    params,
});

export const getOption = ({
    $axios,
    id,
    params = {
        order: 'ASC',
        field: 'code',
    },
}) => $axios.$get(`attributes/${id}/options`, {
    params,
});

export const remove = ({
    $axios,
    id,
}) => $axios.$delete(`attributes/${id}`);

export const removeOption = ({
    $axios,
    attributeId,
    optionId,
}) => $axios.$delete(`attributes/${attributeId}/options/${optionId}`);

export const update = ({
    $axios,
    id,
    data,
}) => $axios.$put(`attributes/${id}`, data);

export const updateOption = ({
    $axios,
    attributeId,
    optionId,
    data,
}) => $axios.$put(`attributes/${attributeId}/options/${optionId}`, data);
