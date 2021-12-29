/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const get = ({
    $axios,
    id,
}) => $axios.$get(`multimedia/${id}`);

export const getMetadata = ({
    $axios,
    id,
}) => $axios.$get(`multimedia/${id}/metadata`);

export const getRelation = ({
    $axios,
    id,
}) => $axios.$get(`multimedia/${id}/relation`);

export const update = ({
    $axios,
    id,
    data,
}) => $axios.$put(`multimedia/${id}`, data);

export const remove = ({
    $axios,
    id,
}) => $axios.$delete(`multimedia/${id}`);
