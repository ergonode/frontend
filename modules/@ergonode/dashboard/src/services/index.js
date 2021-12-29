/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const getCompletenessCount = ({
    $axios,
}) => $axios.$get('dashboard/widget/completeness-count');

export const getProductsCount = ({
    $axios,
}) => $axios.$get('dashboard/widget/product-count');

export const getStatusesCount = ({
    $axios,
    workflowLanguage,
}) => $axios.$get(`dashboard/widget/${workflowLanguage}/status-count`);
