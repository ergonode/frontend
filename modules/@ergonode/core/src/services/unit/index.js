/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const get = ({
    $axios,
    id,
}) => $axios.$get(`units/${id}`);

export const update = ({
    $axios,
    id,
    data,
}) => $axios.$put(`units/${id}`, data);

export const create = ({
    $axios,
    data,
}) => $axios.$post('units', data);

export const remove = ({
    $axios,
    id,
}) => $axios.$delete(`units/${id}`);
