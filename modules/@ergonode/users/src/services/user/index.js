/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const get = ({
    $axios,
    id,
}) => $axios.$get(`accounts/${id}`);

export const update = ({
    $axios,
    id,
    data,
}) => $axios.$put(`accounts/${id}`, data);

export const create = ({
    $axios,
    data,
}) => $axios.$post('accounts', data);

export const remove = ({
    $axios,
    id,
}) => $axios.$delete(`accounts/${id}`);
