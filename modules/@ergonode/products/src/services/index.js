/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const get = ({
    $axios,
    id,
}) => $axios.$get(`products/${id}`);

export const getInherited = ({
    $axios,
    id,
    languageCode,
}) => $axios.$get(`products/${id}/inherited/${languageCode}`);

export const getWorkflow = ({
    $axios,
    id,
    languageCode,
}) => $axios.$get(`${languageCode}/products/${id}/workflow/${languageCode}`, {
    withLanguage: false,
});

export const getCollections = ({
    $axios,
    id,
}) => $axios.$get(`products/${id}/collections`);

export const getTemplate = ({
    $axios,
    id,
    languageCode,
}) => $axios.$get(`${languageCode}/products/${id}/template`, {
    withLanguage: false,
});

export const getCompleteness = ({
    $axios,
    id,
    languageCode,
}) => $axios.$get(`${languageCode}/products/${id}/completeness`, {
    withLanguage: false,
});

export const update = ({
    $axios,
    id,
    data,
}) => $axios.$put(`products/${id}`, data);

export const updateValues = ({
    $axios,
    data,
}) => $axios.$patch('products/attributes', data);

export const create = ({
    $axios,
    data,
}) => $axios.$post('products', data);

export const remove = ({
    $axios,
    id,
}) => $axios.$delete(`products/${id}`);

export const removeChildren = ({
    $axios,
    id,
    childrenId,
    data,
}) => $axios.$delete(`products/${id}/children/${childrenId}`, data);

export const removeValues = ({
    $axios,
    data,
}) => $axios.$delete('products/attributes', data);

export const addBySku = ({
    $axios,
    id,
    data,
}) => $axios.$post(`products/${id}/children/add-from-skus`, data);

export const addBySegment = ({
    $axios,
    id,
    data,
}) => $axios.$post(`products/${id}/children/add-from-segments`, data);
