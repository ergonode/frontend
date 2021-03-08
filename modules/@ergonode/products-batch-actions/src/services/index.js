/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    paramsSerializer,
} from '@BatchActions/models/paramsSerializer';

export const getTemplates = ({
    $axios,
    params,
}) => $axios.$get('batch-action/templates', {
    params,
    paramsSerializer,
});
