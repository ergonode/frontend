/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const create = ({
    $axios,
    data,
}) => $axios.$post('trees', data);

export const get = ({
    $axios,
    id,
}) => $axios.$get(`trees/${id}`);

export const remove = ({
    $axios,
    id,
}) => $axios.$delete(`trees/${id}`);

export const update = ({
    $axios,
    id,
    data,
}) => $axios.$put(`trees/${id}`, data);
