/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const get = ({
    $axios,
    id,
}) => $axios.$get(`products/${id}`);

export const getDraft = ({
    $axios,
    id,
    languageCode,
}) => $axios.$get(`${languageCode}/products/${id}/draft`, {
    withLanguage: false,
});

export const getBindings = ({
    $axios,
    id,
}) => $axios.$get(`products/${id}/bindings`);

export const getCollections = ({
    $axios,
    id,
}) => $axios.$get(`products/${id}/collections`);

export const getChildren = ({
    $axios,
    id,
    params = {
        limit: 9999,
        offset: 0,
        view: 'list',
        field: 'name',
        order: 'ASC',
    },
}) => $axios.$get(`products/${id}/children`, {
    params,
});

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
}) => $axios.$get(`${languageCode}/products/${id}/draft/completeness`, {
    withLanguage: false,
});

export const update = ({
    $axios,
    id,
    data,
}) => $axios.$put(`products/${id}`, data);

export const updateDraftValue = ({
    $axios,
    id,
    attributeId,
    data,
}) => $axios.$put(`products/${id}/draft/${attributeId}/value`, data);

export const applyDraft = ({
    $axios,
    id,
}) => $axios.$put(`products/${id}/draft/persist`, {});

export const create = ({
    $axios,
    data,
}) => $axios.$post('products', data);

export const remove = ({
    $axios,
    id,
}) => $axios.$delete(`products/${id}`);

export const removeDraftValue = ({
    $axios,
    id,
    languageCode,
    attributeId,
}) => $axios.$delete(`${languageCode}products/${id}/draft/${attributeId}/value`, {
    withLanguage: false,
});
