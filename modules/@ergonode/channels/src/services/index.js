/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const get = ({
    $axios,
    id,
}) => $axios.$get(`channels/${id}`);

export const getConfiguration = ({
    $axios,
    id,
}) => $axios.$get(`channels/${id}/configuration`);

export const getSchedulerConfiguration = ({
    $axios,
    id,
}) => $axios.$get(`channels/${id}/scheduler`);

export const getDetails = ({
    $axios,
    channelId,
    exportId,
}) => $axios.$get(`channels/${channelId}/exports/${exportId}`);

export const create = ({
    $axios,
    id,
}) => $axios.$post(`channels/${id}/exports`);

export const update = ({
    $axios,
    id,
    data,
}) => $axios.$put(`channels/${id}`, data);

export const updateScheduler = ({
    $axios,
    id,
    data,
}) => $axios.$put(`channels/${id}/scheduler`, data);

export const remove = ({
    $axios,
    id,
}) => $axios.$delete(`channels/${id}`);
