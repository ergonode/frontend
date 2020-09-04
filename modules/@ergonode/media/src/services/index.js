/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const get = ({
    $axios,
    id,
}) => $axios.$get(`multimedia/${id}`);

export const update = ({
    $axios,
    id,
    data,
}) => $axios.$put(`multimedia/${id}`, data);

export const remove = ({
    $axios,
    id,
}) => $axios.$delete(`multimedia/${id}`);
