/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const get = ({
    $axios,
    id,
}) => $axios.$get(`conditions/${id}`);

export const getDictionary = ({
    $axios,
    params,
}) => $axios.$get('dictionary/conditions', {
    params,
});

export const getSets = ({
    $axios,
    id,
}) => $axios.$get(`conditionsets/${id}`);

export const createSet = ({
    $axios,
    data,
}) => $axios.$post('conditionsets', data);

export const updateSet = ({
    $axios,
    id,
    data,
}) => $axios.$put(`conditionsets/${id}`, data);

export const removeSet = ({
    $axios,
    id,
}) => $axios.$delete(`conditionsets/${id}`);
