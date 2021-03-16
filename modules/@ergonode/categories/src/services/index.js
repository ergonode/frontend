/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const create = ({
    $axios,
    data,
}) => $axios.$post('categories', data);

export const get = ({
    $axios,
    id,
}) => $axios.$get(`categories/${id}`);

export const getAutocomplete = ({
    $axios,
    config,
}) => $axios.$get('categories/autocomplete', config);

export const remove = ({
    $axios,
    id,
}) => $axios.$delete(`categories/${id}`);

export const update = ({
    $axios,
    id,
    data,
}) => $axios.$put(`categories/${id}`, data);
