/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const createBinding = ({
    $axios,
    id,
    data,
}) => $axios.$post(`products/${id}/binding`, data);

export const getBindings = ({
    $axios,
    id,
}) => $axios.$get(`products/${id}/bindings`);

export const removeBinding = ({
    $axios,
    productId,
    bindingId,
}) => $axios.$delete(`products/${productId}/binding/${bindingId}`);
