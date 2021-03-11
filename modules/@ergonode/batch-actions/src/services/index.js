/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    paramsSerializer,
} from '@BatchActions/models/batchActionMapper';

export const create = ({
    $axios,
    type,
    href,
    payload,
}) => $axios[type](href, payload);

export const getCount = ({
    $axios,
    params,
}) => $axios.$get('batch-action/count', {
    params,
    paramsSerializer,
});
