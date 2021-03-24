/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const getTemplates = ({
    $axios,
    payload,
}) => $axios.$post('batch-action/templates', payload);
