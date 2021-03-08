/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    paramsSerializer,
} from '@BatchActions/models/paramsSerializer';

export const create = ({
    $axios,
    type,
    href,
    payload,
}) => $axios[type](href, payload);

export const getStatus = ({
    $axios,
    id,
}) => $axios.$get(`batch-action/${id}`);

export const getCount = ({
    $axios,
    params,
}) => $axios.$get('batch-action/count', {
    params,
    paramsSerializer,
});
