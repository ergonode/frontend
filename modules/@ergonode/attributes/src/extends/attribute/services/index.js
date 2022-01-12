/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const createOption = ({
    $axios,
    attributeId,
    data,
}) => $axios.$post(`attributes/${attributeId}/options`, data);

export const getOption = ({
    $axios,
    attributeId,
    params = {
        order: 'ASC',
        field: 'code',
    },
}) => $axios.$get(`attributes/${attributeId}/options`, {
    params,
});

export const removeOption = ({
    $axios,
    attributeId,
    optionId,
}) => $axios.$delete(`attributes/${attributeId}/options/${optionId}`);

export const updateOption = ({
    $axios,
    attributeId,
    optionId,
    data,
}) => $axios.$put(`attributes/${attributeId}/options/${optionId}`, data);

export const moveOption = ({
    $axios,
    attributeId,
    optionId,
    data,
}) => $axios.$put(`attributes/${attributeId}/options/${optionId}/move`, data);
