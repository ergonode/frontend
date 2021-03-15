/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const create = ({
    $axios,
    type,
    href,
    payload,
}) => $axios[type](href, payload);

export const getCount = ({
    $axios,
    payload,
}) => $axios.$post('batch-action/count', payload);
