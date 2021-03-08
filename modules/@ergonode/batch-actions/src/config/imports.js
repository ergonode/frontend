/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const Components = {
    BatchActionsListener: () => import('@BatchActions/components/BatchActionsListener/BatchActionsListener').then(m => m.default || m),
};
