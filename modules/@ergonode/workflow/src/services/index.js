/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const getStatuses = ({
    $axios,
}) => $axios.$get('status', {
    params: {
        limit: 99999,
    },
});

export const getStatus = ({
    $axios,
    id,
}) => $axios.$get(`status/${id}`);

export const removeStatus = ({
    $axios,
    id,
}) => $axios.$delete(`status/${id}`);

export const createStatus = ({
    $axios,
    data,
}) => $axios.$post('status', data);

export const orderStatuses = ({
    $axios,
    data,
}) => $axios.$post('status/order', data);

export const updateStatus = ({
    $axios,
    id,
    data,
}) => $axios.$put(`status/${id}`, data);

export const getTransitions = ({
    $axios,
    workflowId = 'default',
}) => $axios.$get(`workflow/${workflowId}/transitions`, {
    params: {
        limit: 99999,
    },
});

export const getWorkflow = ({
    $axios,
    workflowId = 'default',
}) => $axios.$get(`workflow/${workflowId}`);

export const updateWorkflow = ({
    $axios,
    data,
    workflowId = 'default',
}) => $axios.$put(`workflow/${workflowId}`, data);

export const updateDefaultStatus = ({
    $axios,
    id,
    workflowId = 'default',
}) => $axios.$put(`workflow/${workflowId}/status/${id}/default`);

export const getTransition = ({
    $axios,
    from,
    to,
    workflowId = 'default',
}) => $axios.$get(`workflow/${workflowId}/transitions/${from}/${to}`);

export const getTransitionConditions = ({
    $axios,
    from,
    to,
    workflowId = 'default',
}) => $axios.$get(`workflow/${workflowId}/transitions/${from}/${to}/conditions`);

export const updateTransition = ({
    $axios,
    from,
    to,
    data,
    workflowId = 'default',
}) => $axios.$put(`workflow/${workflowId}/transitions/${from}/${to}`, data);

export const updateTransitionConditions = ({
    $axios,
    from,
    to,
    data,
    workflowId = 'default',
}) => $axios.$put(`workflow/${workflowId}/transitions/${from}/${to}/conditions`, data);

export const removeTransition = ({
    $axios,
    from,
    to,
    workflowId = 'default',
}) => $axios.$delete(`workflow/${workflowId}/transitions/${from}/${to}`);

export const getCondition = ({
    $axios,
    type,
}) => $axios.$get(`workflow/condition/${type}`);

export const getDictionary = ({
    $axios,
    params,
}) => $axios.$get('workflow/condition/dictionary', {
    params,
});
