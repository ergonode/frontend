/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { routing as productsRouting } from '~/modules/products/router.config';
import { routing as workflowRouting } from '~/modules/workflow/router.config';

export const pages = [
    ...productsRouting,
    ...workflowRouting,
];
