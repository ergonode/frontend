/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const get = ({
    $axios,
    id,
}) => $axios.$get(`segments/${id}`);

export const update = ({
    $axios,
    id,
    data,
}) => $axios.$put(`segments/${id}`, data);

export const create = ({
    $axios,
    data,
}) => $axios.$post('segments', data);

export const remove = ({
    $axios,
    id,
}) => $axios.$delete(`segments/${id}`);
