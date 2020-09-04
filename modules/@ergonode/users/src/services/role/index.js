/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const get = ({
    $axios,
    id,
}) => $axios.$get(`roles/${id}`);

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
