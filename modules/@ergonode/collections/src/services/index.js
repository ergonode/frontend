/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const get = ({
    $axios,
    id,
}) => $axios.$get(`collections/${id}`);

export const getTypes = ({
    $axios,
    params = {
        limit: 9999,
        offset: 0,
        view: 'list',
        order: 'ASC',
        field: 'name',
        columns: 'id,code,name',
    },
}) => $axios.$get('collections/type', {
    params,
});

export const update = ({
    $axios,
    id,
    data,
}) => $axios.$put(`collections/${id}`, data);

export const updateDraftValue = ({
    $axios,
    id,
    productId,
    data,
}) => $axios.$put(`collections/${id}/elements/${productId}`, data);

export const create = ({
    $axios,
    data,
}) => $axios.$post('collections', data);

export const remove = ({
    $axios,
    id,
}) => $axios.$delete(`collections/${id}`);

export const addBySku = ({
    $axios,
    id,
    data,
}) => $axios.$post(`collections/${id}/elements/add-from-skus`, data);

export const addBySegment = ({
    $axios,
    id,
    data,
}) => $axios.$post(`collections/${id}/elements/add-from-segments`, data);
