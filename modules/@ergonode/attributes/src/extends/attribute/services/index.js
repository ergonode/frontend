/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const createOption = ({
    $axios,
    id,
    data,
}) => $axios.$post(`attributes/${id}/options`, data);

export const getOption = ({
    $axios,
    id,
    params = {
        order: 'ASC',
        field: 'code',
    },
}) => $axios.$get(`attributes/${id}/options`, {
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
