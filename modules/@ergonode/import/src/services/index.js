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

export const getImportsStatuses = ({
    $axios,
    cancelToken,
}) => $axios.$get('profile/imports', {
    cancelToken,
});

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

export const uploadFile = ({
    $axios,
    id,
    data,
}) => $axios.$post(`sources/${id}/upload`, data);

export const create = ({
    $axios,
    data,
}) => $axios.$post('sources', data);

export const remove = ({
    $axios,
    id,
}) => $axios.$delete(`sources/${id}`);
