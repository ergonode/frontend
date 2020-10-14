/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const get = ({
    $axios,
    id,
}) => $axios.$get(`sources/${id}`);

export const getConfiguration = ({
    $axios,
    id,
}) => $axios.$get(`sources/${id}/configuration`);

export const getDetails = ({
    $axios,
    sourceId,
    importId,
}) => $axios.$get(`sources/${sourceId}/imports/${importId}`);

export const update = ({
    $axios,
    id,
    data,
}) => $axios.$put(`sources/${id}`, data);

export const create = ({
    $axios,
    data,
}) => $axios.$post('sources', data);

export const remove = ({
    $axios,
    id,
}) => $axios.$delete(`sources/${id}`);
