/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const getTemplates = ({
    $axios,
    body,
}) => $axios.$get('batch-actions/templates', body);
